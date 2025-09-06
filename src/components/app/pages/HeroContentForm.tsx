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
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
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
        setIsSaving(true);
        setSaveSuccess(false);
        try {
          const data: Record<string, string> = {};
          for (const [key, value] of formData.entries()) {
            if (key !== "id") data[key] = value as string;
          }
          await saveHeroContent(Number(formData.get("id")), data);
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000); // Remove o feedback após 3 segundos
        } finally {
          setIsSaving(false);
        }
      }}
      onSubmit={handlePreSubmit}
      className="space-y-6"
    >
      <input type="hidden" name="id" value={id} />
      {section === "project" && (
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Título Principal
              </Label>
              <Input
                name="title"
                defaultValue={initialData.title}
                required
                placeholder="Ex: Coluna Visto BR"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-sm font-medium">
                Subtítulo
              </Label>
              <Input
                name="subtitle"
                defaultValue={initialData.subtitle}
                required
                placeholder="Ex: ONG de apoio humanitário"
                className="text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text" className="text-sm font-medium">
              Descrição Principal
            </Label>
            <Textarea
              name="text"
              defaultValue={initialData.text}
              required
              placeholder="Descreva a missão e objetivos da ONG..."
              className="text-base min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image_url" className="text-sm font-medium">
              Imagem do Projeto
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e, "image_url")}
                    disabled={isUploading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                  </p>
                </div>
                {imageUrl && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="relative">
                      <Image
                        src={imageUrl}
                        alt="Project Preview"
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover rounded-lg border-2 border-gray-200"
                        unoptimized
                      />
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <input type="hidden" name="image_url" value={imageUrl} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_info" className="text-sm font-medium">
              Informações Adicionais do Projeto
            </Label>
            <Textarea
              name="project_info"
              defaultValue={initialData.project_info}
              placeholder="Informações complementares sobre o projeto..."
              className="text-base min-h-[100px]"
            />
          </div>
        </div>
      )}
      {section === "founder" && (
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="founder_name" className="text-sm font-medium">
              Nome da Fundadora
            </Label>
            <Input
              name="founder_name"
              defaultValue={initialData.founder_name}
              placeholder="Ex: Victoria Barros"
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="founder_bio" className="text-sm font-medium">
              Biografia da Fundadora
            </Label>
            <Textarea
              name="founder_bio"
              defaultValue={initialData.founder_bio}
              placeholder="Conte a história e motivação da fundadora..."
              className="text-base min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="founder_image_url" className="text-sm font-medium">
              Foto da Fundadora
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    ref={founderFileInputRef}
                    onChange={(e) => handleImageUpload(e, "founder_image_url")}
                    disabled={isUploading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                  </p>
                </div>
                {founderImageUrl && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="relative">
                      <Image
                        src={founderImageUrl}
                        alt="Founder Preview"
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover rounded-full border-2 border-gray-200"
                        unoptimized
                      />
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <input
              type="hidden"
              name="founder_image_url"
              value={founderImageUrl}
            />
          </div>
        </div>
      )}
      {section === "payment" && (
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payment_pix" className="text-sm font-medium">
                Chave PIX
              </Label>
              <Input
                name="payment_pix"
                defaultValue={initialData.payment_pix}
                placeholder="Ex: email@exemplo.com ou CPF/CNPJ"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment_paypal" className="text-sm font-medium">
                PayPal
              </Label>
              <Input
                name="payment_paypal"
                defaultValue={initialData.payment_paypal}
                placeholder="Ex: https://paypal.me/usuario"
                className="text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_info" className="text-sm font-medium">
              Instruções de Pagamento
            </Label>
            <Textarea
              name="payment_info"
              defaultValue={initialData.payment_info}
              placeholder="Instruções detalhadas sobre como fazer doações..."
              className="text-base min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="payment_qr_image_url"
              className="text-sm font-medium"
            >
              Imagem QR Code PIX
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    ref={paymentQrFileInputRef}
                    onChange={handlePaymentQrUpload}
                    disabled={isUploading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                  </p>
                </div>
                {qrImageToShow && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="relative">
                      <Image
                        src={qrImageToShow}
                        alt="QR Code PIX Preview"
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover rounded-lg border-2 border-gray-200"
                        unoptimized
                      />
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <input
              type="hidden"
              name="payment_qr_image_url"
              value={paymentQrImageUrl}
            />
          </div>
        </div>
      )}
      {section === "social" && (
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="social_instagram" className="text-sm font-medium">
                Instagram
              </Label>
              <Input
                name="social_instagram"
                defaultValue={initialData.social_instagram}
                placeholder="Ex: https://instagram.com/usuario"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_facebook" className="text-sm font-medium">
                Facebook
              </Label>
              <Input
                name="social_facebook"
                defaultValue={initialData.social_facebook}
                placeholder="Ex: https://facebook.com/pagina"
                className="text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="social_youtube" className="text-sm font-medium">
                YouTube
              </Label>
              <Input
                name="social_youtube"
                defaultValue={initialData.social_youtube}
                placeholder="Ex: https://youtube.com/canal"
                className="text-base"
              />
            </div>
          </div>
        </div>
      )}
      <div className="pt-4 space-y-3">
        <Button
          type="submit"
          className="w-full"
          disabled={isUploading || isSaving}
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Salvando...
            </>
          ) : isUploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Enviando...
            </>
          ) : (
            "Salvar Alterações"
          )}
        </Button>

        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Alterações salvas com sucesso!
          </div>
        )}
      </div>
    </form>
  );
};
