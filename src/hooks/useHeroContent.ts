import { useState, useEffect } from "react";
import { fetchHeroContent } from "@/actions/heroContentActions";
import { saveHeroContent } from "@/actions/saveHeroContentAction";
import type { HeroContent } from "@/lib/db/src/repositories/HeroContentRepository";

export const useHeroContent = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroContent()
      .then(setHeroContent)
      .catch(() => setError("Erro ao carregar conteúdo do Hero"))
      .finally(() => setLoading(false));
  }, []);

  const updateHeroContent = async (id: number, data: Partial<HeroContent>) => {
    setLoading(true);
    try {
      const updated = await saveHeroContent(id, data);
      setHeroContent(updated);
      setError(null);
    } catch {
      setError("Erro ao atualizar conteúdo do Hero");
    } finally {
      setLoading(false);
    }
  };

  return { heroContent, loading, error, updateHeroContent };
};
