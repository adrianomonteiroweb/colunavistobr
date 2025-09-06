"use server";

import { uploadBlob } from "@/lib/blob";

export const uploadPostImagesAction = async (
  files: File[]
): Promise<string[]> => {
  try {
    const uploadPromises = files.map(async (file) => {
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 15);
      const path = `posts/${timestamp}-${randomId}-${file.name}`;
      const { url } = await uploadBlob(file, path);
      return url;
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Error uploading post images:", error);
    throw error;
  }
};

export const uploadPostImageAction = async (file: File): Promise<string> => {
  try {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const path = `posts/${timestamp}-${randomId}-${file.name}`;
    const { url } = await uploadBlob(file, path);
    return url;
  } catch (error) {
    console.error("Error uploading post image:", error);
    throw error;
  }
};
