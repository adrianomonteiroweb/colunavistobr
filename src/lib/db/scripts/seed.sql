-- Corrija o hash do admin para bcrypt (exemplo gerado para '123456')
-- Substitua pelo hash correto se necessário
DELETE FROM colunavisto.admin;
INSERT INTO colunavisto.admin (username, password_hash) VALUES
  ('vic123', '$2b$12$6k7d8Bm7D/CQcBZrCLfQ../ShHVx3sXQ/z4yIBVVWImz9GObbJ74a');

-- Seed para hero_content
DELETE FROM colunavisto.hero_content;
INSERT INTO colunavisto.hero_content (
  title, subtitle, text, image_url,
  project_info,
  founder_name, founder_bio, founder_image_url,
  social_instagram, social_facebook, social_linkedin, social_youtube,
  payment_pix, payment_paypal, payment_info
) VALUES (
  'Título do Projeto',
  'Subtítulo do Projeto',
  'Texto de apresentação do projeto.',
  'https://exemplo.com/imagem-hero.jpg',
  'Informações detalhadas sobre o projeto.',
  'Nome da Fundadora',
  'Bio da fundadora.',
  'https://exemplo.com/fundadora.jpg',
  'https://instagram.com/exemplo',
  'https://facebook.com/exemplo',
  'https://linkedin.com/in/exemplo',
  'https://youtube.com/exemplo',
  'chave-pix-exemplo',
  'conta-paypal@exemplo.com',
  'Outras informações de pagamento.'
);
