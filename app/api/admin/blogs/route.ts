import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAllBlogPosts, createBlogPost } from "@/lib/data/store";
import { BlogPost } from "@/types";
import { requireAdmin } from "@/lib/auth/admin-session";


// Blog pages are ISR-cached; refresh them right after admin edits
function revalidateBlogPages() {
  try {
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/sitemap.xml");
  } catch {}
}
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const blogs = await getAllBlogPosts();
    return NextResponse.json({ success: true, blogs });
  } catch (error: any) {
    console.error("GET /api/admin/blogs error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve blog posts." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();

    // 1. Required field validation
    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json(
        { error: "Article title is required." },
        { status: 400 }
      );
    }

    // Slug generation or validation
    let slug = body.slug
      ? String(body.slug).trim().toLowerCase()
      : body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

    // Sanitize slug
    slug = slug.replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
    if (!slug) {
      return NextResponse.json(
        { error: "A valid URL slug could not be generated. Please provide a slug." },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const allBlogs = await getAllBlogPosts();
    const existingSlug = allBlogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
    if (existingSlug) {
      return NextResponse.json(
        { error: `An article with the slug "${slug}" already exists. Please choose a unique slug.` },
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

    const newBlogData: Omit<BlogPost, "id" | "created_at" | "updated_at"> = {
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt ? String(body.excerpt).trim() : "",
      content: body.content ? String(body.content).trim() : "",
      featured_image: body.featured_image || "/images/hero-dune-bashing.webp",
      featured_image_alt: body.featured_image_alt ? String(body.featured_image_alt).trim() : body.title.trim(),
      category: body.category ? String(body.category).trim() : "Travel Guide",
      author: body.author ? String(body.author).trim() : "Safari Dune Tours",
      read_time: body.read_time || calculatedReadTime,
      status,
      published_at: status === "published" ? (body.published_at || new Date().toISOString()) : undefined,
      published_date: (body.published_at || new Date().toISOString()).slice(0, 10),
      meta_title: body.meta_title ? String(body.meta_title).trim() : body.title.trim(),
      meta_description: body.meta_description ? String(body.meta_description).trim() : (body.excerpt ? String(body.excerpt).trim() : ""),
      seo_title: body.meta_title ? String(body.meta_title).trim() : body.title.trim(),
      seo_description: body.meta_description ? String(body.meta_description).trim() : (body.excerpt ? String(body.excerpt).trim() : ""),
    };

    const saved = await createBlogPost(newBlogData);
    revalidateBlogPages();
    return NextResponse.json({ success: true, blog: saved }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/blogs error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog post." },
      { status: 500 }
    );
  }
}
