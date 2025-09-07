# Configuração do Vercel Blob Storage

## Passos para configurar o Blob Storage

### 1. Obter o Token do Vercel Blob

1. Acesse o [painel do Vercel](https://vercel.com)
2. Vá para o seu projeto
3. Clique em **Storage** no menu lateral
4. Clique em **Blob**
5. Clique em **Create Store** se ainda não tiver um
6. Depois de criado, clique em **Connect**
7. Copie o token que será exibido (começa com `vercel_blob_rw_`)

### 2. Configurar a variável de ambiente

1. No arquivo `.env.local` na raiz do projeto, adicione:

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_SEU_TOKEN_AQUI
```

2. Se estiver fazendo deploy no Vercel, adicione também no painel:
   - Vá em **Settings** > **Environment Variables**
   - Adicione `BLOB_READ_WRITE_TOKEN` com o valor do token

### 3. Reiniciar o servidor de desenvolvimento

Após configurar a variável de ambiente, reinicie o servidor:

```bash
pnpm dev
```

## Problemas Comuns

### Token não encontrado

Se você ver o erro `"No token found"`, significa que a variável `BLOB_READ_WRITE_TOKEN` não está configurada corretamente.

### Verificar se o token está sendo carregado

Você pode verificar se o token está sendo carregado adicionando um log temporário:

```typescript
console.log("BLOB_TOKEN exists:", !!process.env.BLOB_READ_WRITE_TOKEN);
```

### Domain Configuration

Se você estiver usando imagens do blob storage, certifique-se de que o domínio esteja configurado no `next.config.ts`:

```typescript
images: {
  domains: ["cvqh7wncv1jlvgiz.public.blob.vercel-storage.com"],
}
```

## Funcionalidades que Dependem do Blob Storage

- Upload de avatar do admin
- Upload de imagem hero do projeto
- Upload de múltiplas imagens para posts
- Exclusão automática de imagens ao editar/deletar posts
