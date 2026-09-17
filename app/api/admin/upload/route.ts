import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided in form data" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase client not configured. Check .env.local" },
        { status: 500 }
      );
    }

    // Generate safe file name
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const cleanBaseName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const fileName = `${cleanBaseName}-${Date.now()}.${fileExt}`;
    const folder = (formData.get("folder") as string)?.trim() || "packages";
    const cleanFolder = folder.replace(/[^a-z0-9_-]/gi, "");
    const filePath = `${cleanFolder || "packages"}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const bucketName =
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "safari-images";

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error("Supabase Storage upload error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to upload to safari-images bucket" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      fileName,
      bucket: bucketName,
      path: filePath,
    });
  } catch (err: any) {
    console.error("Image upload exception:", err);
    return NextResponse.json(
      { error: err.message || "Server upload exception" },
      { status: 500 }
    );
  }
}
