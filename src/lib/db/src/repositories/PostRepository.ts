import { db } from "../index";
import { post } from "../schema";
import { eq } from "drizzle-orm";

export const PostRepository = {
  db,
  model: post,

  async getPosts() {
    return await db.select().from(post).orderBy(post.created_at);
  },

  async createPost(data: {
    title: string;
    description: string;
    images: string[];
  }) {
    const [newPost] = await db.insert(post).values(data).returning();
    return newPost;
  },

  async updatePost(
    id: number,
    data: Partial<{ title: string; description: string; images: string[] }>
  ) {
    const [updated] = await db
      .update(post)
      .set(data)
      .where(eq(post.id, id))
      .returning();
    return updated;
  },

  async deletePost(id: number) {
    await db.delete(post).where(eq(post.id, id));
  },
};
