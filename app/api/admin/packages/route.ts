import { NextResponse } from "next/server";
import { getAllPackages, createPackage, deletePackage } from "@/lib/data/store";
import { Package } from "@/types";

export async function GET() {
  const packages = await getAllPackages();
  return NextResponse.json({ success: true, packages });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and price are required." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newPackage: Package = {
      id: `pkg-${Date.now()}`,
      slug,
      name: body.name.trim(),
      price: Number(body.price),
      duration: body.duration || "6 - 7 Hours",
      short_description: body.short_description || "",
      description: body.description || "",
      main_image:
        body.main_image ||
        "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&auto=format&fit=crop",
      gallery: body.gallery || [
        body.main_image ||
          "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&auto=format&fit=crop",
      ],
      featured: Boolean(body.featured),
      active: body.active !== undefined ? Boolean(body.active) : true,
      inclusions: Array.isArray(body.inclusions)
        ? body.inclusions
        : ["Hotel Pickup & Drop-off", "Dune Bashing", "BBQ Dinner"],
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : [],
      itinerary: [
        {
          time: "02:30 PM",
          title: "Hotel Pickup",
          description: "Pickup from your hotel in a luxury 4x4.",
          sort_order: 1,
        },
        {
          time: "04:00 PM",
          title: "Dune Bashing & Sandboarding",
          description: "Exciting drive on high red dunes.",
          sort_order: 2,
        },
        {
          time: "06:00 PM",
          title: "Camp Entertainment & BBQ Dinner",
          description: "Buffet dinner and live stage shows.",
          sort_order: 3,
        },
      ],
      pickup_info: "Pickups available across all major Dubai hotels.",
      cancellation_policy: "Free cancellation up to 24 hours in advance.",
    };

    const saved = await createPackage(newPackage);
    return NextResponse.json({ success: true, package: saved });
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }
    const success = await deletePackage(id);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error deleting package:", err);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
