-- =====================================================
-- ESQUEMA SOCIAL - GRUPOS Y CHAT
-- =====================================================

CREATE TABLE IF NOT EXISTS comunidad_grupos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  creador_id INTEGER REFERENCES estudiantes(id) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comunidad_grupo_miembros (
  grupo_id INTEGER REFERENCES comunidad_grupos(id) ON DELETE CASCADE,
  estudiante_id INTEGER REFERENCES estudiantes(id) ON DELETE CASCADE,
  rol VARCHAR(20) DEFAULT 'MIEMBRO', -- 'ADMIN','MIEMBRO'
  unido_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (grupo_id, estudiante_id)
);

CREATE TABLE IF NOT EXISTS comunidad_grupo_mensajes (
  id SERIAL PRIMARY KEY,
  grupo_id INTEGER REFERENCES comunidad_grupos(id) ON DELETE CASCADE,
  autor_id INTEGER, -- null para mensajes del bot
  autor_tipo VARCHAR(20) DEFAULT 'USUARIO', -- 'USUARIO' | 'BOT'
  contenido TEXT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_grupo_mensajes_grupo ON comunidad_grupo_mensajes(grupo_id, creado_en DESC);


