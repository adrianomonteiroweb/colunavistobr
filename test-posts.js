// Script de teste para debugar posts
import { PostRepository } from "../src/lib/db/src/repositories/PostRepository";

async function testPosts() {
  try {
    console.log("=== Teste de Posts ===");

    // 1. Listar posts existentes
    console.log("1. Listando posts existentes...");
    const posts = await PostRepository.getPosts();
    console.log(`Encontrados ${posts.length} posts:`);
    posts.forEach((post) => {
      console.log(
        `- ID: ${post.id}, Título: ${post.title}, Tipo ID: ${typeof post.id}`
      );
    });

    if (posts.length === 0) {
      console.log("Nenhum post encontrado. Criando um post de teste...");

      // Criar um post de teste
      const testPost = await PostRepository.createPost({
        title: "Post de Teste",
        description:
          "Este é um post de teste para debugar a funcionalidade de delete",
        images: [],
      });

      console.log("Post de teste criado:", testPost);

      // Listar novamente
      const postsAfterCreate = await PostRepository.getPosts();
      console.log(`Agora temos ${postsAfterCreate.length} posts`);
    }

    // 2. Testar delete do primeiro post (se existir)
    const currentPosts = await PostRepository.getPosts();
    if (currentPosts.length > 0) {
      const firstPost = currentPosts[0];
      console.log(`\n2. Testando delete do post ID: ${firstPost.id}`);

      try {
        const deleteResult = await PostRepository.deletePost(firstPost.id);
        console.log("Resultado do delete:", deleteResult);

        // Verificar se foi realmente deletado
        const postsAfterDelete = await PostRepository.getPosts();
        console.log(`Posts restantes após delete: ${postsAfterDelete.length}`);
      } catch (deleteError) {
        console.error("Erro ao deletar post:", deleteError);
      }
    }
  } catch (error) {
    console.error("Erro no teste:", error);
  }
}

testPosts()
  .then(() => {
    console.log("Teste concluído");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erro fatal:", err);
    process.exit(1);
  });
