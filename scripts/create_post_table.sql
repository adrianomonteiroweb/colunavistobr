CREATE TABLE IF NOT EXISTS "colunavisto"."post" (
  id serial PRIMARY KEY NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(1024) NOT NULL,
  images jsonb DEFAULT '[]'::jsonb NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
