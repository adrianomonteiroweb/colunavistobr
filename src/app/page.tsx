import Hero from "@/components/app/pages/hero";

const heroProps = {
  projectTitle: "Coluna Visto BR: Transformando Vidas no Brasil",
  projectDescription:
    "Levamos amor, educação e dignidade para comunidades vulneráveis. Conheça a missão de Victoria Barros e como você pode fazer a diferença.",
  founderName: "Victoria Barros",
  founderDescription: "Fundadora e Coração do Projeto",
  founderImageUrl: "/placeholder.svg?height=200&width=200",
  pixKey: "13996841291",
  pixQrCodeUrl: "/placeholder.svg?height=150&width=150",
  pixInstructions: "Sua ajuda transforma vidas!",
  instagramUrl: "https://instagram.com/colunavisto.br",
  facebookUrl: "https://facebook.com/tvcolunavisto",
  youtubeUrl: "https://youtube.com/@victoriabarros.colunavisto",
};

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      <Hero {...heroProps} />
    </main>
  );
};

export default Home;
