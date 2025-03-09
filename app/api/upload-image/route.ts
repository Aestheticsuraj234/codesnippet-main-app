import { NextResponse } from "next/server";

import { writeFile } from "fs/promises";
import path from "path";
import cloudinary from "@/lib/cloudinary";

export async function POST(req:Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    // Convert the file to a Buffer
    const bytes = await (file as File).arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save the file temporarily (needed for Cloudinary upload)
    const tempFilePath = path.join("/tmp", (file as File).name);
    // @ts-ignore
    await writeFile(tempFilePath, buffer);

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(tempFilePath, {
      folder: "editor-images", // Cloudinary folder
    });

    return NextResponse.json({
      success: 1, // Editor.js expects this to be 1, not `true`
      file: {
        url: uploadResponse.secure_url, // Nested inside `file`
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
