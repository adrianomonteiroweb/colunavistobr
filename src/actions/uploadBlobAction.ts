"use server";

import { uploadBlob } from "@/lib/blob";
import { saveHeroContent } from "@/actions/saveHeroContentAction";

export const uploadBlobAction = async (
  formData: FormData
): Promise<{ url: string }> => {
  const file = formData.get("file");
  const path = formData.get("path");
  const id = formData.get("id");
  const type = formData.get("type");
  if (
    !(file instanceof File) ||
    typeof path !== "string" ||
    typeof id !== "string" ||
    typeof type !== "string"
  ) {
    throw new Error("Invalid form data");
  }
  const { url } = await uploadBlob(file, path);
  // Atualiza a tabela heroContent com a url
  await saveHeroContent(Number(id), { [type]: url });
  return { url };
};
