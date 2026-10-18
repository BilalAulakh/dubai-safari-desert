import { NextResponse, after } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { createBooking, getBookings, getBookingById, updateBookingStatus, deleteBooking } from "@/lib/data/store";
import { requireAdmin } from "@/lib/auth/admin-session";
import { SITE_CONFIG } from "@/lib/config/site";
import { sendBookingEmails, sendBookingStatusEmail } from "@/lib/email/bookingEmails";

export const dynamic = "force-dynamic";

// Each booking emails the address typed into the form, so cap submissions per IP
// to stop bots using the form to spam people through our Brevo account.
// In-memory, so it is per server instance: a speed bump, not a hard guarantee.
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    recentByIp.set(ip, hits);
    return true;
  }
  hits.push(now);
  recentByIp.set(ip, hits);
  if (recentByIp.size > 5000) recentByIp.clear(); // keep memory bounded
  return false;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const bookings = await getBookings();
    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = bookingSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { company_website, ...data } = validationResult.data;

    // Honeypot filled: a bot. Pretend success so it doesn't retry, but save and send nothing.
    if (company_website && company_website.trim().length > 0) {
      return NextResponse.json({ success: true, bookingReference: "DSD-RECEIVED" });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many booking requests. Please try again in a few minutes or WhatsApp us on ${SITE_CONFIG.contact.whatsapp}.`,
        },
        { status: 429 }
      );
    }

    const booking = await createBooking({
      package_id: data.package_id,
      customer_name: data.customer_name,
      phone: data.phone,
      email: data.email || undefined,
      booking_date: data.booking_date,
      adults: data.adults,
      children: data.children,
      pickup_location: data.pickup_location,
      hotel_name: data.hotel_name || undefined,
      special_requests: data.special_requests || undefined,
    });

    // Emails go out after the response so the customer isn't kept waiting on Brevo
    after(() => sendBookingEmails(booking));

    return NextResponse.json({
      success: true,
      bookingReference: booking.booking_reference,
      booking,
    });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `We could not save your booking right now. Please WhatsApp us on ${SITE_CONFIG.contact.whatsapp} and we will confirm it straight away.`,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const { id, status, admin_notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Booking ID and status are required." },
        { status: 400 }
      );
    }

    // Saving notes re-sends the current status, so email only on a real status change
    const previous = await getBookingById(id);
    const updated = await updateBookingStatus(id, status, admin_notes);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }
    if (previous && previous.status !== updated.status) {
      after(() => sendBookingStatusEmail(updated));
    }

    return NextResponse.json({
      success: true,
      booking: updated,
    });
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update booking." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Booking ID is required." },
        { status: 400 }
      );
    }

    const success = await deleteBooking(id);
    if (!success) {
      return NextResponse.json(
        { success: false, message: "Booking not found or could not be deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error("Booking deletion error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete booking." },
      { status: 500 }
    );
  }
}
