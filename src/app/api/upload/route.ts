import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

  if (!BLOB_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN not configured");
    return NextResponse.json(
      { error: "Server configuration error: BLOB_READ_WRITE_TOKEN not set" },
      { status: 500 }
    );
  }

  try {
    const form_data = await req.formData();
    const file = form_data.get("file");

    if (!file || typeof file === "string") {
      console.error("No file uploaded", { file });
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const blob = await put(
      `colunavistobr/profile/${(file as File).name}`,
      file as File,
      {
        access: "public",
        token: BLOB_TOKEN,
      }
    );

    return NextResponse.json({ url: blob.url });
  } catch (err: any) {
    console.error("Upload API error", err);
    return NextResponse.json(
      { error: err?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
