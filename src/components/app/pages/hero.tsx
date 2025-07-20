// Server Component
import { fetchHeroContent } from "@/actions/heroContentActions";

const Hero = async () => {
  const heroContent = await fetchHeroContent();
  if (!heroContent) {
    return (
      <div className="text-center py-20 text-red-500">
        Erro ao carregar conteúdo do Hero.
      </div>
    );
  }
  // Importa dinamicamente o Client Component para evitar conflito de diretivas
  const { default: HeroClient } = await import("./HeroClient");
  return <HeroClient heroContent={heroContent} />;
};

export default Hero;
