import { SessionProtector } from "@/components/app/session-provider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fetchHeroContent } from "@/actions/heroContentActions";
import { HeroContentForm } from "@/components/app/pages/HeroContentForm";

const AdminPage = async () => {
  const heroContent = await fetchHeroContent();

  return (
    <SessionProtector requireAuth={true} redirectTo="/login">
      <main className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
        <h1 className="text-3xl font-bold mb-8">
          Administração de Conteúdo da Home
        </h1>
        <Tabs defaultValue="hero" className="w-full max-w-3xl">
          <TabsList className="mb-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="future" disabled>
              Próximas seções
            </TabsTrigger>
          </TabsList>
          <TabsContent>
            {heroContent ? (
              <div className="space-y-8">
                <section className="bg-white rounded shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Sobre o Projeto
                  </h2>
                  <HeroContentForm
                    id={heroContent.id}
                    initialData={{
                      title: heroContent.title,
                      subtitle: heroContent.subtitle,
                      text: heroContent.text,
                      image_url: heroContent.image_url,
                      project_info: heroContent.project_info || "",
                    }}
                    section="project"
                  />
                </section>
                <section className="bg-white rounded shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Sobre a Fundadora
                  </h2>
                  <HeroContentForm
                    id={heroContent.id}
                    initialData={{
                      founder_name: heroContent.founder_name || "",
                      founder_bio: heroContent.founder_bio || "",
                      founder_image_url: heroContent.founder_image_url || "",
                    }}
                    section="founder"
                  />
                </section>
                <section className="bg-white rounded shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Meios de Pagamento
                  </h2>
                  <HeroContentForm
                    id={heroContent.id}
                    initialData={{
                      payment_pix: heroContent.payment_pix || "",
                      payment_paypal: heroContent.payment_paypal || "",
                      payment_info: heroContent.payment_info || "",
                    }}
                    section="payment"
                  />
                </section>
                <section className="bg-white rounded shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Redes Sociais</h2>
                  <HeroContentForm
                    id={heroContent.id}
                    initialData={{
                      social_instagram: heroContent.social_instagram || "",
                      social_facebook: heroContent.social_facebook || "",
                      social_linkedin: heroContent.social_linkedin || "",
                      social_youtube: heroContent.social_youtube || "",
                    }}
                    section="social"
                  />
                </section>
              </div>
            ) : (
              <div className="text-center py-10">Carregando...</div>
            )}
          </TabsContent>
          <TabsContent>
            <div className="text-gray-400 text-center py-10">
              Em breve novas seções para gerenciar!
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </SessionProtector>
  );
};

export default AdminPage;
