"use server";

import { deleteBlob } from "@/lib/blob";

export const deleteBlobAction = async (url: string): Promise<void> => {
  return deleteBlob(url);
};
