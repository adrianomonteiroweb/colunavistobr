import { put, del, head, list } from "@vercel/blob";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export type UploadBlobResult = { url: string };

export const uploadBlob = async (
  file: File,
  path: string
): Promise<UploadBlobResult> => {
  if (!BLOB_TOKEN) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN environment variable is not configured. Please set it in .env.local"
    );
  }

  try {
    const blob = await put(path, file, {
      access: "public",
      token: BLOB_TOKEN,
      allowOverwrite: true,
    });
    console.log("Blob uploaded successfully:", blob.url);
    return { url: blob.url };
  } catch (error) {
    console.error("[uploadBlob] error for path:", path, error);
    throw error;
  }
};

export const deleteBlob = async (url: string): Promise<void> => {
  if (!BLOB_TOKEN) {
    console.warn(
      "BLOB_READ_WRITE_TOKEN not configured. Skipping blob deletion for URL:",
      url
    );
    return; // Não falha, apenas avisa que não vai deletar
  }

  try {
    await del(url, { token: BLOB_TOKEN });
    console.log("Blob deleted successfully:", url);
  } catch (error) {
    console.error("[deleteBlob] error for URL:", url, error);
    // Não relança o erro para não interromper o fluxo de delete do post
    console.warn("Failed to delete blob, but continuing with post deletion");
  }
};

import type { HeadBlobResult } from "@vercel/blob";

export const getBlobMetadata = async (
  url: string
): Promise<HeadBlobResult | null> => {
  if (!BLOB_TOKEN) {
    console.error(
      "BLOB_READ_WRITE_TOKEN environment variable is not configured"
    );
    return null;
  }

  try {
    const metadata = await head(url, { token: BLOB_TOKEN });
    return metadata;
  } catch (error) {
    console.error("[getBlobMetadata] error", error);
    return null;
  }
};

export const listBlobs = async (prefix: string): Promise<string[]> => {
  if (!BLOB_TOKEN) {
    console.error(
      "BLOB_READ_WRITE_TOKEN environment variable is not configured"
    );
    return [];
  }

  try {
    const blobs = await list({ prefix, token: BLOB_TOKEN });
    const urls = blobs.blobs.map((b) => b.url);
    return urls;
  } catch (error) {
    console.error("[listBlobs] error", error);
    throw error;
  }
};
