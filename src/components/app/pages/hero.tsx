"use client";

import { useState } from "react";
import { Heart, Copy, Check, Instagram, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroProps {
  projectTitle: string;
  projectDescription: string;
  founderName: string;
  founderDescription: string;
  founderImageUrl: string;
  pixKey: string;
  pixQrCodeUrl: string;
  pixInstructions: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
}

export default function Hero({
  projectTitle,
  projectDescription,
  founderName,
  founderDescription,
  founderImageUrl,
  pixKey,
  pixQrCodeUrl,
  pixInstructions,
  instagramUrl,
  facebookUrl,
  youtubeUrl,
}: HeroProps) {
  const [copied, setCopied] = useState(false);

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
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
      url: instagramUrl,
      color: "text-pink-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: facebookUrl,
      color: "text-blue-600",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: youtubeUrl,
      color: "text-red-600",
    },
  ];

  return (
    <section className="relative bg-white py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Grid Principal 2x2 para a Primeira Sessão */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {/* Bloco 1: Sobre o Projeto */}
          <Card className="border-0 shadow-sm bg-gray-50 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center bg-white rounded-full px-3 py-1 mb-3">
                <Heart className="h-3 w-3 text-gray-600 mr-1" />
                <span className="text-xs text-gray-700 font-medium">
                  Projeto Social
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {projectTitle}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {projectDescription}
              </p>
            </div>
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
                src={founderImageUrl || "/placeholder.svg?height=200&width=200"}
                alt={founderName}
                width={200}
                height={200}
                className="rounded-full object-cover w-full h-full border-2 border-green-100"
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
              {founderName}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{founderDescription}</p>
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
              <p className="text-sm text-gray-700 mb-3">{pixInstructions}</p>
              <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                <Image
                  src={pixQrCodeUrl || "/placeholder.svg?height=150&width=150"} // Usando placeholder para o QR Code
                  alt="QR Code PIX"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
                <p className="text-gray-600 text-xs mt-2">
                  Escaneie o QR Code com seu app bancário
                </p>
              </div>
              <div className="bg-white border rounded-lg p-3 mb-3">
                <p className="text-gray-600 text-xs mb-1">Chave PIX:</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-base font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded break-all">
                    {pixKey}
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
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-1`}
                  aria-label={`Siga-nos no ${social.name}`}
                >
                  <social.icon className={`h-5 w-5 ${social.color}`} />
                  <span className="text-sm font-medium hidden sm:inline">
                    {social.name}
                  </span>{" "}
                  {/* Oculta o nome em telas muito pequenas */}
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
