import { db } from "@/lib/db/src/db";
import { heroContent } from "@/lib/db/src/schema";
import { eq } from "drizzle-orm";

export type HeroContent = {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image_url: string;
  project_info?: string;
  founder_name?: string;
  founder_bio?: string;
  founder_image_url?: string;
  social_instagram?: string;
  social_facebook?: string;
  social_linkedin?: string;
  social_youtube?: string;
  payment_pix?: string;
  payment_paypal?: string;
  payment_info?: string;
  updated_at: Date;
};

const TABLE = heroContent;

export const HeroContentRepository = {
  async getHeroContent(): Promise<HeroContent | null> {
    const result = await db.select().from(TABLE).limit(1);
    return result[0] || null;
  },
  async updateHeroContent(
    id: number,
    data: Partial<HeroContent>
  ): Promise<HeroContent | null> {
    await db.update(TABLE).set(data).where(eq(TABLE.id, id));
    const updated = await db.select().from(TABLE).where(eq(TABLE.id, id));
    return updated[0] || null;
  },
};
