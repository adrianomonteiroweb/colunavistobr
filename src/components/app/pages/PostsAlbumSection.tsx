"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Calendar, Users } from "lucide-react";

type Post = {
  id: number;
  title: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
};

export const PostsAlbumSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((post: any) => ({
          ...post,
          images: Array.isArray(post.images) ? post.images : [],
          created_at: post.created_at || new Date().toISOString(),
          updated_at: post.updated_at || new Date().toISOString(),
        }));
        setPosts(formattedData);
      })
      .finally(() => setLoading(false));
  }, []);

  const openPostModal = (post: Post) => {
    setSelectedPost(post);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    if (selectedPost && selectedPost.images.length > 1) {
      setSelectedImageIndex((prev) =>
        prev === selectedPost.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedPost && selectedPost.images.length > 1) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? selectedPost.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <section className="container mx-auto py-20 px-4 max-w-7xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 tracking-tight">
          Álbum de Fotos das Ações
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-3xl h-80"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="container mx-auto py-20 px-4 max-w-7xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 tracking-tight">
          Álbum de Fotos das Ações
        </h2>
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 max-w-md mx-auto">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Em breve
            </h3>
            <p className="text-gray-500">
              Álbum de fotos das ações em desenvolvimento
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-20 px-4 max-w-7xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 text-gray-800 tracking-tight">
          Álbum das Ações
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Acompanhe as ações e projetos realizados
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="group overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-0 cursor-pointer transform hover:-translate-y-2"
            onClick={() => openPostModal(post)}
          >
            <div className="relative h-96 overflow-hidden">
              {post.images.length > 0 ? (
                <Image
                  src={post.images[0]}
                  alt={post.title}
                  width={400}
                  height={384}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              {post.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  +{post.images.length - 1} fotos
                </div>
              )}

              {/* Overlay com título sobre a imagem */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <h3 className="font-bold text-xl text-white mb-1 group-hover:text-blue-200 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(post.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>
                    {post.images.length} foto
                    {post.images.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de detalhes do post */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800">
                  {selectedPost.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Galeria de imagens */}
                {selectedPost.images.length > 0 && (
                  <div className="relative">
                    <div className="relative h-96 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={selectedPost.images[selectedImageIndex]}
                        alt={`${selectedPost.title} - ${
                          selectedImageIndex + 1
                        }`}
                        width={800}
                        height={400}
                        className="w-full h-full object-cover"
                      />

                      {selectedPost.images.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={prevImage}
                          >
                            ←
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={nextImage}
                          >
                            →
                          </Button>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {selectedImageIndex + 1} /{" "}
                            {selectedPost.images.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {selectedPost.images.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {selectedPost.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                              idx === selectedImageIndex
                                ? "border-blue-500 ring-2 ring-blue-200"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Descrição */}
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">
                    Sobre esta ação
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedPost.description}
                  </p>
                </div>

                {/* Informações adicionais */}
                <div className="flex items-center gap-6 text-sm text-gray-500 pt-4 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Publicado em{" "}
                      {new Date(selectedPost.created_at).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>
                      {selectedPost.images.length} imagem
                      {selectedPost.images.length !== 1 ? "ns" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
