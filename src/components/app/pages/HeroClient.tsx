"use client";

import { Copy, Check, Instagram, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

type HeroContent = {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image_url?: string;
  project_info?: string;
  founder_name?: string;
  founder_bio?: string;
  founder_image_url?: string;
  social_instagram?: string;
  social_facebook?: string;
  social_linkedin?: string;
  social_youtube?: string;
  payment_pix?: string;
  payment_paypal?: string;
  payment_info?: string;
  payment_qr_image_url?: string;
  updated_at?: string;
};

const HeroClient: React.FC<{ heroContent: HeroContent }> = ({
  heroContent,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(heroContent.payment_pix || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: heroContent.social_instagram,
      color: "text-pink-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: heroContent.social_facebook,
      color: "text-blue-600",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: heroContent.social_youtube,
      color: "text-red-600",
    },
  ];

  // Exibir imagens diretamente, fallback para placeholder via onError
  const PROJECT_PLACEHOLDER = "/placeholder.svg?height=300&width=300";
  const FOUNDER_PLACEHOLDER = "/placeholder.svg?height=200&width=200";
  const PAYMENT_QR_PLACEHOLDER = "/placeholder.svg?height=150&width=150";

  const [projectImageError, setProjectImageError] = useState(false);
  const [founderImageError, setFounderImageError] = useState(false);
  const [paymentQrImageError, setPaymentQrImageError] = useState(false);

  return (
    <section className="relative bg-white py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Grid Principal 2x2 para a Primeira Sessão */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {/* Bloco 1: Imagem do Projeto */}
          <Card className="border-0 shadow-sm bg-gray-50 p-4 md:p-6 flex flex-col items-center text-center">
            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-3">
              <Image
                src={
                  !projectImageError && heroContent.image_url
                    ? heroContent.image_url
                    : PROJECT_PLACEHOLDER
                }
                alt={heroContent.title || "Projeto"}
                width={300}
                height={300}
                className="rounded-xl object-cover w-full h-full border-2 border-green-100"
                onError={() => setProjectImageError(true)}
                priority
              />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">
              {heroContent.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{heroContent.subtitle}</p>
            <Button
              asChild
              size="sm"
              className="bg-gray-900 hover:bg-gray-800 text-white w-full"
            >
              <Link href="#sobre">Saiba Mais</Link>
            </Button>
          </Card>

          {/* Bloco 2: Sobre a Fundadora */}
          <Card className="border-0 shadow-sm bg-gray-50 p-4 md:p-6 flex flex-col items-center text-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-3">
              <Image
                src={
                  !founderImageError && heroContent.founder_image_url
                    ? heroContent.founder_image_url
                    : FOUNDER_PLACEHOLDER
                }
                alt={heroContent.founder_name || "Fundadora"}
                width={200}
                height={200}
                className="rounded-full object-cover w-full h-full border-2 border-green-100"
                onError={() => setFounderImageError(true)}
                priority
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
              {heroContent.founder_name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {heroContent.founder_bio}
            </p>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full bg-transparent"
            >
              <Link href="#biografia">Conheça a Victoria</Link>
            </Button>
          </Card>

          {/* Bloco 3: Chave Pix */}
          <Card className="border-0 shadow-sm bg-gray-50 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Doação Rápida via PIX
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                {heroContent.payment_info}
              </p>
              <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                <Image
                  src={
                    !paymentQrImageError && heroContent.payment_qr_image_url
                      ? heroContent.payment_qr_image_url
                      : PAYMENT_QR_PLACEHOLDER
                  }
                  alt="QR Code PIX"
                  width={150}
                  height={150}
                  className="mx-auto"
                  onError={() => setPaymentQrImageError(true)}
                  priority
                />
                <p className="text-gray-600 text-xs mt-2">
                  Escaneie o QR Code com seu app bancário
                </p>
              </div>
              <div className="bg-white border rounded-lg p-3 mb-3">
                <p className="text-gray-600 text-xs mb-1">Chave PIX:</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-base font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded break-all">
                    {heroContent.payment_pix}
                  </code>
                  <Button
                    onClick={copyPixKey}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 bg-transparent text-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-green-600" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              asChild
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white w-full"
            >
              <Link href="#doacoes">Doar Agora</Link>
            </Button>
          </Card>

          {/* Bloco 4: Redes Sociais */}
          <Card className="border-0 shadow-sm bg-gray-50 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Siga Nossas Redes
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Acompanhe nosso trabalho de perto!
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-1`}
                  aria-label={`Siga-nos no ${social.name}`}
                >
                  <social.icon className={`h-5 w-5 ${social.color}`} />
                  <span className="text-sm font-medium hidden sm:inline">
                    {social.name}
                  </span>{" "}
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroClient;
