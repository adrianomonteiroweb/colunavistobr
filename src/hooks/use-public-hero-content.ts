import { useState, useEffect } from "react";
import type { HeroContent } from "@/lib/db/src/repositories/HeroContentRepository";

export const usePublicHeroContent = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/hero-content");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const heroContent = await response.json();
        setContent(heroContent);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar conteúdo:", err);
        setError("Erro ao carregar conteúdo do Hero");
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  return { content, isLoading, error };
};
