-- =====================================================
-- UNCIABOT - CONFIGURACIÓN COMPLETA DE BASE DE DATOS
-- =====================================================
-- Ejecutar este archivo completo en Supabase SQL Editor
-- =====================================================

-- 1. EXTENSIONES NECESARIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- 2. ESQUEMA PRINCIPAL
-- =====================================================

-- Tabla de facultades
CREATE TABLE IF NOT EXISTS facultades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de escuelas profesionales
CREATE TABLE IF NOT EXISTS escuelas_profesionales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    facultad_id INTEGER REFERENCES facultades(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    escuela_profesional_id INTEGER REFERENCES escuelas_profesionales(id),
    semestre INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de autenticación de estudiantes
CREATE TABLE IF NOT EXISTS estudiantes_auth (
    estudiante_id INTEGER PRIMARY KEY REFERENCES estudiantes(id),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS cursos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    creditos INTEGER NOT NULL,
    escuela_profesional_id INTEGER REFERENCES escuelas_profesionales(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de matrículas
CREATE TABLE IF NOT EXISTS matriculas (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    curso_id INTEGER REFERENCES cursos(id),
    semestre INTEGER NOT NULL,
    ano INTEGER NOT NULL,
    estado VARCHAR(20) DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(estudiante_id, curso_id, semestre, ano)
);

-- Tabla de horarios
CREATE TABLE IF NOT EXISTS horarios (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER REFERENCES cursos(id),
    dia_semana INTEGER NOT NULL CHECK (dia_semana >= 1 AND dia_semana <= 7),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    aula VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pagos
CREATE TABLE IF NOT EXISTS pagos (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    concepto VARCHAR(200) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente',
    fecha_pago DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de anuncios
CREATE TABLE IF NOT EXISTS anuncios (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    tipo VARCHAR(50) DEFAULT 'general',
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion DATE,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de eventos
CREATE TABLE IF NOT EXISTS eventos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP,
    ubicacion VARCHAR(200),
    cupo_maximo INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de inscripciones a eventos
CREATE TABLE IF NOT EXISTS inscripciones_eventos (
    id SERIAL PRIMARY KEY,
    evento_id INTEGER REFERENCES eventos(id),
    estudiante_id INTEGER REFERENCES estudiantes(id),
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'confirmado',
    UNIQUE(evento_id, estudiante_id)
);

-- Tabla de recursos de biblioteca
CREATE TABLE IF NOT EXISTS recursos_biblioteca (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(200),
    tipo VARCHAR(50) NOT NULL,
    url_descarga VARCHAR(500),
    descripcion TEXT,
    fecha_publicacion DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de profesores
CREATE TABLE IF NOT EXISTS profesores (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    especialidad VARCHAR(200),
    escuela_profesional_id INTEGER REFERENCES escuelas_profesionales(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 3. ESQUEMA SOCIAL
-- =====================================================

-- Tabla de perfiles de estudiantes
CREATE TABLE IF NOT EXISTS estudiantes_perfiles (
    estudiante_id INTEGER PRIMARY KEY REFERENCES estudiantes(id),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de posts de comunidad
CREATE TABLE IF NOT EXISTS comunidad_posts (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    contenido TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de likes en posts
CREATE TABLE IF NOT EXISTS comunidad_likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES comunidad_posts(id) ON DELETE CASCADE,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, estudiante_id)
);

-- Tabla de comentarios en posts
CREATE TABLE IF NOT EXISTS comunidad_comentarios (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES comunidad_posts(id) ON DELETE CASCADE,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    contenido TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de amistades
CREATE TABLE IF NOT EXISTS amistades (
    id SERIAL PRIMARY KEY,
    estudiante_id_1 INTEGER REFERENCES estudiantes(id),
    estudiante_id_2 INTEGER REFERENCES estudiantes(id),
    estado VARCHAR(20) DEFAULT 'pendiente',
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP,
    UNIQUE(estudiante_id_1, estudiante_id_2)
);

-- =====================================================
-- 4. ESQUEMA DE GRUPOS
-- =====================================================

-- Tabla de grupos de comunidad
CREATE TABLE IF NOT EXISTS comunidad_grupos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    creador_id INTEGER REFERENCES estudiantes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de miembros de grupos
CREATE TABLE IF NOT EXISTS comunidad_grupo_miembros (
    id SERIAL PRIMARY KEY,
    grupo_id INTEGER REFERENCES comunidad_grupos(id) ON DELETE CASCADE,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol VARCHAR(20) DEFAULT 'miembro',
    UNIQUE(grupo_id, estudiante_id)
);

-- Tabla de mensajes de grupos
CREATE TABLE IF NOT EXISTS comunidad_grupo_mensajes (
    id SERIAL PRIMARY KEY,
    grupo_id INTEGER REFERENCES comunidad_grupos(id) ON DELETE CASCADE,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    contenido TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 5. VISTAS ÚTILES
-- =====================================================

-- Vista del horario del estudiante
CREATE OR REPLACE VIEW v_horario_estudiante AS
SELECT 
    e.codigo,
    e.nombres || ' ' || e.apellidos as nombre_estudiante,
    c.nombre as nombre_curso,
    h.dia_semana,
    h.hora_inicio,
    h.hora_fin,
    h.aula
FROM estudiantes e
JOIN matriculas m ON e.id = m.estudiante_id
JOIN cursos c ON m.curso_id = c.id
JOIN horarios h ON c.id = h.curso_id
WHERE m.estado = 'activo'
ORDER BY h.dia_semana, h.hora_inicio;

-- Vista de pagos pendientes
CREATE OR REPLACE VIEW v_pagos_pendientes AS
SELECT 
    e.codigo,
    e.nombres || ' ' || e.apellidos as nombre_estudiante,
    p.concepto,
    p.monto,
    p.fecha_vencimiento,
    p.estado
FROM estudiantes e
JOIN pagos p ON e.id = p.estudiante_id
WHERE p.estado = 'pendiente'
ORDER BY p.fecha_vencimiento;

-- Vista de posts con información del autor
CREATE OR REPLACE VIEW v_posts_comunidad AS
SELECT 
    cp.id,
    cp.contenido,
    e.nombres || ' ' || e.apellidos as autor,
    e.codigo as codigo_autor,
    cp.created_at,
    COUNT(cl.id) as likes_count
FROM comunidad_posts cp
JOIN estudiantes e ON cp.estudiante_id = e.id
LEFT JOIN comunidad_likes cl ON cp.id = cl.post_id
GROUP BY cp.id, cp.contenido, e.nombres, e.apellidos, e.codigo, cp.created_at
ORDER BY cp.created_at DESC;

-- =====================================================
-- 6. FUNCIONES ÚTILES
-- =====================================================

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar timestamps
CREATE TRIGGER update_estudiantes_updated_at BEFORE UPDATE ON estudiantes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_estudiantes_perfiles_updated_at BEFORE UPDATE ON estudiantes_perfiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comunidad_posts_updated_at BEFORE UPDATE ON comunidad_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comunidad_grupos_updated_at BEFORE UPDATE ON comunidad_grupos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. DATOS DE EJEMPLO
-- =====================================================

-- Insertar facultades
INSERT INTO facultades (nombre) VALUES 
('Facultad de Ingeniería de Sistemas'),
('Facultad de Ingeniería Civil'),
('Facultad de Ingeniería Industrial')
ON CONFLICT DO NOTHING;

-- Insertar escuelas profesionales
INSERT INTO escuelas_profesionales (nombre, facultad_id) VALUES 
('Ingeniería de Sistemas', 1),
('Ingeniería de Software', 1),
('Ingeniería Civil', 2),
('Ingeniería Industrial', 3)
ON CONFLICT DO NOTHING;

-- Insertar estudiantes de ejemplo
INSERT INTO estudiantes (codigo, dni, nombres, apellidos, email, telefono, escuela_profesional_id, semestre) VALUES 
('202015001', '12345678', 'Juan', 'Pérez', 'juan.perez@unc.edu.pe', '999888777', 1, 8),
('2021110023', '70989670', 'Diego D\'Alessandro', 'Hoyos Carrera', 'dhoyosc21_1@unc.edu.pe', '969968423', 1, 6),
('202012003', '87654321', 'María', 'González', 'maria.gonzalez@unc.edu.pe', '888777666', 1, 10)
ON CONFLICT (codigo) DO NOTHING;

-- Insertar contraseñas (hash SHA-256 de "password")
INSERT INTO estudiantes_auth (estudiante_id, password_hash) VALUES 
(1, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(2, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(3, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8')
ON CONFLICT (estudiante_id) DO NOTHING;

-- Insertar cursos
INSERT INTO cursos (codigo, nombre, creditos, escuela_profesional_id) VALUES 
('CS101', 'Introducción a la Programación', 4, 1),
('CS201', 'Estructuras de Datos', 4, 1),
('CS301', 'Bases de Datos', 4, 1),
('CS401', 'Inteligencia Artificial', 4, 1)
ON CONFLICT DO NOTHING;

-- Insertar matrículas
INSERT INTO matriculas (estudiante_id, curso_id, semestre, ano, estado) VALUES 
(1, 1, 1, 2020, 'activo'),
(1, 2, 2, 2020, 'activo'),
(2, 1, 1, 2021, 'activo'),
(2, 2, 2, 2021, 'activo'),
(3, 3, 5, 2020, 'activo')
ON CONFLICT DO NOTHING;

-- Insertar horarios
INSERT INTO horarios (curso_id, dia_semana, hora_inicio, hora_fin, aula) VALUES 
(1, 1, '08:00:00', '10:00:00', 'A-101'),
(1, 3, '08:00:00', '10:00:00', 'A-101'),
(2, 2, '10:00:00', '12:00:00', 'A-102'),
(2, 4, '10:00:00', '12:00:00', 'A-102'),
(3, 5, '14:00:00', '16:00:00', 'A-103')
ON CONFLICT DO NOTHING;

-- Insertar pagos
INSERT INTO pagos (estudiante_id, concepto, monto, fecha_vencimiento, estado) VALUES 
(1, 'Pensión Marzo 2024', 150.00, '2024-03-31', 'pendiente'),
(1, 'Pensión Abril 2024', 150.00, '2024-04-30', 'pendiente'),
(2, 'Pensión Marzo 2024', 150.00, '2024-03-31', 'pendiente'),
(3, 'Pensión Marzo 2024', 150.00, '2024-03-31', 'pagado')
ON CONFLICT DO NOTHING;

-- Insertar anuncios
INSERT INTO anuncios (titulo, contenido, tipo, fecha_expiracion) VALUES 
('Inicio de Clases', 'Las clases del semestre 2024-I comenzarán el 18 de marzo.', 'general', '2024-04-30'),
('Exámenes Parciales', 'Los exámenes parciales se realizarán del 15 al 20 de abril.', 'academico', '2024-05-15'),
('Feriado Nacional', 'El 1 de mayo no habrá clases por feriado nacional.', 'general', '2024-05-01')
ON CONFLICT DO NOTHING;

-- Insertar eventos
INSERT INTO eventos (titulo, descripcion, fecha_inicio, fecha_fin, ubicacion, cupo_maximo) VALUES 
('Workshop de IA', 'Taller práctico sobre Inteligencia Artificial', '2024-04-15 14:00:00', '2024-04-15 18:00:00', 'Auditorio Principal', 50),
('Hackathon 2024', 'Competencia de programación de 24 horas', '2024-05-20 09:00:00', '2024-05-21 09:00:00', 'Laboratorio de Sistemas', 100),
('Feria de Proyectos', 'Presentación de proyectos finales de estudiantes', '2024-06-10 10:00:00', '2024-06-10 16:00:00', 'Patio Central', 200)
ON CONFLICT DO NOTHING;

-- Insertar recursos de biblioteca
INSERT INTO recursos_biblioteca (titulo, autor, tipo, descripcion) VALUES 
('Introducción a la Programación en Python', 'John Smith', 'libro', 'Libro completo sobre programación en Python'),
('Curso de Bases de Datos', 'María García', 'video', 'Serie de videos sobre bases de datos'),
('Manual de Git', 'Carlos López', 'manual', 'Guía completa de Git y GitHub')
ON CONFLICT DO NOTHING;

-- Insertar profesores
INSERT INTO profesores (nombres, apellidos, email, especialidad, escuela_profesional_id) VALUES 
('Dr. Roberto', 'Silva', 'roberto.silva@unc.edu.pe', 'Inteligencia Artificial', 1),
('Ing. Ana', 'Martínez', 'ana.martinez@unc.edu.pe', 'Bases de Datos', 1),
('Mg. Carlos', 'Rodríguez', 'carlos.rodriguez@unc.edu.pe', 'Desarrollo Web', 1)
ON CONFLICT DO NOTHING;

-- Insertar perfiles de estudiantes
INSERT INTO estudiantes_perfiles (estudiante_id, bio) VALUES 
(1, 'Estudiante de Ingeniería de Sistemas apasionado por la programación'),
(2, 'Desarrollador web y estudiante de sistemas'),
(3, 'Estudiante avanzada interesada en IA y machine learning')
ON CONFLICT (estudiante_id) DO NOTHING;

-- Insertar posts de comunidad
INSERT INTO comunidad_posts (estudiante_id, contenido) VALUES 
(1, '¿Alguien tiene los apuntes de IA del viernes?'),
(2, 'Formando grupo para el proyecto de BD, ¡me escriben!'),
(3, 'Excelente workshop de IA ayer, muy recomendado')
ON CONFLICT DO NOTHING;

-- Insertar likes en posts
INSERT INTO comunidad_likes (post_id, estudiante_id) VALUES 
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(3, 2)
ON CONFLICT DO NOTHING;

-- Insertar comentarios
INSERT INTO comunidad_comentarios (post_id, estudiante_id, contenido) VALUES 
(1, 2, 'Yo los tengo, te los paso'),
(1, 3, 'También los necesito'),
(2, 1, '¡Me apunto!'),
(3, 1, 'Fue increíble, aprendí mucho')
ON CONFLICT DO NOTHING;

-- Insertar grupo de ejemplo
INSERT INTO comunidad_grupos (nombre, creador_id) VALUES 
('Proyecto IA 2024', 1)
ON CONFLICT DO NOTHING;

-- Insertar miembros del grupo
INSERT INTO comunidad_grupo_miembros (grupo_id, estudiante_id) VALUES 
(1, 1),
(1, 2),
(1, 3)
ON CONFLICT DO NOTHING;

-- Insertar mensajes del grupo
INSERT INTO comunidad_grupo_mensajes (grupo_id, estudiante_id, contenido) VALUES 
(1, 1, '¡Hola equipo! ¿Cómo va el proyecto?'),
(1, 2, 'Todo bien, ya terminé mi parte'),
(1, 3, 'Yo también, podemos reunirnos mañana')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 8. ÍNDICES PARA OPTIMIZACIÓN
-- =====================================================

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_estudiantes_codigo ON estudiantes(codigo);
CREATE INDEX IF NOT EXISTS idx_estudiantes_email ON estudiantes(email);
CREATE INDEX IF NOT EXISTS idx_matriculas_estudiante ON matriculas(estudiante_id);
CREATE INDEX IF NOT EXISTS idx_horarios_curso ON horarios(curso_id);
CREATE INDEX IF NOT EXISTS idx_pagos_estudiante ON pagos(estudiante_id);
CREATE INDEX IF NOT EXISTS idx_pagos_estado ON pagos(estado);
CREATE INDEX IF NOT EXISTS idx_posts_estudiante ON comunidad_posts(estudiante_id);
CREATE INDEX IF NOT EXISTS idx_likes_post ON comunidad_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_post ON comunidad_comentarios(post_id);
CREATE INDEX IF NOT EXISTS idx_grupo_miembros ON comunidad_grupo_miembros(grupo_id);
CREATE INDEX IF NOT EXISTS idx_grupo_mensajes ON comunidad_grupo_mensajes(grupo_id);

-- =====================================================
-- ¡CONFIGURACIÓN COMPLETA!
-- =====================================================
-- Tu base de datos está lista para usar
-- Usuario de prueba: 202015001 / password
-- Usuario de prueba: 2021110023 / password (Diego)
-- Usuario de prueba: 202012003 / password
