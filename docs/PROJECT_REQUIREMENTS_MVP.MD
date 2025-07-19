# Requisitos de MVP

# 🌍 Coluna Visto BR – Site Oficial da ONG

Site institucional da ONG **Coluna Visto BR**, idealizado por Victoria Barros. O projeto visa divulgar ações humanitárias, inspirar a juventude, arrecadar doações e registrar as missões realizadas em diferentes regiões do Brasil.

---

## 📌 Objetivos do Projeto

MVP:

- Apresentar o trabalho da ONG ao público.
- Receber doações por Pix.

Novas Features:

- Exibir fotos das ações passadas.
- Divulgar agenda de ações humanitárias com local e data.
- Permitir que visitantes comentem e deixem depoimentos.
- Promover os valores: paz, amor, união, educação e transformação social.
- Inspirar jovens a participarem de causas sociais.

---

## ✅ Requisitos Funcionais

### 👁️ VISITANTE

- Acessar página inicial com informações institucionais.
- Visualizar:

MVP:

- Biografia da fundadora (Victoria Barros)
- Missão, visão e valores da ONG
- Acessar links de Instagram, Facebook e YouTube
- Copiar chave Pix ou escanear QR Code
- Acessar instruções de doação via Pix
- Compartilhar o site e links nas redes sociais

Novas Features:

- Agenda de ações (cidade, região, datas)
- Galeria de fotos por ação
- Sessão humanitária e causas defendidas
- Depoimentos públicos
- Interagir:
- Comentar ações (nome obrigatório, e-mail/telefone opcionais)
- Deixar depoimentos

---

### 🔐 ADMINISTRADOR

MVP:

- Logar
  - Entrar na aplicação via login
- Gerenciar dados de doação
  - Chave Pix, QR Code, mensagem personalizada
- Gerenciar redes sociais e contatos
  - Atualizar links e canais de comunicação
- Gestão da sessão Hero
  - editar títulos, subtítulos, textos e imagens da primeira sessão: Hero

Novas Features:

- Gerenciar agenda de ações
  - Criar, editar, excluir ações (cidade, região, datas)
- Gerenciar galeria de fotos
  - Upload, exclusão e organização por ação
- Moderar comentários
  - Visualizar, aprovar ou excluir comentários
- Gerenciar depoimentos
  - Adicionar, editar, remover e marcar como destaque
- Editar conteúdos institucionais
  - Missão, visão, biografia, sessões temáticas
- (Opcional) Acessar relatórios
  - Acessos, interações, doações

---

## 🧰 Tecnologias Sugeridas

- **Next.js** (framework principal)
- **Tailwind CSS** ou **ShadCN UI** para estilização
- **TypeScript** para tipagem segura
- **Vercel** ou **GitHub Pages** para deploy gratuito
- **Markdown/MDX** ou CMS leve (ex: Notion API, Contentlayer) para conteúdo institucional
- **Supabase ou Firebase** para comentários e depoimentos (se for dinâmico)
- **Upload de imagens:** Cloudinary ou Firebase Storage

---

## 🗂️ Estrutura de Páginas

MVP:

- `/` – Home

Novas features:

- `/sobre` – Sobre o projeto e biografia
- `/sessao-humanitaria` – Sessão sobre ações e causas
- `/agenda` – Lista de ações (cidade, região, datas)
- `/galeria` – Galeria de fotos
- `/depoimentos` – Depoimentos do público
- `/contato` – Contato e redes sociais
- `/doacoes` – Instruções de doação

---

## 🧑‍💻 Colaboradores

- Victoria Barros – Fundadora e responsável pelo conteúdo
- Adriano Monteiro Dev – Desenvolvedor responsável

---

## 💡 Possibilidades Futuras

- Área do voluntário (inscrição, cadastro)
- Blog com relatos de missões
- Integração com mapas
- Painel administrativo completo com permissões

---

## 📜 Licença

Este projeto é livre para uso educacional e institucional sem fins lucrativos. Para adaptações comerciais ou distribuição, consulte os responsáveis pela ONG.
