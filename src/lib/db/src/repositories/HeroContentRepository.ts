import { eq } from "drizzle-orm";

import BaseRepository from "./BaseRepository";
import { heroContent } from "../schema";

export type HeroContent = {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image_url: string;
  project_info?: string | null;
  founder_name?: string | null;
  founder_bio?: string | null;
  founder_image_url?: string | null;
  social_instagram?: string | null;
  social_facebook?: string | null;
  social_linkedin?: string | null;
  social_youtube?: string | null;
  payment_pix?: string | null;
  payment_paypal?: string | null;
  payment_info?: string | null;
  payment_qr_image_url?: string | null;
  updated_at?: Date | null;
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
