import { NextResponse } from "next/server";
import {
  getAllPickupLocations,
  createPickupLocation,
  updatePickupLocation,
  deletePickupLocation,
} from "@/lib/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const locations = await getAllPickupLocations();
    return NextResponse.json({
      success: true,
      locations,
    });
  } catch (error) {
    console.error("Fetch pickup locations error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch pickup locations." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, map_url } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Location name is required." },
        { status: 400 }
      );
    }

    const created = await createPickupLocation(name, map_url);
    return NextResponse.json({
      success: true,
      location: created,
    });
  } catch (error) {
    console.error("Create pickup location error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create pickup location." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, active, name, map_url, sort_order } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Location ID is required." },
        { status: 400 }
      );
    }

    const updated = await updatePickupLocation(id, {
      active,
      name,
      map_url,
      sort_order,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Pickup location not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      location: updated,
    });
  } catch (error) {
    console.error("Update pickup location error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update pickup location." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Location ID is required." },
        { status: 400 }
      );
    }

    const success = await deletePickupLocation(id);
    if (!success) {
      return NextResponse.json(
        { success: false, message: "Failed to delete pickup location." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pickup location deleted successfully.",
    });
  } catch (error) {
    console.error("Delete pickup location error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete pickup location." },
      { status: 500 }
    );
  }
}
