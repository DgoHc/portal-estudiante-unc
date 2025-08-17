-- =====================================================
-- ESQUEMA DE BASE DE DATOS - PORTAL ESTUDIANTIL UNC
-- Universidad Nacional de Cajamarca
-- =====================================================

-- Crear la base de datos
CREATE DATABASE portal_estudiante_unc;
\c portal_estudiante_unc;

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- TABLAS PRINCIPALES
-- =====================================================

-- Tabla de Facultades
CREATE TABLE facultades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    decano VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    ubicacion VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Escuelas Profesionales
CREATE TABLE escuelas_profesionales (
    id SERIAL PRIMARY KEY,
    facultad_id INTEGER REFERENCES facultades(id),
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    director VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    duracion_anios INTEGER DEFAULT 5,
    creditos_totales INTEGER DEFAULT 200,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Ciclos Académicos
CREATE TABLE ciclos_academicos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    anio INTEGER NOT NULL,
    periodo VARCHAR(20) NOT NULL, -- 'I', 'II', 'III'
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVO', -- 'ACTIVO', 'INACTIVO', 'FINALIZADO'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(anio, periodo)
);

-- Tabla de Docentes
CREATE TABLE docentes (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    dni VARCHAR(8) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    especialidad VARCHAR(100),
    grado_academico VARCHAR(50), -- 'Bachiller', 'Magíster', 'Doctor'
    categoria VARCHAR(50), -- 'Auxiliar', 'Asociado', 'Principal'
    facultad_id INTEGER REFERENCES facultades(id),
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Estudiantes
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    dni VARCHAR(8) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    direccion TEXT,
    escuela_profesional_id INTEGER REFERENCES escuelas_profesionales(id),
    ciclo_actual INTEGER DEFAULT 1,
    estado VARCHAR(20) DEFAULT 'ACTIVO', -- 'ACTIVO', 'INACTIVO', 'EGRESADO'
    promedio_general DECIMAL(4,2) DEFAULT 0.00,
    creditos_aprobados INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Cursos
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    creditos INTEGER NOT NULL,
    horas_teoria INTEGER DEFAULT 0,
    horas_practica INTEGER DEFAULT 0,
    horas_laboratorio INTEGER DEFAULT 0,
    prerequisitos TEXT,
    escuela_profesional_id INTEGER REFERENCES escuelas_profesionales(id),
    ciclo_recomendado INTEGER,
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Secciones de Cursos
CREATE TABLE secciones_cursos (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER REFERENCES cursos(id),
    docente_id INTEGER REFERENCES docentes(id),
    ciclo_academico_id INTEGER REFERENCES ciclos_academicos(id),
    codigo_seccion VARCHAR(20) NOT NULL,
    cupo_maximo INTEGER DEFAULT 30,
    cupo_actual INTEGER DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'ACTIVO', -- 'ACTIVO', 'CERRADO', 'CANCELADO'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(curso_id, codigo_seccion, ciclo_academico_id)
);

-- Tabla de Inscripciones de Estudiantes
CREATE TABLE inscripciones_estudiantes (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    seccion_curso_id INTEGER REFERENCES secciones_cursos(id),
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'INSCRITO', -- 'INSCRITO', 'RETIRADO', 'APROBADO', 'DESAPROBADO'
    nota_final DECIMAL(4,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(estudiante_id, seccion_curso_id)
);

-- Tabla de Horarios
CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,
    seccion_curso_id INTEGER REFERENCES secciones_cursos(id),
    dia_semana INTEGER NOT NULL, -- 1=Lunes, 2=Martes, ..., 7=Domingo
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    tipo_clase VARCHAR(20) DEFAULT 'TEORIA', -- 'TEORIA', 'PRACTICA', 'LABORATORIO'
    aula VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Tareas/Actividades
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    seccion_curso_id INTEGER REFERENCES secciones_cursos(id),
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo_tarea VARCHAR(50) NOT NULL, -- 'TAREA', 'EXAMEN', 'PROYECTO', 'PRESENTACION', 'INFORME'
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega TIMESTAMP NOT NULL,
    fecha_limite_entrega TIMESTAMP,
    puntaje_maximo DECIMAL(5,2) DEFAULT 100.00,
    instrucciones TEXT,
    archivos_adjuntos TEXT[], -- URLs de archivos
    estado VARCHAR(20) DEFAULT 'ACTIVO', -- 'ACTIVO', 'CANCELADO', 'FINALIZADO'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Entregas de Tareas
CREATE TABLE entregas_tareas (
    id SERIAL PRIMARY KEY,
    tarea_id INTEGER REFERENCES tareas(id),
    estudiante_id INTEGER REFERENCES estudiantes(id),
    fecha_entrega TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    archivos_entregados TEXT[], -- URLs de archivos
    comentarios TEXT,
    puntaje_obtenido DECIMAL(5,2),
    observaciones TEXT,
    estado VARCHAR(20) DEFAULT 'ENTREGADO', -- 'ENTREGADO', 'CALIFICADO', 'TARDIO'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tarea_id, estudiante_id)
);

-- Tabla de Asistencias
CREATE TABLE asistencias (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    seccion_curso_id INTEGER REFERENCES secciones_cursos(id),
    fecha_clase DATE NOT NULL,
    hora_clase TIME,
    tipo_clase VARCHAR(20) DEFAULT 'TEORIA',
    estado VARCHAR(20) DEFAULT 'PRESENTE', -- 'PRESENTE', 'AUSENTE', 'TARDANZA', 'JUSTIFICADO'
    justificacion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(estudiante_id, seccion_curso_id, fecha_clase, hora_clase)
);

-- Tabla de Notas
CREATE TABLE notas (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    seccion_curso_id INTEGER REFERENCES secciones_cursos(id),
    tipo_evaluacion VARCHAR(50) NOT NULL, -- 'EXAMEN_PARCIAL', 'EXAMEN_FINAL', 'TAREA', 'PROYECTO', 'PARTICIPACION'
    descripcion VARCHAR(200),
    puntaje_obtenido DECIMAL(5,2) NOT NULL,
    puntaje_maximo DECIMAL(5,2) NOT NULL,
    fecha_evaluacion DATE,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Anuncios
CREATE TABLE anuncios (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    tipo VARCHAR(50) DEFAULT 'GENERAL', -- 'GENERAL', 'ACADEMICO', 'ADMINISTRATIVO', 'URGENTE'
    prioridad VARCHAR(20) DEFAULT 'NORMAL', -- 'BAJA', 'NORMAL', 'ALTA', 'URGENTE'
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP,
    autor_id INTEGER, -- Puede ser docente_id o NULL para anuncios generales
    autor_tipo VARCHAR(20), -- 'DOCENTE', 'ADMINISTRACION'
    destinatarios TEXT[], -- ['ESTUDIANTES', 'DOCENTES', 'TODOS']
    escuelas_destino INTEGER[], -- IDs de escuelas específicas
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Eventos
CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo_evento VARCHAR(50) NOT NULL, -- 'CONFERENCIA', 'TALLER', 'FERIA', 'COMPETENCIA', 'CEREMONIA'
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    ubicacion VARCHAR(200),
    cupo_maximo INTEGER,
    cupo_actual INTEGER DEFAULT 0,
    organizador VARCHAR(100),
    contacto_email VARCHAR(100),
    contacto_telefono VARCHAR(20),
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Inscripciones a Eventos
CREATE TABLE inscripciones_eventos (
    id SERIAL PRIMARY KEY,
    evento_id INTEGER REFERENCES eventos(id),
    estudiante_id INTEGER REFERENCES estudiantes(id),
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'INSCRITO', -- 'INSCRITO', 'CANCELADO', 'ASISTIO', 'NO_ASISTIO'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(evento_id, estudiante_id)
);

-- Tabla de Pagos/Pensiones
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    concepto VARCHAR(200) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    fecha_pago TIMESTAMP,
    metodo_pago VARCHAR(50), -- 'EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'DEPOSITO'
    numero_comprobante VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'PENDIENTE', -- 'PENDIENTE', 'PAGADO', 'VENCIDO', 'CANCELADO'
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Recursos de Biblioteca
CREATE TABLE recursos_biblioteca (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(300) NOT NULL,
    autor VARCHAR(200),
    tipo_recurso VARCHAR(50) NOT NULL, -- 'LIBRO', 'VIDEO', 'DOCUMENTO', 'ARTICULO', 'PRESENTACION'
    formato VARCHAR(20), -- 'PDF', 'MP4', 'DOCX', 'PPTX'
    url_recurso TEXT,
    tamanio_mb DECIMAL(8,2),
    descripcion TEXT,
    etiquetas TEXT[],
    fecha_publicacion DATE,
    descargas INTEGER DEFAULT 0,
    calificacion_promedio DECIMAL(3,2) DEFAULT 0.00,
    estado VARCHAR(20) DEFAULT 'DISPONIBLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Descargas de Recursos
CREATE TABLE descargas_recursos (
    id SERIAL PRIMARY KEY,
    recurso_id INTEGER REFERENCES recursos_biblioteca(id),
    estudiante_id INTEGER REFERENCES estudiantes(id),
    fecha_descarga TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =====================================================

-- Índices para búsquedas frecuentes
CREATE INDEX idx_estudiantes_codigo ON estudiantes(codigo);
CREATE INDEX idx_estudiantes_email ON estudiantes(email);
CREATE INDEX idx_docentes_codigo ON docentes(codigo);
CREATE INDEX idx_docentes_email ON docentes(email);
CREATE INDEX idx_cursos_codigo ON cursos(codigo);
CREATE INDEX idx_tareas_fecha_entrega ON tareas(fecha_entrega);
CREATE INDEX idx_tareas_seccion_curso ON tareas(seccion_curso_id);
CREATE INDEX idx_entregas_tareas_estudiante ON entregas_tareas(estudiante_id);
CREATE INDEX idx_asistencias_estudiante_fecha ON asistencias(estudiante_id, fecha_clase);
CREATE INDEX idx_notas_estudiante ON notas(estudiante_id);
CREATE INDEX idx_anuncios_fecha ON anuncios(fecha_publicacion);
CREATE INDEX idx_eventos_fecha ON eventos(fecha_inicio);
CREATE INDEX idx_pagos_estudiante ON pagos(estudiante_id);
CREATE INDEX idx_pagos_fecha_vencimiento ON pagos(fecha_vencimiento);

-- Índices para búsquedas de texto
CREATE INDEX idx_cursos_nombre_trgm ON cursos USING gin(nombre gin_trgm_ops);
CREATE INDEX idx_tareas_titulo_trgm ON tareas USING gin(titulo gin_trgm_ops);
CREATE INDEX idx_anuncios_titulo_trgm ON anuncios USING gin(titulo gin_trgm_ops);

-- =====================================================
-- FUNCIONES Y TRIGGERS
-- =====================================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_facultades_updated_at BEFORE UPDATE ON facultades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_escuelas_profesionales_updated_at BEFORE UPDATE ON escuelas_profesionales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ciclos_academicos_updated_at BEFORE UPDATE ON ciclos_academicos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_docentes_updated_at BEFORE UPDATE ON docentes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_estudiantes_updated_at BEFORE UPDATE ON estudiantes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cursos_updated_at BEFORE UPDATE ON cursos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_secciones_cursos_updated_at BEFORE UPDATE ON secciones_cursos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inscripciones_estudiantes_updated_at BEFORE UPDATE ON inscripciones_estudiantes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_horarios_updated_at BEFORE UPDATE ON horarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tareas_updated_at BEFORE UPDATE ON tareas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_entregas_tareas_updated_at BEFORE UPDATE ON entregas_tareas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_asistencias_updated_at BEFORE UPDATE ON asistencias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notas_updated_at BEFORE UPDATE ON notas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_anuncios_updated_at BEFORE UPDATE ON anuncios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON eventos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inscripciones_eventos_updated_at BEFORE UPDATE ON inscripciones_eventos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pagos_updated_at BEFORE UPDATE ON pagos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recursos_biblioteca_updated_at BEFORE UPDATE ON recursos_biblioteca FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para calcular promedio general del estudiante
CREATE OR REPLACE FUNCTION calcular_promedio_estudiante(est_id INTEGER)
RETURNS DECIMAL(4,2) AS $$
DECLARE
    promedio DECIMAL(4,2);
BEGIN
    SELECT COALESCE(AVG(nota_final), 0.00)
    INTO promedio
    FROM inscripciones_estudiantes
    WHERE estudiante_id = est_id AND estado = 'APROBADO';
    
    RETURN promedio;
END;
$$ LANGUAGE plpgsql;

-- Función para contar créditos aprobados
CREATE OR REPLACE FUNCTION contar_creditos_aprobados(est_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    creditos INTEGER;
BEGIN
    SELECT COALESCE(SUM(c.creditos), 0)
    INTO creditos
    FROM inscripciones_estudiantes ie
    JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
    JOIN cursos c ON sc.curso_id = c.id
    WHERE ie.estudiante_id = est_id AND ie.estado = 'APROBADO';
    
    RETURN creditos;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VISTAS ÚTILES
-- =====================================================

-- Vista de horario del estudiante
CREATE VIEW v_horario_estudiante AS
SELECT 
    e.codigo as codigo_estudiante,
    e.nombres || ' ' || e.apellidos as nombre_estudiante,
    c.codigo as codigo_curso,
    c.nombre as nombre_curso,
    d.nombres || ' ' || d.apellidos as nombre_docente,
    h.dia_semana,
    h.hora_inicio,
    h.hora_fin,
    h.tipo_clase,
    h.aula,
    sc.codigo_seccion
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN docentes d ON sc.docente_id = d.id
JOIN horarios h ON sc.id = h.seccion_curso_id
WHERE ie.estado = 'INSCRITO' AND sc.estado = 'ACTIVO'
ORDER BY h.dia_semana, h.hora_inicio;

-- Vista de tareas pendientes del estudiante
CREATE VIEW v_tareas_pendientes_estudiante AS
SELECT 
    e.codigo as codigo_estudiante,
    e.nombres || ' ' || e.apellidos as nombre_estudiante,
    c.codigo as codigo_curso,
    c.nombre as nombre_curso,
    t.titulo as titulo_tarea,
    t.descripcion,
    t.tipo_tarea,
    t.fecha_entrega,
    t.puntaje_maximo,
    CASE 
        WHEN et.id IS NULL THEN 'PENDIENTE'
        ELSE et.estado
    END as estado_entrega,
    et.puntaje_obtenido
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN tareas t ON sc.id = t.seccion_curso_id
LEFT JOIN entregas_tareas et ON t.id = et.tarea_id AND e.id = et.estudiante_id
WHERE ie.estado = 'INSCRITO' 
    AND t.estado = 'ACTIVO' 
    AND t.fecha_entrega >= CURRENT_DATE
ORDER BY t.fecha_entrega;

-- Vista de notas del estudiante
CREATE VIEW v_notas_estudiante AS
SELECT 
    e.codigo as codigo_estudiante,
    e.nombres || ' ' || e.apellidos as nombre_estudiante,
    c.codigo as codigo_curso,
    c.nombre as nombre_curso,
    n.tipo_evaluacion,
    n.descripcion,
    n.puntaje_obtenido,
    n.puntaje_maximo,
    ROUND((n.puntaje_obtenido / n.puntaje_maximo) * 20, 2) as nota_20,
    n.fecha_evaluacion
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN notas n ON sc.id = n.seccion_curso_id AND e.id = n.estudiante_id
WHERE ie.estado = 'INSCRITO'
ORDER BY c.nombre, n.fecha_evaluacion DESC;

-- Vista de asistencia del estudiante
CREATE VIEW v_asistencia_estudiante AS
SELECT 
    e.codigo as codigo_estudiante,
    e.nombres || ' ' || e.apellidos as nombre_estudiante,
    c.codigo as codigo_curso,
    c.nombre as nombre_curso,
    a.fecha_clase,
    a.hora_clase,
    a.tipo_clase,
    a.estado as estado_asistencia
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN asistencias a ON sc.id = a.seccion_curso_id AND e.id = a.estudiante_id
WHERE ie.estado = 'INSCRITO'
ORDER BY a.fecha_clase DESC, a.hora_clase;

-- Vista de pagos pendientes
CREATE VIEW v_pagos_pendientes AS
SELECT 
    e.codigo as codigo_estudiante,
    e.nombres || ' ' || e.apellidos as nombre_estudiante,
    p.concepto,
    p.monto,
    p.fecha_vencimiento,
    p.estado,
    CASE 
        WHEN p.fecha_vencimiento < CURRENT_DATE THEN 'VENCIDO'
        WHEN p.fecha_vencimiento <= CURRENT_DATE + INTERVAL '7 days' THEN 'POR_VENCER'
        ELSE 'VIGENTE'
    END as estado_vencimiento
FROM estudiantes e
JOIN pagos p ON e.id = p.estudiante_id
WHERE p.estado = 'PENDIENTE'
ORDER BY p.fecha_vencimiento;

-- =====================================================
-- COMENTARIOS
-- =====================================================

COMMENT ON DATABASE portal_estudiante_unc IS 'Base de datos del Portal Estudiantil de la Universidad Nacional de Cajamarca';
COMMENT ON TABLE estudiantes IS 'Información de los estudiantes de la universidad';
COMMENT ON TABLE docentes IS 'Información de los docentes de la universidad';
COMMENT ON TABLE cursos IS 'Catálogo de cursos disponibles';
COMMENT ON TABLE tareas IS 'Tareas y actividades asignadas por los docentes';
COMMENT ON TABLE horarios IS 'Horarios de clases por sección';
COMMENT ON TABLE asistencias IS 'Registro de asistencia de estudiantes';
COMMENT ON TABLE notas IS 'Calificaciones de los estudiantes';
COMMENT ON TABLE anuncios IS 'Anuncios y comunicaciones de la universidad';
COMMENT ON TABLE eventos IS 'Eventos y actividades extracurriculares';
COMMENT ON TABLE pagos IS 'Sistema de pagos y pensiones';
COMMENT ON TABLE recursos_biblioteca IS 'Recursos digitales de la biblioteca';

-- =====================================================
-- FIN DEL ESQUEMA
-- =====================================================
