import { NextResponse } from "next/server";
import { PostRepository } from "@/lib/db/src/repositories/PostRepository";

export async function GET() {
  const posts = await PostRepository.getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const data = await req.json();
  const post = await PostRepository.createPost(data);
  return NextResponse.json(post);
}
