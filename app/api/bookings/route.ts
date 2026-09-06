import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { createBooking } from "@/lib/data/store";

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
