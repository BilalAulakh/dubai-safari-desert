import { NextResponse } from "next/server";
import { reviewSchema } from "@/lib/validations/review";
import { createReview } from "@/lib/data/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = reviewSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { website_honeypot, ...data } = validationResult.data;

    // Honeypot check: If the hidden honeypot field has a value, silently reject spam
    if (website_honeypot && website_honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Review received" });
    }

    const review = await createReview({
      customer_name: data.customer_name,
      country: data.country,
      email: data.email || undefined,
      rating: data.rating,
      comment: data.comment,
      featured: false,
      is_demo: false,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your review has been submitted for moderation and will be published once approved by our team.",
      review,
    });
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit review." },
      { status: 500 }
    );
  }
}
