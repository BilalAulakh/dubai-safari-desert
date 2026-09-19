import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { createBooking, getBookings, updateBookingStatus, deleteBooking } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
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

    const data = validationResult.data;
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

    return NextResponse.json({
      success: true,
      bookingReference: booking.booking_reference,
      booking,
    });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while processing your booking." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, admin_notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Booking ID and status are required." },
        { status: 400 }
      );
    }

    const updated = await updateBookingStatus(id, status, admin_notes);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
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
