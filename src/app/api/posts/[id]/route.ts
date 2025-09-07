import { NextRequest, NextResponse } from "next/server";
import { PostRepository } from "@/lib/db/src/repositories/PostRepository";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    console.log("API DELETE request for post ID:", id);

    const result = await PostRepository.deletePost(id);

    console.log("API DELETE result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API DELETE error:", error);

    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // Para buscar um post específico, vamos implementar no repository
    const posts = await PostRepository.getPosts();
    const post = posts.find((p) => p.id === id);

    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("API GET error:", error);

    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
