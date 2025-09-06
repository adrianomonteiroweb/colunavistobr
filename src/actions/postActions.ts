"use server";

import { PostRepository } from "../lib/db/src/repositories/PostRepository";

export const fetchPosts = async () => {
  return await PostRepository.getPosts();
};

export const createPost = async (data: {
  title: string;
  description: string;
  images: string[];
}) => {
  return await PostRepository.createPost(data);
};

export const updatePost = async (
  id: number,
  data: Partial<{ title: string; description: string; images: string[] }>
) => {
  return await PostRepository.updatePost(id, data);
};

export const deletePost = async (id: number) => {
  await PostRepository.deletePost(id);
};
