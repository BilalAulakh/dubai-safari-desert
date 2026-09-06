import { NextResponse } from "next/server";
import { commentSchema } from "@/lib/validations/comment";
import { createComment } from "@/lib/data/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = commentSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { website_honeypot, ...data } = validationResult.data;

    // Honeypot spam check
    if (website_honeypot && website_honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Comment received" });
    }

    const comment = await createComment({
      post_id: data.post_id,
      customer_name: data.customer_name,
      email: data.email,
      comment: data.comment,
    });

    return NextResponse.json({
      success: true,
      message: "Your comment has been submitted and is awaiting administrator approval.",
      comment,
    });
  } catch (error) {
    console.error("Comment submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to post comment." },
      { status: 500 }
    );
  }
}
