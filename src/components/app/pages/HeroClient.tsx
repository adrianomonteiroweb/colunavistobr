"use client";

import { Copy, Check, Instagram, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

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
  const [copied, setCopied] = useState(false);
  const { getCurrentPalette } = useTheme();
  const currentPalette: any = getCurrentPalette();

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
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: heroContent.social_facebook,
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: heroContent.social_youtube,
    },
  ];

  const PROJECT_PLACEHOLDER = "/placeholder.svg?height=600&width=600";
  const FOUNDER_PLACEHOLDER = "/placeholder.svg?height=200&width=200";
  const PAYMENT_QR_PLACEHOLDER = "/placeholder.svg?height=150&width=150";

  const [projectImageError, setProjectImageError] = useState(false);
  const [founderImageError, setFounderImageError] = useState(false);
  const [paymentQrImageError, setPaymentQrImageError] = useState(false);

  return (
    <section className="relative py-12 md:py-20 px-4 bg-[var(--background-color)]">
      <div className="container mx-auto max-w-7xl">
        {/* Grid Principal 2x2 para a Primeira Sessão */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {/* Bloco 1: Imagem do Projeto */}
          <Card
            className={cn(
              "shadow-xl rounded-3xl p-6 md:p-8 flex flex-col items-center text-center",
              "bg-[var(--card-background)] border-2"
            )}
            style={{ borderColor: currentPalette.cardBorder }}
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto mb-4">
              <Image
                src={
                  !projectImageError && heroContent.image_url
                    ? heroContent.image_url
                    : PROJECT_PLACEHOLDER
                }
                alt={heroContent.title || "Projeto"}
                width={600}
                height={600}
                className="rounded-2xl object-cover w-full h-full border-4"
                style={{
                  borderColor:
                    currentPalette.highlightColor ||
                    currentPalette.primaryButton,
                }}
                onError={() => setProjectImageError(true)}
                priority
              />
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-2">
              {heroContent.title}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-3">
              {heroContent.subtitle}
            </p>
            <p className="text-base text-[var(--text-secondary)] mb-6">
              {heroContent.text}
            </p>
          </Card>

          {/* Bloco 2: Sobre a Fundadora */}
          <Card
            className={cn(
              "shadow-xl rounded-3xl p-6 md:p-8 flex flex-col items-center text-center",
              "bg-[var(--card-background)] border-2"
            )}
            style={{ borderColor: currentPalette.cardBorder }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
              <Image
                src={
                  !founderImageError && heroContent.founder_image_url
                    ? heroContent.founder_image_url
                    : FOUNDER_PLACEHOLDER
                }
                alt={heroContent.founder_name || "Fundadora"}
                width={200}
                height={200}
                className="rounded-full object-cover w-full h-full border-4"
                style={{
                  borderColor:
                    currentPalette.secondaryAccentColor ||
                    currentPalette.primaryButton,
                }}
                onError={() => setFounderImageError(true)}
                priority
              />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
              {heroContent.founder_name}
            </h3>
            <p className="text-base text-[var(--text-secondary)] mb-6">
              {heroContent.founder_bio}
            </p>
          </Card>

          {/* Bloco 3: Chave Pix */}
          <Card
            className={cn(
              "shadow-xl rounded-3xl p-6 md:p-8 flex flex-col justify-between",
              "bg-[var(--card-background)] border-2"
            )}
            style={{ borderColor: currentPalette.cardBorder }}
          >
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Doação Rápida via PIX
              </h3>
              <p className="text-base text-[var(--text-secondary)] mb-4">
                {heroContent.payment_info}
              </p>
              <div
                className="rounded-xl p-5 mb-5 shadow-md"
                style={{ backgroundColor: currentPalette.cardInnerBackground }}
              >
                <Image
                  src={
                    !paymentQrImageError && heroContent.payment_qr_image_url
                      ? heroContent.payment_qr_image_url
                      : PAYMENT_QR_PLACEHOLDER
                  }
                  alt="QR Code PIX"
                  width={220}
                  height={220}
                  className="mx-auto rounded-lg"
                  onError={() => setPaymentQrImageError(true)}
                  priority
                />
                <p className="text-[var(--text-muted)] text-sm mt-3">
                  Escaneie o QR Code com seu app bancário
                </p>
              </div>
              <div
                className="border rounded-xl p-4 mb-4"
                style={{
                  backgroundColor: currentPalette.cardInnerBackground,
                  borderColor: currentPalette.inputBorder,
                }}
              >
                <p className="text-[var(--text-muted)] text-sm mb-2">
                  Chave PIX:
                </p>
                <div className="flex items-center justify-between gap-3">
                  <code
                    className="text-lg font-mono text-[var(--text-primary)] px-3 py-2 rounded-lg break-all flex-grow"
                    style={{ backgroundColor: currentPalette.codeBackground }}
                  >
                    {heroContent.payment_pix}
                  </code>
                  <Button
                    onClick={copyPixKey}
                    size="lg"
                    variant="outline"
                    className="flex items-center gap-2 text-base bg-transparent"
                    style={{
                      borderColor: currentPalette.primaryButton,
                      color: currentPalette.primaryButton,
                      backgroundColor: currentPalette.primaryButtonForeground,
                    }}
                  >
                    {copied ? (
                      <>
                        <Check
                          className="h-5 w-5"
                          style={{ color: currentPalette.successColor }}
                        />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              variant="default"
              className="w-full text-lg font-semibold rounded-xl py-3"
              style={{
                backgroundColor: currentPalette.primaryButton,
                color: currentPalette.primaryButtonForeground,
              }}
            >
              <Link href="#doacoes">Doar Agora</Link>
            </Button>
          </Card>

          {/* Bloco 4: Redes Sociais */}
          <Card
            className={cn(
              "shadow-xl rounded-3xl p-6 md:p-8 flex flex-col justify-between",
              "bg-[var(--card-background)] border-2"
            )}
            style={{ borderColor: currentPalette.cardBorder }}
          >
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Siga Nossas Redes
              </h3>
              <p className="text-base text-[var(--text-secondary)] mb-6">
                Acompanhe nosso trabalho de perto!
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-all duration-200 flex flex-col items-center space-y-2 transform hover:scale-105`}
                  style={{
                    color:
                      currentPalette.tertiaryAccentColor ||
                      currentPalette.primaryButton,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      currentPalette.highlightColor ||
                      currentPalette.primaryButton;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      currentPalette.tertiaryAccentColor ||
                      currentPalette.primaryButton;
                  }}
                  aria-label={`Siga-nos no ${social.name}`}
                >
                  <social.icon className={`h-10 w-10`} />
                  <span className="text-sm font-medium">
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
