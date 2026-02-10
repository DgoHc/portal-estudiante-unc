-- =====================================================
-- SETUP DE BASE DE DATOS - AUTENTICACIÓN Y LOGIN
-- Crea las tablas necesarias para Prisma y datos de prueba
-- =====================================================

-- =====================================================
-- CREAR TABLAS PRINCIPALES
-- =====================================================

-- Tabla User
CREATE TABLE IF NOT EXISTS "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    active BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Student
CREATE TABLE IF NOT EXISTS "Student" (
    id UUID PRIMARY KEY REFERENCES "User"(id) ON DELETE CASCADE,
    grade VARCHAR(50),
    section VARCHAR(50),
    "dateOfBirth" DATE,
    "parentId" VARCHAR(255),
    profile JSONB
);

-- Tabla Teacher
CREATE TABLE IF NOT EXISTS "Teacher" (
    id UUID PRIMARY KEY REFERENCES "User"(id) ON DELETE CASCADE,
    specialties TEXT[] DEFAULT ARRAY[]::TEXT[],
    bio TEXT
);

-- Tabla Course
CREATE TABLE IF NOT EXISTS "Course" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    grade VARCHAR(50),
    year INTEGER,
    "teacherId" UUID NOT NULL REFERENCES "Teacher"(id),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Subject
CREATE TABLE IF NOT EXISTS "Subject" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    "courseId" UUID NOT NULL REFERENCES "Course"(id),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Enrollment
CREATE TABLE IF NOT EXISTS "Enrollment" (
    "studentId" UUID NOT NULL REFERENCES "Student"(id),
    "courseId" UUID NOT NULL REFERENCES "Course"(id),
    "enrolledAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    PRIMARY KEY ("studentId", "courseId")
);

-- Tabla Evaluation
CREATE TABLE IF NOT EXISTS "Evaluation" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "subjectId" UUID NOT NULL REFERENCES "Subject"(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    "dueDate" DATE,
    "maxScore" FLOAT,
    weight FLOAT,
    "createdBy" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla EvaluationResult
CREATE TABLE IF NOT EXISTS "EvaluationResult" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "evaluationId" UUID NOT NULL REFERENCES "Evaluation"(id),
    "studentId" UUID NOT NULL REFERENCES "Student"(id),
    score FLOAT,
    feedback TEXT,
    "submittedAt" TIMESTAMP,
    "gradedAt" TIMESTAMP,
    "gradedBy" VARCHAR(255)
);

-- Tabla Message
CREATE TABLE IF NOT EXISTS "Message" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "senderId" UUID NOT NULL REFERENCES "User"(id),
    "recipientId" UUID NOT NULL REFERENCES "User"(id),
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    "readAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla PersonalizedContent
CREATE TABLE IF NOT EXISTS "PersonalizedContent" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "studentId" UUID NOT NULL REFERENCES "Student"(id),
    "teacherId" UUID NOT NULL REFERENCES "Teacher"(id),
    "promptData" JSONB,
    content JSONB,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'completed', 'error', 'reviewing', 'approved', 'rejected')),
    "reviewStatus" VARCHAR(50),
    "reviewFeedback" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP,
    "reviewedAt" TIMESTAMP
);

-- =====================================================
-- CREAR ÍNDICES PARA MEJOR RENDIMIENTO
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
CREATE INDEX IF NOT EXISTS idx_user_role ON "User"(role);
CREATE INDEX IF NOT EXISTS idx_course_teacher ON "Course"("teacherId");
CREATE INDEX IF NOT EXISTS idx_subject_course ON "Subject"("courseId");
CREATE INDEX IF NOT EXISTS idx_enrollment_student ON "Enrollment"("studentId");
CREATE INDEX IF NOT EXISTS idx_enrollment_course ON "Enrollment"("courseId");
CREATE INDEX IF NOT EXISTS idx_message_sender ON "Message"("senderId");
CREATE INDEX IF NOT EXISTS idx_message_recipient ON "Message"("recipientId");

-- =====================================================
-- DATOS DE PRUEBA - USUARIOS PARA LOGIN
-- =====================================================

-- Contraseña para todos: "123456" (hasheada con bcrypt)
-- Hash generado: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWFm

-- Admin
INSERT INTO "User" (id, email, "passwordHash", role, "firstName", "lastName", active)
VALUES (
    '550e8400-e29b-41d4-a716-446655440001',
    'admin@zahkiel.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWFm',
    'admin',
    'Admin',
    'Zahkiel',
    true
) ON CONFLICT DO NOTHING;

-- Profesor
INSERT INTO "User" (id, email, "passwordHash", role, "firstName", "lastName", active)
VALUES (
    '550e8400-e29b-41d4-a716-446655440002',
    'teacher@zahkiel.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWFm',
    'teacher',
    'Juan',
    'Profesor',
    true
) ON CONFLICT DO NOTHING;

-- Estudiante
INSERT INTO "User" (id, email, "passwordHash", role, "firstName", "lastName", active)
VALUES (
    '550e8400-e29b-41d4-a716-446655440003',
    'student@zahkiel.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWFm',
    'student',
    'Diego',
    'Estudiante',
    true
) ON CONFLICT DO NOTHING;

-- Crear registros en Student para el estudiante
INSERT INTO "Student" (id, grade, section, "dateOfBirth", profile)
VALUES (
    '550e8400-e29b-41d4-a716-446655440003',
    '5to año',
    'A',
    '2005-01-15'::DATE,
    '{"school": "UNC", "program": "Computer Science"}'::JSONB
) ON CONFLICT DO NOTHING;

-- Crear registros en Teacher para el profesor
INSERT INTO "Teacher" (id, specialties, bio)
VALUES (
    '550e8400-e29b-41d4-a716-446655440002',
    ARRAY['Matemáticas', 'Física'],
    'Profesor experimentado en ciencias'
) ON CONFLICT DO NOTHING;

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
SELECT 'Setup completado!' as mensaje;
SELECT COUNT(*) as total_usuarios FROM "User";
