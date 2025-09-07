import { deletePost } from "./src/actions/postActions";

async function testDeletePost() {
  try {
    console.log("=== Teste de Delete Post ===");

    // Testar delete do post ID 3 (que vimos nos logs)
    const postId = 3;
    console.log(`Tentando deletar post ID: ${postId}`);

    const result = await deletePost(postId);
    console.log("Resultado do delete:", result);
  } catch (error) {
    console.error("Erro no teste de delete:", error);
  }
}

testDeletePost();
