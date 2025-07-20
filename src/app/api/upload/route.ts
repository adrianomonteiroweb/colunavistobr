import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge";

export async function POST(req: NextRequest) {
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
