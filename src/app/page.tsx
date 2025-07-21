import Hero from "@/components/app/pages/hero";

const Home = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#40673C]">
      <section className="w-full max-w-4xl rounded-xl shadow-lg p-8 bg-[#E9BE0F] flex flex-col items-center justify-center">
        <Hero />
      </section>
    </main>
  );
};

export default Home;
