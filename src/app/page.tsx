"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Copy, Check, Instagram, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePublicHeroContent } from "@/hooks/use-public-hero-content";
import { Skeleton } from "@/components/ui/skeleton";
import { PostsAlbumSection } from "@/components/app/pages/PostsAlbumSection";

export default function DynamicHero() {
  const { content, isLoading, error } = usePublicHeroContent();
  const [pixCopied, setPixCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Conteúdo principal - Skeleton */}
            <div className="space-y-8">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-32 w-full" />
            </div>

            {/* Imagem - Skeleton */}
            <div className="relative">
              <Skeleton className="aspect-square rounded-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !content) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Carregando...
            </h1>
            <p className="text-gray-600">
              {error || "Conteúdo não encontrado"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Conteúdo principal */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  {content.title}
                </h1>
                <h2 className="text-xl lg:text-2xl text-blue-600 font-medium">
                  {content.subtitle}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {content.text}
                </p>
                {content.project_info && (
                  <p className="text-md text-gray-700 bg-white/50 p-4 rounded-lg">
                    {content.project_info}
                  </p>
                )}
              </div>

              {/* Redes sociais */}
              <div className="flex space-x-4">
                {content.social_instagram && (
                  <Link
                    href={content.social_instagram}
                    target="_blank"
                    className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="w-6 h-6" />
                  </Link>
                )}
                {content.social_facebook && (
                  <Link
                    href={content.social_facebook}
                    target="_blank"
                    className="p-3 bg-blue-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Facebook className="w-6 h-6" />
                  </Link>
                )}
                {content.social_youtube && (
                  <Link
                    href={content.social_youtube}
                    target="_blank"
                    className="p-3 bg-red-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Youtube className="w-6 h-6" />
                  </Link>
                )}
              </div>

              {/* Botão de doação */}
              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Apoie o Projeto
                </Button>
              </div>
            </div>

            {/* Imagem principal */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="aspect-square rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 p-8 shadow-2xl">
                  <Image
                    src={content.image_url || "/globe.svg"}
                    alt={content.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                </div>

                {/* Card de doação PIX */}
                {content.payment_pix && (
                  <Card className="absolute -bottom-6 -right-6 p-4 bg-white shadow-xl border-2 border-green-200">
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-gray-700">PIX</p>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {content.payment_pix.length > 20
                            ? `${content.payment_pix.substring(0, 20)}...`
                            : content.payment_pix}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(content.payment_pix!)}
                          className="h-6 w-6 p-0"
                        >
                          {pixCopied ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      {content.payment_qr_image_url && (
                        <div className="mt-2">
                          <Image
                            src={content.payment_qr_image_url}
                            alt="QR Code PIX"
                            width={120}
                            height={120}
                            className="mx-auto"
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Seção da fundadora */}
          {content.founder_name && (
            <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {content.founder_image_url && (
                  <div className="md:col-span-1">
                    <div className="relative w-48 h-48 mx-auto">
                      <Image
                        src={content.founder_image_url}
                        alt={content.founder_name}
                        width={200}
                        height={200}
                        className="rounded-full object-cover w-full h-full shadow-lg"
                      />
                    </div>
                  </div>
                )}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {content.founder_name}
                  </h3>
                  {content.founder_bio && (
                    <p className="text-gray-600 leading-relaxed">
                      {content.founder_bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Informações de pagamento adicionais */}
          {content.payment_info && (
            <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <h4 className="text-xl font-bold text-green-800 mb-4 text-center">
                Como Apoiar a Fundadora
              </h4>
              <p className="text-green-700 mb-6 text-center leading-relaxed">
                {content.payment_info}
              </p>

              {/* Informações de pagamento centralizadas */}
              {content.payment_pix && (
                <div className="max-w-lg mx-auto">
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-green-100">
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <h5 className="text-xl font-bold text-green-800">
                        PIX - Doação Rápida
                      </h5>
                    </div>

                    <div className="space-y-6 text-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-3 font-medium">
                          Chave PIX:
                        </p>
                        <code className="bg-gray-100 px-4 py-3 rounded-lg text-base font-mono block break-all">
                          {content.payment_pix}
                        </code>
                      </div>

                      {content.payment_qr_image_url && (
                        <div>
                          <p className="text-sm text-gray-600 mb-4 font-medium">
                            QR Code:
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg inline-block">
                            <Image
                              src={content.payment_qr_image_url}
                              alt="QR Code PIX"
                              width={160}
                              height={160}
                              className="mx-auto rounded-lg"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Escaneie com seu app bancário
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-green-600 text-sm font-medium">
                  Toda doação, por menor que seja, faz a diferença! 💚
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Álbum de fotos dos posts */}
      <PostsAlbumSection />
    </>
  );
}
