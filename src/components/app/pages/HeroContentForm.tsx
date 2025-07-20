import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HeroContent } from "@/lib/types";
import { saveHeroContent } from "@/actions/heroContentActions";

type Section = "project" | "founder" | "payment" | "social";

interface Props {
  id: number;
  initialData: Partial<HeroContent>;
  section: Section;
}

export const HeroContentForm = ({ id, initialData, section }: Props) => {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const data: Record<string, string> = {};
        for (const [key, value] of formData.entries()) {
          if (key !== "id") data[key] = value as string;
        }
        await saveHeroContent(id, data);
      }}
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
            <Label htmlFor="image_url">URL da Imagem</Label>
            <Input
              name="image_url"
              defaultValue={initialData.image_url}
              required
            />
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
            <Label htmlFor="founder_image_url">
              URL da Imagem da Fundadora
            </Label>
            <Input
              name="founder_image_url"
              defaultValue={initialData.founder_image_url}
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
      <Button type="submit" className="w-full mt-4">
        Salvar
      </Button>
    </form>
  );
};
