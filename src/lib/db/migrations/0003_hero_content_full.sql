-- Migration: create or update hero_content table for all Hero component data
CREATE TABLE IF NOT EXISTS colunavisto.hero_content (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  text VARCHAR(1024) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  project_info VARCHAR(1024),
  founder_name VARCHAR(255),
  founder_bio VARCHAR(1024),
  founder_image_url VARCHAR(255),
  social_instagram VARCHAR(255),
  social_facebook VARCHAR(255),
  social_linkedin VARCHAR(255),
  social_youtube VARCHAR(255),
  payment_pix VARCHAR(255),
  payment_paypal VARCHAR(255),
  payment_info VARCHAR(1024),
  updated_at TIMESTAMP DEFAULT now()
);
