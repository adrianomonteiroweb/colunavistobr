"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { HeroContent } from "@/lib/types";
import { saveHeroContent } from "@/actions/saveHeroContentAction";
import { uploadBlobAction } from "@/actions/uploadBlobAction";
import { useRef, useState } from "react";
import Image from "next/image";

type Section = "project" | "founder" | "payment" | "social";

interface Props {
  id: number;
  initialData: Partial<HeroContent>;
  section: Section;
}

export const HeroContentForm = ({ id, initialData, section }: Props) => {
  const paymentQrFileInputRef = useRef<HTMLInputElement | null>(null);
  const handlePaymentQrUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const path = `hero/payment_qr/${id}_${file.name}`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", path);
      formData.append("id", String(id));
      formData.append("type", "payment_qr_image_url");
      const { url } = await uploadBlobAction(formData);
      setPaymentQrImageUrl(url);
    } finally {
      setIsUploading(false);
    }
  };
  const [imageUrl, setImageUrl] = useState(initialData.image_url || "");
  const [founderImageUrl, setFounderImageUrl] = useState(
    initialData.founder_image_url || ""
  );
  const [isUploading, setIsUploading] = useState(false);
  const [paymentQrImageUrl, setPaymentQrImageUrl] = useState(
    typeof initialData.payment_qr_image_url === "string" &&
      initialData.payment_qr_image_url.length > 0
      ? initialData.payment_qr_image_url
      : ""
  );
  const qrImageToShow =
    paymentQrImageUrl || initialData.payment_qr_image_url || "";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const founderFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image_url" | "founder_image_url"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const path =
        type === "image_url"
          ? `hero/project/${id}_${file.name}`
          : `hero/founder/${id}_${file.name}`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", path);
      formData.append("id", String(id));
      formData.append("type", type);
      const { url } = await uploadBlobAction(formData);
      if (type === "image_url") setImageUrl(url);
      if (type === "founder_image_url") setFounderImageUrl(url);
    } finally {
      setIsUploading(false);
    }
  };

  // Função para garantir que as URLs estejam no form antes do submit
  const handlePreSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Garante que os campos hidden estejam atualizados
    const form = e.currentTarget;
    if (section === "project") {
      const input = form.querySelector(
        'input[name="image_url"]'
      ) as HTMLInputElement;
      if (input) input.value = imageUrl;
    }
    if (section === "founder") {
      const input = form.querySelector(
        'input[name="founder_image_url"]'
      ) as HTMLInputElement;
      if (input) input.value = founderImageUrl;
    }
    if (section === "payment") {
      const input = form.querySelector(
        'input[name="payment_qr_image_url"]'
      ) as HTMLInputElement;
      if (input) input.value = paymentQrImageUrl;
    }
  };

  return (
    <form
      action={async (formData) => {
        // O Next.js irá chamar saveHeroContent como server action
        // O id já está no form, as URLs são garantidas pelo handlePreSubmit
        // O server action espera (id, data)
        const data: Record<string, string> = {};
        for (const [key, value] of formData.entries()) {
          if (key !== "id") data[key] = value as string;
        }
        await saveHeroContent(Number(formData.get("id")), data);
      }}
      onSubmit={handlePreSubmit}
      className="space-y-4"
    >
      <input type="hidden" name="id" value={id} />
      {section === "project" && (
        <>
          <div>
            <Label htmlFor="title">Título</Label>
            <Input name="title" defaultValue={initialData.title} required />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              name="subtitle"
              defaultValue={initialData.subtitle}
              required
            />
          </div>
          <div>
            <Label htmlFor="text">Texto</Label>
            <Textarea name="text" defaultValue={initialData.text} required />
          </div>
          <div>
            <Label htmlFor="image_url">Imagem do Projeto</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => handleImageUpload(e, "image_url")}
                disabled={isUploading}
              />
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Project"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover rounded"
                  style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                  unoptimized
                />
              )}
            </div>
            <input type="hidden" name="image_url" value={imageUrl} />
          </div>
          <div>
            <Label htmlFor="project_info">Informações do Projeto</Label>
            <Textarea
              name="project_info"
              defaultValue={initialData.project_info}
            />
          </div>
        </>
      )}
      {section === "founder" && (
        <>
          <div>
            <Label htmlFor="founder_name">Nome da Fundadora</Label>
            <Input
              name="founder_name"
              defaultValue={initialData.founder_name}
            />
          </div>
          <div>
            <Label htmlFor="founder_bio">Bio da Fundadora</Label>
            <Textarea
              name="founder_bio"
              defaultValue={initialData.founder_bio}
            />
          </div>
          <div>
            <Label htmlFor="founder_image_url">Foto da Fundadora</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                ref={founderFileInputRef}
                onChange={(e) => handleImageUpload(e, "founder_image_url")}
                disabled={isUploading}
              />
              {founderImageUrl && (
                <Image
                  src={founderImageUrl}
                  alt="Founder"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover rounded"
                  style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                  unoptimized
                />
              )}
            </div>
            <input
              type="hidden"
              name="founder_image_url"
              value={founderImageUrl}
            />
          </div>
        </>
      )}
      {section === "payment" && (
        <>
          <div>
            <Label htmlFor="payment_pix">PIX</Label>
            <Input name="payment_pix" defaultValue={initialData.payment_pix} />
          </div>
          <div>
            <Label htmlFor="payment_paypal">PayPal</Label>
            <Input
              name="payment_paypal"
              defaultValue={initialData.payment_paypal}
            />
          </div>
          <div>
            <Label htmlFor="payment_info">Informações de Pagamento</Label>
            <Textarea
              name="payment_info"
              defaultValue={initialData.payment_info}
            />
          </div>
          <div>
            <Label htmlFor="payment_qr_image_url">Imagem QR Code PIX</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                ref={paymentQrFileInputRef}
                onChange={handlePaymentQrUpload}
                disabled={isUploading}
              />
              {qrImageToShow && (
                <Image
                  src={qrImageToShow}
                  alt="QR Code PIX"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover rounded"
                  style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                  unoptimized
                />
              )}
            </div>
            <input
              type="hidden"
              name="payment_qr_image_url"
              value={paymentQrImageUrl}
            />
          </div>
        </>
      )}
      {section === "social" && (
        <>
          <div>
            <Label htmlFor="social_instagram">Instagram</Label>
            <Input
              name="social_instagram"
              defaultValue={initialData.social_instagram}
            />
          </div>
          <div>
            <Label htmlFor="social_facebook">Facebook</Label>
            <Input
              name="social_facebook"
              defaultValue={initialData.social_facebook}
            />
          </div>
          <div>
            <Label htmlFor="social_linkedin">LinkedIn</Label>
            <Input
              name="social_linkedin"
              defaultValue={initialData.social_linkedin}
            />
          </div>
          <div>
            <Label htmlFor="social_youtube">YouTube</Label>
            <Input
              name="social_youtube"
              defaultValue={initialData.social_youtube}
            />
          </div>
        </>
      )}
      <Button type="submit" className="w-full mt-4" disabled={isUploading}>
        {isUploading ? "Enviando..." : "Salvar"}
      </Button>
    </form>
  );
};
