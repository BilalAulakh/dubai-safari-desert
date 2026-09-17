import { NextResponse } from "next/server";
import { getBlogPostById, updateBlogPost, deleteBlogPost, getAllBlogPosts } from "@/lib/data/store";
import { BlogPost } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await getBlogPostById(id);

    if (!blog) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error("GET /api/admin/blogs/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve article." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await getBlogPostById(id);

    if (!existing) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    const body = await request.json();

    // Validate title
    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json({ error: "Article title is required." }, { status: 400 });
    }

    // Slug validation
    let slug = body.slug
      ? String(body.slug).trim().toLowerCase()
      : body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

    slug = slug.replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
    if (!slug) {
      return NextResponse.json(
        { error: "A valid URL slug could not be generated." },
        { status: 400 }
      );
    }

    // Check slug uniqueness excluding current blog
    const allBlogs = await getAllBlogPosts();
    const slugConflict = allBlogs.find(
      (b) => b.id !== id && b.slug.toLowerCase() === slug.toLowerCase()
    );
    if (slugConflict) {
      return NextResponse.json(
        { error: `An article with the slug "${slug}" already exists. Please choose a different slug.` },
        { status: 409 }
      );
    }

    const status: "draft" | "published" = body.status === "published" ? "published" : "draft";

    if (status === "published" && (!body.content || !body.content.trim())) {
      return NextResponse.json(
        { error: "Article content cannot be empty when publishing." },
        { status: 400 }
      );
    }

    const wordCount = (body.content || "").trim().split(/\s+/).filter(Boolean).length;
    const calculatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const updates: Partial<BlogPost> = {
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt ? String(body.excerpt).trim() : "",
      content: body.content ? String(body.content).trim() : "",
      featured_image: body.featured_image || existing.featured_image,
      featured_image_alt: body.featured_image_alt ? String(body.featured_image_alt).trim() : body.title.trim(),
      category: body.category ? String(body.category).trim() : (existing.category || "Travel Guide"),
      author: body.author ? String(body.author).trim() : (existing.author || "Safari Dune Tours"),
      read_time: body.read_time || calculatedReadTime,
      status,
      meta_title: body.meta_title ? String(body.meta_title).trim() : body.title.trim(),
      meta_description: body.meta_description ? String(body.meta_description).trim() : (body.excerpt ? String(body.excerpt).trim() : ""),
      seo_title: body.meta_title ? String(body.meta_title).trim() : body.title.trim(),
      seo_description: body.meta_description ? String(body.meta_description).trim() : (body.excerpt ? String(body.excerpt).trim() : ""),
    };

    if (status === "published") {
      updates.published_at = body.published_at || existing.published_at || new Date().toISOString();
      updates.published_date = (updates.published_at || new Date().toISOString()).slice(0, 10);
    }

    const updated = await updateBlogPost(id, updates);
    return NextResponse.json({ success: true, blog: updated });
  } catch (error: any) {
    console.error("PUT /api/admin/blogs/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update article." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await getBlogPostById(id);

    if (!existing) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    const deleted = await deleteBlogPost(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    console.error("DELETE /api/admin/blogs/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete article." },
      { status: 500 }
    );
  }
}
