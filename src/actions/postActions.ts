"use server";

import { PostRepository } from "../lib/db/src/repositories/PostRepository";
import { revalidatePath } from "next/cache";

export const fetchPosts = async () => {
  try {
    // Adicionar timestamp para evitar cache
    const timestamp = Date.now();
    console.log("fetchPosts called at:", timestamp);

    const posts = await PostRepository.getPosts();
    console.log("Posts fetched:", posts.length, "at:", timestamp);
    console.log("Sample post (first):", posts[0]);

    return posts;
  } catch (error) {
    console.error("Error fetching posts in action:", error);

    // Log adicional para debug
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    }

    throw new Error(
      `Failed to fetch posts: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const createPost = async (data: {
  title: string;
  description: string;
  images: string[];
}) => {
  try {
    const result = await PostRepository.createPost(data);
    revalidatePath("/admin");
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};

export const deletePost = async (id: number) => {
  try {
    console.log("deletePost action called with ID:", id, "Type:", typeof id);

    // Validação mais rigorosa do ID
    const postId = Number(id);
    if (!postId || isNaN(postId) || postId <= 0) {
      throw new Error(`ID do post inválido: ${id}`);
    }

    console.log("Calling PostRepository.deletePost with validated ID:", postId);
    const result = await PostRepository.deletePost(postId);
    console.log("deletePost action result:", result);

    if (!result?.success) {
      throw new Error("PostRepository retornou falha na exclusão");
    }

    // Invalidar múltiplos caches para garantir atualização
    console.log("Revalidating paths...");
    revalidatePath("/admin");
    revalidatePath("/admin", "page");
    revalidatePath("/");

    console.log("Post deleted successfully from action");
    return { success: true, deletedId: postId };
  } catch (error) {
    console.error("Error deleting post in action:", error);

    // Re-lançar o erro com mais contexto
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete post: ${errorMessage}`);
  }
};
