"use client";
import { useEffect, useState } from "react";
import { PostForm, PostFormValues } from "./PostForm";
import { Button } from "@/components/ui/button";

export const AdminPostsSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const handleCreatePost = async (values: PostFormValues) => {
    setLoading(true);
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const updated = await fetch("/api/posts").then((res) => res.json());
    setPosts(updated);
    setLoading(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <div className="bg-orange-500 text-white p-3 rounded-full mr-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Posts</h2>
          <p className="text-gray-600">
            Gerencie posts com título, descrição e fotos
          </p>
        </div>
      </div>
      {/* Formulário para criar novo post */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Novo Post</h3>
        <PostForm onSubmit={handleCreatePost} loading={loading} />
      </div>
      {/* Lista de posts existentes */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Posts Existentes</h3>
        <div className="grid gap-4">
          {posts.length === 0 ? (
            <p className="text-gray-500">Nenhum post cadastrado.</p>
          ) : (
            posts.map((post) => {
              const images = Array.isArray(post.images) ? post.images : [];
              return (
                <div
                  key={post.id}
                  className="border rounded-lg p-4 bg-white shadow"
                >
                  <h4 className="font-bold text-xl mb-1">{post.title}</h4>
                  <p className="text-gray-700 mb-2">{post.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {images.map((img: string, idx: number) => (
                      <img
                        key={idx}
                        src={img}
                        alt="post"
                        className="w-20 h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                  {/* Botões de editar/excluir podem ser adicionados aqui */}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
