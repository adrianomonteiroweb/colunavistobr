import { eq } from "drizzle-orm";

import BaseRepository from "./BaseRepository";
import { heroContent } from "../schema";

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

export class HeroContentRepository extends BaseRepository {
  static override model = heroContent;

  static async getHeroContent({
    tx,
  }: { tx?: any } = {}): Promise<HeroContent | null> {
    const db = tx || this.db;
    const result = await db.select().from(this.model).limit(1);
    return result[0] || null;
  }

  static async updateHeroContent(
    id: number,
    data: Partial<HeroContent>,
    { tx }: { tx?: any } = {}
  ): Promise<HeroContent | null> {
    const db = tx || this.db;
    await db.update(this.model).set(data).where(eq(this.model.id, id));
    const updated = await db
      .select()
      .from(this.model)
      .where(eq(this.model.id, id));
    return updated[0] || null;
  }
}

export default HeroContentRepository;
