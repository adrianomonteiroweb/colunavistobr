-- Corrija o hash do admin para bcrypt (exemplo gerado para '123456')
-- Substitua pelo hash correto se necessário
DELETE FROM colunavisto.admin;
INSERT INTO colunavisto.admin (username, password_hash) VALUES
  ('vic123', '$2b$12$6k7d8Bm7D/CQcBZrCLfQ../ShHVx3sXQ/z4yIBVVWImz9GObbJ74a');
