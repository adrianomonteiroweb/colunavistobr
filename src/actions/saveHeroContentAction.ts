"use server";

import { HeroContentRepository } from "@/lib/db/src/repositories/HeroContentRepository";
import { revalidatePath } from "next/cache";
// Import eq from the same Drizzle instance used by HeroContentRepository to avoid type mismatch
import { eq } from "drizzle-orm";

export const saveHeroContent = async (
  id: number,
  data: Partial<Parameters<typeof HeroContentRepository.updateHeroContent>[1]>
) => {
  // Remove campos undefined, null ou string vazia
  const sanitizedData: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== "") {
      sanitizedData[key] = String(value);
    }
  }
  if (Object.keys(sanitizedData).length === 0) {
    // Faz select pelo id se não houver campos para atualizar
    const db = HeroContentRepository.db;
    const result = await db
      .select()
      .from(HeroContentRepository.model)
      .where(eq(HeroContentRepository.model.id, id));
    return result[0] || null;
  }
  const updated = await HeroContentRepository.updateHeroContent(
    id,
    sanitizedData
  );
  revalidatePath("/");
  return updated;
};
