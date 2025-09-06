import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type Post = {
  id: number;
  title: string;
  description: string;
  images: string[];
};

export const PostsAlbumSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <span className="animate-spin h-8 w-8 inline-block border-b-2 border-blue-500 rounded-full"></span>
        <p className="mt-4 text-gray-500">Carregando álbum de fotos...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        Nenhuma ação cadastrada ainda.
      </div>
    );
  }

  return (
    <section className="container mx-auto py-20 px-4 max-w-7xl">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 tracking-tight">
        Álbum de Fotos das Ações
      </h2>
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-2xl p-8 border-0"
          >
            <div className="relative w-48 h-48 mb-6">
              <Image
                src={post.images[0] || "/globe.svg"}
                alt={post.title}
                width={192}
                height={192}
                className="rounded-full object-cover w-full h-full shadow-lg border-4 border-white"
                priority
              />
            </div>
            <h3 className="font-bold text-2xl text-gray-800 mb-2 text-center">
              {post.title}
            </h3>
            <p className="text-gray-700 text-md text-center mb-2">
              {post.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};
