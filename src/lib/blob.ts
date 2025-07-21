import { put, del, head, list } from "@vercel/blob";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export type UploadBlobResult = { url: string };

export const uploadBlob = async (
  file: File,
  path: string
): Promise<UploadBlobResult> => {
  try {
    const blob = await put(path, file, {
      access: "public",
      token: BLOB_TOKEN,
      allowOverwrite: true,
    });
    return { url: blob.url };
  } catch (error) {
    console.error("[uploadBlob] error", error);
    throw error;
  }
};

export const deleteBlob = async (url: string): Promise<void> => {
  try {
    await del(url, { token: BLOB_TOKEN });
  } catch (error) {
    console.error("[deleteBlob] error", error);
    throw error;
  }
};

import type { HeadBlobResult } from "@vercel/blob";

export const getBlobMetadata = async (
  url: string
): Promise<HeadBlobResult | null> => {
  try {
    const metadata = await head(url, { token: BLOB_TOKEN });
    return metadata;
  } catch (error) {
    console.error("[getBlobMetadata] error", error);
    return null;
  }
};

export const listBlobs = async (prefix: string): Promise<string[]> => {
  try {
    const blobs = await list({ prefix, token: BLOB_TOKEN });
    const urls = blobs.blobs.map((b) => b.url);
    return urls;
  } catch (error) {
    console.error("[listBlobs] error", error);
    throw error;
  }
};
