import { NextResponse } from "next/server";
import { HeroContentRepository } from "@/lib/db/src/repositories/HeroContentRepository";

export async function GET() {
  try {
    const heroContent = await HeroContentRepository.getHeroContent();

    if (!heroContent) {
      return NextResponse.json(
        { error: "Conteúdo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(heroContent);
  } catch (error) {
    console.error("Erro ao buscar conteúdo do hero:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
