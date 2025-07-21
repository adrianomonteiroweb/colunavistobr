import { HeroContentRepository } from "@/lib/db/src/repositories/HeroContentRepository";

export const fetchHeroContent = async () => {
  return await HeroContentRepository.getHeroContent();
};
