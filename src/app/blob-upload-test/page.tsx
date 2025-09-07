"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BlobUploadTestPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFile(e.target.files?.[0] || null);
    setUrl(null);
    setProgress(0);
    setError(null);
  };

  const handleUpload = async (): Promise<void> => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setUrl(null);
    setProgress(0);
    try {
      const form_data = new FormData();
      form_data.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: form_data,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = (await response.json()) as { url: string };
      setUrl(data.url);
      setProgress(100);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-2">Blob Upload Test</h1>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full"
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded h-3 mt-2">
          <div
            className="bg-blue-500 h-3 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {progress > 0 && <div className="text-sm text-gray-600">{progress}%</div>}
      {url && (
        <div className="mt-4">
          <p className="text-green-700">Upload successful!</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {url}
          </a>
          <Image
            src={url}
            alt="Uploaded"
            width={500}
            height={300}
            className="mt-2 max-w-full h-auto rounded"
          />
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default BlobUploadTestPage;
