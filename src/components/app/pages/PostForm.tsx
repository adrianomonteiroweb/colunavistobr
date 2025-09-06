"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { uploadPostImagesAction } from "@/actions/uploadPostImagesAction";
import { X, Upload } from "lucide-react";
import Image from "next/image";

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
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (files.length === 0) return images;

    setUploadingImages(true);
    try {
      const uploadedUrls = await uploadPostImagesAction(files);
      return [...images, ...uploadedUrls];
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalImages = await uploadImages();
      onSubmit({ title, description, images: finalImages });
      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setImages([]);
      setFiles([]);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
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

      {/* Imagens já salvas */}
      {images.length > 0 && (
        <div>
          <Label>Imagens atuais</Label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((url, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={url}
                  alt="current image"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                  onClick={() => removeImage(idx)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="images">Novas fotos</Label>
        <div className="flex items-center gap-2">
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="flex-1"
          />
          <Upload className="w-5 h-5 text-gray-400" />
        </div>

        {/* Preview das novas imagens */}
        {files.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {files.map((file, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                  onClick={() => removeFile(idx)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading || uploadingImages}
        className="w-full"
      >
        {uploadingImages ? (
          <>
            <Upload className="w-4 h-4 mr-2 animate-spin" />
            Enviando fotos...
          </>
        ) : loading ? (
          "Salvando..."
        ) : (
          "Salvar Post"
        )}
      </Button>
    </form>
  );
};
