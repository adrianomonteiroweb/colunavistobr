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
import {
  updatePost,
  deletePost,
  createPost,
  fetchPosts,
} from "@/actions/postActions";
import { deleteBlob } from "@/lib/blob";
import { Trash2, Edit, Plus } from "lucide-react";

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
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(
        data.map((post) => ({
          ...post,
          images: Array.isArray(post.images) ? post.images : [],
          created_at:
            post.created_at?.toISOString() || new Date().toISOString(),
          updated_at:
            post.updated_at?.toISOString() || new Date().toISOString(),
        }))
      );
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const handleDeletePost = async (post: Post) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

    setDeleteLoading(post.id);
    try {
      // Primeiro deletar as imagens do blob storage
      if (post.images && post.images.length > 0) {
        const deletePromises = post.images.map((url) => deleteBlob(url));
        await Promise.all(deletePromises);
      }

      // Depois deletar o post do banco
      await deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePost = async (values: PostFormValues) => {
    if (!editingPost) return;

    setEditLoading(true);
    try {
      // Se há imagens antigas que não estão mais na lista, deletar do blob
      const oldImages = editingPost.images || [];
      const newImages = values.images || [];
      const imagesToDelete = oldImages.filter(
        (url) => !newImages.includes(url)
      );

      if (imagesToDelete.length > 0) {
        const deletePromises = imagesToDelete.map((url) => deleteBlob(url));
        await Promise.all(deletePromises);
      }

      await updatePost(editingPost.id, values);
      await loadPosts();
      setEditingPost(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setEditLoading(false);
    }
  };

  const handleCreatePost = async (values: PostFormValues) => {
    setLoading(true);
    try {
      await createPost(values);
      await loadPosts();
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
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

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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

                  <div className="flex gap-2">
                    <Dialog
                      open={isEditDialogOpen && editingPost?.id === post.id}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger>
                        <Button
                          variant="outline"
                          onClick={() => handleEditPost(post)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Editar Post</DialogTitle>
                        </DialogHeader>
                        {editingPost?.id === post.id && (
                          <PostForm
                            initialData={{
                              title: post.title,
                              description: post.description,
                              images: post.images || [],
                            }}
                            onSubmit={handleUpdatePost}
                            loading={editLoading}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

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
