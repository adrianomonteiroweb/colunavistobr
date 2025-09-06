import { SessionProtector } from "@/components/app/session-provider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fetchHeroContent } from "@/actions/heroContentActions";
import { HeroContentForm } from "@/components/app/pages/HeroContentForm";
import { AdminPostsSection } from "@/components/app/pages/AdminPostsSection";

const AdminPage = async () => {
  const heroContent = await fetchHeroContent();

  return (
    <SessionProtector requireAuth={true} redirectTo="/login">
      <main className="min-h-screen bg-gray-50 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Administração de Conteúdo
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Edite as informações, fotos e imagens da página principal
            </p>

            {/* Botão para visualizar a página principal */}
            <div className="flex justify-center">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Visualizar Página Principal
              </a>
            </div>
          </div>

          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="hero" className="text-lg py-3">
                Conteúdo da Página Principal
              </TabsTrigger>
              <TabsTrigger value="posts" className="text-lg py-3">
                Gerenciar Posts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-8">
              <AdminPostsSection />
            </TabsContent>

            <TabsContent value="hero" className="space-y-8">
              {heroContent ? (
                <div className="grid gap-8">
                  {/* Seção do Projeto */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          Sobre o Projeto
                        </h2>
                        <p className="text-gray-600">
                          Título, subtítulo, descrição e imagem principal
                        </p>
                      </div>
                    </div>
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
                  </div>

                  {/* Seção da Fundadora */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-purple-500 text-white p-3 rounded-full mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          Sobre a Fundadora
                        </h2>
                        <p className="text-gray-600">
                          Informações pessoais e foto da fundadora
                        </p>
                      </div>
                    </div>
                    <HeroContentForm
                      id={heroContent.id}
                      initialData={{
                        founder_name: heroContent.founder_name || "",
                        founder_bio: heroContent.founder_bio || "",
                        founder_image_url: heroContent.founder_image_url || "",
                      }}
                      section="founder"
                    />
                  </div>

                  {/* Seção de Pagamentos */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-green-500 text-white p-3 rounded-full mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          Meios de Pagamento
                        </h2>
                        <p className="text-gray-600">
                          PIX, PayPal e QR Code para doações
                        </p>
                      </div>
                    </div>
                    <HeroContentForm
                      id={heroContent.id}
                      initialData={{
                        payment_pix: heroContent.payment_pix || "",
                        payment_paypal: heroContent.payment_paypal || "",
                        payment_info: heroContent.payment_info || "",
                        payment_qr_image_url:
                          heroContent.payment_qr_image_url || "",
                      }}
                      section="payment"
                    />
                  </div>

                  {/* Seção de Redes Sociais */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-pink-500 text-white p-3 rounded-full mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          Redes Sociais
                        </h2>
                        <p className="text-gray-600">
                          Links para Instagram, Facebook e YouTube
                        </p>
                      </div>
                    </div>
                    <HeroContentForm
                      id={heroContent.id}
                      initialData={{
                        social_instagram: heroContent.social_instagram || "",
                        social_facebook: heroContent.social_facebook || "",
                        social_youtube: heroContent.social_youtube || "",
                      }}
                      section="social"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Carregando conteúdo...
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="future">
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-12 border-2 border-dashed border-blue-200">
                  <svg
                    className="w-16 h-16 text-blue-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Em Desenvolvimento
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Novas funcionalidades para gerenciar galeria de fotos,
                    agenda de eventos e depoimentos estão sendo desenvolvidas.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SessionProtector>
  );
};

export default AdminPage;
