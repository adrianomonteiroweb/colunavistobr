import { HeroContentRepository } from "@/lib/db/src/repositories/HeroContentRepository";
import { revalidatePath } from "next/cache";

export const fetchHeroContent = async () => {
  return await HeroContentRepository.getHeroContent();
};

export const saveHeroContent = async (
  id: number,
  data: Partial<Parameters<typeof HeroContentRepository.updateHeroContent>[1]>
) => {
  const updated = await HeroContentRepository.updateHeroContent(id, data);
  revalidatePath("/");
  return updated;
};
