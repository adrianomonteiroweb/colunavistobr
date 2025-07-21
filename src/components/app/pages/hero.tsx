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
  // Ensure project_info is never null
  const safeHeroContent = {
    ...heroContent,
    project_info:
      heroContent.project_info === null ? undefined : heroContent.project_info,
    founder_name:
      heroContent.founder_name === null ? undefined : heroContent.founder_name,
    founder_bio:
      heroContent.founder_bio === null ? undefined : heroContent.founder_bio,
    founder_image_url:
      heroContent.founder_image_url === null
        ? undefined
        : heroContent.founder_image_url,
    payment_qr_image_url:
      heroContent.payment_qr_image_url === null
        ? undefined
        : heroContent.payment_qr_image_url,
    payment_info:
      heroContent.payment_info === null ? undefined : heroContent.payment_info,
    payment_paypal:
      heroContent.payment_paypal === null
        ? undefined
        : heroContent.payment_paypal,
    payment_pix:
      heroContent.payment_pix === null ? undefined : heroContent.payment_pix,
    social_instagram:
      heroContent.social_instagram === null
        ? undefined
        : heroContent.social_instagram,
    social_linkedin:
      heroContent.social_linkedin === null
        ? undefined
        : heroContent.social_linkedin,
    social_facebook:
      heroContent.social_facebook === null
        ? undefined
        : heroContent.social_facebook,
    social_youtube:
      heroContent.social_youtube === null
        ? undefined
        : heroContent.social_youtube,
    updated_at:
      heroContent.updated_at === null
        ? undefined
        : typeof heroContent.updated_at === "object"
        ? heroContent.updated_at.toISOString()
        : heroContent.updated_at,
  };
  // Importa dinamicamente o Client Component para evitar conflito de diretivas
  const { default: HeroClient } = await import("./HeroClient");
  return <HeroClient heroContent={safeHeroContent} />;
};

export default Hero;
