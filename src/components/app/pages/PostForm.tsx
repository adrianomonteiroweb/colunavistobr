"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type PostFormValues = {
  title: string;
  description: string;
  images: string[];
};

type Props = {
  initialData?: PostFormValues;
  onSubmit: (values: PostFormValues) => void;
  loading?: boolean;
};

export const PostForm = ({ initialData, onSubmit, loading }: Props) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: upload files and get URLs, then call onSubmit
    onSubmit({ title, description, images });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="images">Fotos</Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {files.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-20 h-20 object-cover rounded border"
            />
          ))}
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar Post"}
      </Button>
    </form>
  );
};
