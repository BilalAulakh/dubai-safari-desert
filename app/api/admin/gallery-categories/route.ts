import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getDbGalleryCategories,
  createGalleryCategory,
  deleteGalleryCategory,
} from "@/lib/data/store";

function revalidateGalleryPages() {
  try {
    revalidatePath("/");
    revalidatePath("/gallery");
  } catch {}
}

function errorResponse(err: unknown, fallback: string) {
  const message = err instanceof Error ? err.message : fallback;
  console.error(fallback, err);
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET() {
  try {
    const categories = await getDbGalleryCategories();
    return NextResponse.json({ success: true, categories });
  } catch (err) {
    return errorResponse(err, "Failed to load categories");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const label = String(body.label || "").trim();
    const slug = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    if (!label || !slug) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 });
    }

    const category = await createGalleryCategory({
      label,
      slug,
      sort_order: Number(body.sort_order) || 0,
    });
    revalidateGalleryPages();
    return NextResponse.json({ success: true, category });
  } catch (err) {
    return errorResponse(err, "Failed to add category");
  }
}

export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }
    await deleteGalleryCategory(id);
    revalidateGalleryPages();
    return NextResponse.json({ success: true });
  } catch (err) {
    return errorResponse(err, "Failed to delete category");
  }
}
