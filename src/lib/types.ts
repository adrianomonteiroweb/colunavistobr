export type HeroContent = {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image_url: string;
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
  updated_at: Date;
};

export type HeroContentFormValues = Omit<HeroContent, "id" | "updated_at">;

export type HeroContentFormProps = {
  initialData: HeroContent;
  onSubmit: (data: HeroContentFormValues) => Promise<void>;
};
