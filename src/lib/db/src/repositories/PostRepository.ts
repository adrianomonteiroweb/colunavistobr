import { db } from "../index";
import { post } from "../schema";
import { eq } from "drizzle-orm";

export const PostRepository = {
  db,
  model: post,

  async getPosts() {
    try {
      const posts = await db.select().from(post).orderBy(post.created_at);
      console.log("Fetched posts:", posts.length);
      return posts;
    } catch (error) {
      console.error("Error fetching posts from database:", error);
      throw error;
    }
  },

  async createPost(data: {
    title: string;
    description: string;
    images: string[];
  }) {
    try {
      console.log("Creating post with data:", data);
      const [newPost] = await db
        .insert(post)
        .values({
          ...data,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();
      console.log("Created post:", newPost);
      return newPost;
    } catch (error) {
      console.error("Error creating post in database:", error);
      throw error;
    }
  },

  async deletePost(id: number) {
    try {
      console.log(
        "PostRepository.deletePost called with ID:",
        id,
        "Type:",
        typeof id
      );

      // Validação adicional
      if (!id || isNaN(id) || id <= 0) {
        throw new Error(`Invalid post ID provided: ${id}`);
      }

      // Verificar se o post existe primeiro
      const existingPost = await db
        .select()
        .from(post)
        .where(eq(post.id, id))
        .limit(1);

      console.log("Existing post search result:", existingPost);

      if (existingPost.length === 0) {
        throw new Error(`Post with ID ${id} not found in database`);
      }

      console.log("Post exists, proceeding with deletion...");

      // Deletar o post
      const deleteResult = await db
        .delete(post)
        .where(eq(post.id, id))
        .returning({ deletedId: post.id });

      console.log("Delete operation completed:", deleteResult);

      if (deleteResult.length === 0) {
        throw new Error(`No post was deleted. ID ${id} may not exist.`);
      }

      console.log("Post successfully deleted from database");
      return { success: true, deletedId: id, affected: deleteResult.length };
    } catch (error) {
      console.error("Error deleting post from database:", error);

      // Log adicional para debug
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          name: error.name,
          stack: error.stack,
        });
      }

      throw error;
    }
  },
};
