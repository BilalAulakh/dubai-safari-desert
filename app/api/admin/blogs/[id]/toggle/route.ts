import { NextResponse } from "next/server";
import { getBlogPostById, toggleBlogStatus } from "@/lib/data/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await getBlogPostById(id);

    if (!existing) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    const nextStatus = existing.status === "published" ? "draft" : "published";

    if (nextStatus === "published" && (!existing.content || !existing.content.trim())) {
      return NextResponse.json(
        { error: "Cannot publish an article without content." },
        { status: 400 }
      );
    }

    const updated = await toggleBlogStatus(id, nextStatus);
    return NextResponse.json({ success: true, blog: updated });
  } catch (error: any) {
    console.error("POST /api/admin/blogs/[id]/toggle error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to toggle status." },
      { status: 500 }
    );
  }
}
