import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getDbActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  importDefaultActivities,
} from "@/lib/data/store";
import { requireAdmin } from "@/lib/auth/admin-session";

// Homepage and activities page are ISR-cached; refresh them after admin edits
function revalidateActivityPages() {
  try {
    revalidatePath("/");
    revalidatePath("/activities");
  } catch {}
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function toHighlights(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((h) => String(h).trim()).filter(Boolean)
    : [];
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
    const activities = await getDbActivities();
    return NextResponse.json({ success: true, activities });
  } catch (err) {
    return errorResponse(err, "Failed to load activities");
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();

    if (body.action === "import-defaults") {
      const imported = await importDefaultActivities();
      revalidateActivityPages();
      return NextResponse.json({ success: true, activities: imported });
    }

    const name = String(body.name || "").trim();
    const image = String(body.image || "").trim();
    if (!name || !image) {
      return NextResponse.json({ error: "Name and image are required." }, { status: 400 });
    }

    const activity = await createActivity({
      name,
      slug: toSlug(String(body.slug || "")) || toSlug(name),
      description: String(body.description || "").trim(),
      image,
      active: body.active !== undefined ? Boolean(body.active) : true,
      sort_order: Number(body.sort_order) || 0,
      highlights: toHighlights(body.highlights),
    });
    revalidateActivityPages();
    return NextResponse.json({ success: true, activity });
  } catch (err) {
    return errorResponse(err, "Failed to create activity");
  }
}

export async function PATCH(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id, ...body } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Activity ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (body.name !== undefined) updates.name = String(body.name).trim();
    if (body.slug !== undefined) updates.slug = toSlug(String(body.slug));
    if (body.description !== undefined) updates.description = String(body.description).trim();
    if (body.image !== undefined) updates.image = String(body.image).trim();
    if (body.active !== undefined) updates.active = Boolean(body.active);
    if (body.sort_order !== undefined) updates.sort_order = Number(body.sort_order) || 0;
    if (body.highlights !== undefined) updates.highlights = toHighlights(body.highlights);

    const activity = await updateActivity(id, updates);
    revalidateActivityPages();
    return NextResponse.json({ success: true, activity });
  } catch (err) {
    return errorResponse(err, "Failed to update activity");
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Activity ID is required" }, { status: 400 });
    }
    await deleteActivity(id);
    revalidateActivityPages();
    return NextResponse.json({ success: true });
  } catch (err) {
    return errorResponse(err, "Failed to delete activity");
  }
}
