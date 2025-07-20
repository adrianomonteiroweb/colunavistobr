-- Migration: expand hero_content table for all Hero component data
ALTER TABLE colunavisto.hero_content
  ADD COLUMN IF NOT EXISTS project_info VARCHAR(1024),
  ADD COLUMN IF NOT EXISTS founder_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS founder_bio VARCHAR(1024),
  ADD COLUMN IF NOT EXISTS founder_image_url VARCHAR(255),
  ADD COLUMN IF NOT EXISTS social_instagram VARCHAR(255),
  ADD COLUMN IF NOT EXISTS social_facebook VARCHAR(255),
  ADD COLUMN IF NOT EXISTS social_linkedin VARCHAR(255),
  ADD COLUMN IF NOT EXISTS social_youtube VARCHAR(255),
  ADD COLUMN IF NOT EXISTS payment_pix VARCHAR(255),
  ADD COLUMN IF NOT EXISTS payment_paypal VARCHAR(255),
  ADD COLUMN IF NOT EXISTS payment_info VARCHAR(1024);
