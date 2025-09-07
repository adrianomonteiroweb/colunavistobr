"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deletePost, fetchPosts } from "@/actions/postActions";

export const PostDebugPanel = () => {
  const [debugOutput, setDebugOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addDebugLine = (line: string) => {
    setDebugOutput((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${line}`,
    ]);
  };

  const testFetchPosts = async () => {
    setLoading(true);
    addDebugLine("🔍 Testando fetchPosts...");

    try {
      const posts = await fetchPosts();
      addDebugLine(
        `✅ fetchPosts executado com sucesso. Posts encontrados: ${posts.length}`
      );
      posts.forEach((post, index) => {
        addDebugLine(
          `  Post ${index + 1}: ID=${post.id}, Title="${post.title}"`
        );
      });
      return posts;
    } catch (error) {
      addDebugLine(`❌ Erro no fetchPosts: ${error}`);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const testDeletePost = async () => {
    setLoading(true);
    addDebugLine("🗑️ Testando deletePost...");

    try {
      const posts = await fetchPosts();
      if (posts.length === 0) {
        addDebugLine("❌ Nenhum post encontrado para testar delete");
        return;
      }

      // Procurar por um post de teste que pode ser deletado
      const testPost = posts.find(
        (p) => p.title.includes("DEBUG") || p.title.includes("TEST")
      );

      if (!testPost) {
        addDebugLine("❌ Nenhum post de teste encontrado para deletar");
        addDebugLine(
          "💡 Execute o teste de update primeiro para criar um post de teste"
        );
        return;
      }

      addDebugLine(`🗑️ Deletando post ID=${testPost.id} (${testPost.title})`);

      const result = await deletePost(testPost.id);
      addDebugLine(
        `✅ deletePost executado com sucesso: ${JSON.stringify(result)}`
      );

      // Verificar se a exclusão foi persistida
      const remainingPosts = await fetchPosts();
      const deletedPost = remainingPosts.find((p) => p.id === testPost.id);

      if (!deletedPost) {
        addDebugLine("✅ Exclusão confirmada no banco de dados");
      } else {
        addDebugLine("❌ Post ainda existe no banco após delete");
      }
    } catch (error) {
      addDebugLine(`❌ Erro no deletePost: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const clearDebug = () => {
    setDebugOutput([]);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg mt-6">
      <h3 className="text-lg font-semibold mb-4">🐛 Debug Panel - Posts</h3>

      <div className="flex gap-2 mb-4">
        <Button onClick={testFetchPosts} disabled={loading} variant="outline">
          Test Fetch
        </Button>
        <Button onClick={testDeletePost} disabled={loading} variant="outline">
          Test Delete
        </Button>
        <Button onClick={clearDebug} disabled={loading} variant="secondary">
          Clear
        </Button>
      </div>

      <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
        {debugOutput.length === 0 ? (
          <p className="text-gray-500">
            Clique nos botões acima para testar as operações de posts...
          </p>
        ) : (
          debugOutput.map((line, index) => (
            <div key={index} className="mb-1">
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
