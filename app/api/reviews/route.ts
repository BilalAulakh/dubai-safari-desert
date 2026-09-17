import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { reviewSchema } from "@/lib/validations/review";
import { createReview, getAllReviews } from "@/lib/data/store";

export async function GET() {
  try {
    const reviews = await getAllReviews();
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch reviews." },
      { status: 500 }
    );
  }
}

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

    try {
      revalidatePath("/reviews");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Thank you! Your review has been published.",
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
