-- =====================================================
-- ESQUEMA SOCIAL - COMUNIDAD
-- =====================================================

-- Perfiles extendidos (si prefieres no tocar estudiantes)
CREATE TABLE IF NOT EXISTS estudiantes_perfiles (
  id SERIAL PRIMARY KEY,
  estudiante_id INTEGER REFERENCES estudiantes(id) UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_estudiantes_perfiles_updated_at 
BEFORE UPDATE ON estudiantes_perfiles 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Posts de comunidad
CREATE TABLE IF NOT EXISTS comunidad_posts (
  id SERIAL PRIMARY KEY,
  autor_id INTEGER REFERENCES estudiantes(id) NOT NULL,
  contenido TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comentarios de posts
CREATE TABLE IF NOT EXISTS comunidad_comentarios (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES comunidad_posts(id) ON DELETE CASCADE,
  autor_id INTEGER REFERENCES estudiantes(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Likes de posts
CREATE TABLE IF NOT EXISTS comunidad_likes (
  post_id INTEGER REFERENCES comunidad_posts(id) ON DELETE CASCADE,
  estudiante_id INTEGER REFERENCES estudiantes(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, estudiante_id)
);

-- Amistades (simple)
CREATE TABLE IF NOT EXISTS amistades (
  id SERIAL PRIMARY KEY,
  solicitante_id INTEGER REFERENCES estudiantes(id) NOT NULL,
  destinatario_id INTEGER REFERENCES estudiantes(id) NOT NULL,
  estado VARCHAR(20) DEFAULT 'PENDIENTE', -- 'PENDIENTE','ACEPTADA','RECHAZADA'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(solicitante_id, destinatario_id)
);

CREATE TRIGGER update_amistades_updated_at 
BEFORE UPDATE ON amistades 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX IF NOT EXISTS idx_comunidad_posts_autor ON comunidad_posts(autor_id);
CREATE INDEX IF NOT EXISTS idx_comunidad_posts_created ON comunidad_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comunidad_likes_post ON comunidad_likes(post_id);

-- Credenciales (auth)
CREATE TABLE IF NOT EXISTS estudiantes_auth (
  estudiante_id INTEGER REFERENCES estudiantes(id) UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_estudiantes_auth_updated_at 
BEFORE UPDATE ON estudiantes_auth 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


