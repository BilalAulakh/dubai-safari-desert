import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getDbGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  importDefaultGalleryItems,
} from "@/lib/data/store";
import { requireAdmin } from "@/lib/auth/admin-session";

// Homepage and gallery page are ISR-cached; refresh them after admin edits
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
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const items = await getDbGalleryItems();
    return NextResponse.json({ success: true, items });
  } catch (err) {
    return errorResponse(err, "Failed to load gallery");
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();

    if (body.action === "import-defaults") {
      const imported = await importDefaultGalleryItems();
      revalidateGalleryPages();
      return NextResponse.json({ success: true, items: imported });
    }

    const title = String(body.title || "").trim();
    const imageUrl = String(body.image_url || "").trim();
    const category = String(body.category || "").trim();
    if (!title || !imageUrl || !category) {
      return NextResponse.json(
        { error: "Title, image and category are required." },
        { status: 400 }
      );
    }

    const item = await createGalleryItem({
      title,
      image_url: imageUrl,
      category,
      active: body.active !== undefined ? Boolean(body.active) : true,
      sort_order: Number(body.sort_order) || 0,
    });
    revalidateGalleryPages();
    return NextResponse.json({ success: true, item });
  } catch (err) {
    return errorResponse(err, "Failed to add photo");
  }
}

export async function PATCH(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id, ...body } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Photo ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (body.title !== undefined) updates.title = String(body.title).trim();
    if (body.image_url !== undefined) updates.image_url = String(body.image_url).trim();
    if (body.category !== undefined) updates.category = String(body.category).trim();
    if (body.active !== undefined) updates.active = Boolean(body.active);
    if (body.sort_order !== undefined) updates.sort_order = Number(body.sort_order) || 0;

    const item = await updateGalleryItem(id, updates);
    revalidateGalleryPages();
    return NextResponse.json({ success: true, item });
  } catch (err) {
    return errorResponse(err, "Failed to update photo");
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Photo ID is required" }, { status: 400 });
    }
    await deleteGalleryItem(id);
    revalidateGalleryPages();
    return NextResponse.json({ success: true });
  } catch (err) {
    return errorResponse(err, "Failed to delete photo");
  }
}
