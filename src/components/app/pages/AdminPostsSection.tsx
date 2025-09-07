"use client";
import { useEffect, useState } from "react";
import { PostForm, PostFormValues } from "./PostForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { deletePost, createPost, fetchPosts } from "@/actions/postActions";
import { deleteBlobAction } from "@/actions/deleteBlobAction";
import { Trash2, Plus } from "lucide-react";

type Post = {
  id: number;
  title: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
};

export const AdminPostsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      setError(null);
      console.log("Loading posts from server...");

      const data = await fetchPosts();
      console.log("Fetched posts data:", data);

      const processedPosts = data.map((post) => ({
        ...post,
        id: Number(post.id), // Garantir que o ID seja number
        images: Array.isArray(post.images) ? post.images : [],
        created_at: post.created_at?.toISOString() || new Date().toISOString(),
        updated_at: post.updated_at?.toISOString() || new Date().toISOString(),
      }));

      console.log("Processed posts:", processedPosts);
      setPosts(processedPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setError(`Erro ao carregar posts: ${errorMessage}`);
    }
  };

  const handleDeletePost = async (post: Post) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

    const postId = Number(post.id);
    if (!postId || isNaN(postId)) {
      setError("ID do post inválido");
      return;
    }

    setDeleteLoading(postId);
    setError(null);

    try {
      console.log(
        "Starting delete process for post ID:",
        postId,
        "Type:",
        typeof postId
      );

      // Tentar deletar as imagens do blob storage (não crítico)
      if (post.images && post.images.length > 0) {
        console.log(
          "Attempting to delete images from blob storage:",
          post.images
        );
        try {
          // Verificar se o BLOB_TOKEN está configurado antes de tentar deletar
          const deletePromises = post.images.map((url) => {
            return deleteBlobAction(url).catch((blobError: any) => {
              console.warn(`Failed to delete blob image ${url}:`, blobError);
              return null; // Continuar mesmo se falhar
            });
          });
          await Promise.allSettled(deletePromises);
          console.log(
            "Blob deletion attempts completed (some may have failed)"
          );
        } catch (blobError) {
          console.warn(
            "Failed to delete some images from blob storage:",
            blobError
          );
          console.log("Continuing with post deletion anyway...");
        }
      }

      // Deletar o post do banco (crítico)
      console.log("Deleting post from database with ID:", postId);
      const result = await deletePost(postId);
      console.log("Delete result:", result);

      if (!result?.success) {
        throw new Error("Falha ao deletar o post do banco de dados");
      }

      // Atualizar o estado local imediatamente para feedback visual
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));

      // Recarregar a lista completa do servidor para garantir sincronização
      console.log("Reloading posts from server...");
      await loadPosts();

      console.log("Post deleted successfully and list updated");
    } catch (error) {
      console.error("Error deleting post:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setError(`Erro ao excluir o post: ${errorMessage}`);

      // Recarregar a lista para garantir consistência mesmo em caso de erro
      await loadPosts();
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleCreatePost = async (values: PostFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const newPost = await createPost(values);
      console.log("Post created successfully:", newPost);

      // Recarregar a lista de posts
      await loadPosts();

      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Erro ao criar o post. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
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

        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) {
              setError(null);
            }
          }}
        >
          <DialogTrigger>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Post</DialogTitle>
            </DialogHeader>
            <PostForm onSubmit={handleCreatePost} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Lista de posts existentes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Posts Existentes</h3>
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <p className="text-lg font-medium">Nenhum post cadastrado</p>
            <p className="text-sm">
              Clique em &quot;Novo Post&quot; para criar o primeiro
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => {
              const images = Array.isArray(post.images) ? post.images : [];
              return (
                <div
                  key={post.id}
                  className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-2 text-gray-800">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 mb-3">{post.description}</p>
                      <p className="text-xs text-gray-400">
                        Criado em:{" "}
                        {new Date(post.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  {/* Galeria de imagens */}
                  {images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Imagens ({images.length})
                      </p>
                      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {images.map((img: string, idx: number) => (
                          <div key={idx} className="relative group">
                            <Image
                              src={img}
                              alt={`${post.title} - ${idx + 1}`}
                              width={80}
                              height={80}
                              className="w-full aspect-square object-cover rounded border hover:scale-105 transition-transform cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="destructive"
                      onClick={() => handleDeletePost(post)}
                      disabled={deleteLoading === post.id}
                      className="flex items-center gap-2"
                    >
                      {deleteLoading === post.id ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Excluindo...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
