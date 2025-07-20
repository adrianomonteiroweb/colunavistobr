-- Migration: create hero_content table for Hero component
CREATE TABLE IF NOT EXISTS colunavisto.hero_content (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  text VARCHAR(1024) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT now()
);
