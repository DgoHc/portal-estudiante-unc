-- =====================================================
-- DATOS DE EJEMPLO - PORTAL ESTUDIANTIL UNC
-- Universidad Nacional de Cajamarca
-- =====================================================

-- Insertar Facultades
INSERT INTO facultades (nombre, codigo, decano, telefono, email, ubicacion) VALUES
('Facultad de Ingeniería', 'FI', 'Dr. Carlos Mendoza', '076-365430', 'fi@unc.edu.pe', 'Campus Universitario - Pabellón A'),
('Facultad de Ciencias de la Salud', 'FCS', 'Dra. María Torres', '076-365431', 'fcs@unc.edu.pe', 'Campus Universitario - Pabellón B'),
('Facultad de Ciencias Económicas', 'FCE', 'Dr. Roberto Silva', '076-365432', 'fce@unc.edu.pe', 'Campus Universitario - Pabellón C'),
('Facultad de Ciencias Agrarias', 'FCA', 'Ing. Ana García', '076-365433', 'fca@unc.edu.pe', 'Campus Universitario - Pabellón D');

-- Insertar Escuelas Profesionales
INSERT INTO escuelas_profesionales (facultad_id, nombre, codigo, director, telefono, email, duracion_anios, creditos_totales) VALUES
(1, 'Ingeniería de Sistemas', 'IS', 'Ing. Juan Pérez', '076-365440', 'is@unc.edu.pe', 5, 200),
(1, 'Ingeniería Civil', 'IC', 'Ing. Pedro López', '076-365441', 'ic@unc.edu.pe', 5, 200),
(1, 'Ingeniería Industrial', 'II', 'Ing. Rosa Martínez', '076-365442', 'ii@unc.edu.pe', 5, 200),
(2, 'Medicina Humana', 'MH', 'Dr. Luis Rodríguez', '076-365443', 'mh@unc.edu.pe', 7, 280),
(3, 'Administración de Empresas', 'AE', 'Mg. Carmen Vega', '076-365444', 'ae@unc.edu.pe', 5, 200),
(4, 'Ingeniería Agronómica', 'IA', 'Ing. Manuel Castro', '076-365445', 'ia@unc.edu.pe', 5, 200);

-- Insertar Ciclos Académicos
INSERT INTO ciclos_academicos (nombre, anio, periodo, fecha_inicio, fecha_fin, estado) VALUES
('2024-I', 2024, 'I', '2024-03-01', '2024-07-15', 'ACTIVO'),
('2024-II', 2024, 'II', '2024-08-01', '2024-12-15', 'ACTIVO'),
('2023-II', 2023, 'II', '2023-08-01', '2023-12-15', 'FINALIZADO');

-- Insertar Docentes
INSERT INTO docentes (codigo, dni, nombres, apellidos, email, telefono, especialidad, grado_academico, categoria, facultad_id) VALUES
('DOC001', '12345678', 'Carlos', 'Mendoza', 'carlos.mendoza@unc.edu.pe', '976123456', 'Programación Web', 'Doctor', 'Principal', 1),
('DOC002', '23456789', 'María', 'Torres', 'maria.torres@unc.edu.pe', '976234567', 'Base de Datos', 'Magíster', 'Asociado', 1),
('DOC003', '34567890', 'Roberto', 'Silva', 'roberto.silva@unc.edu.pe', '976345678', 'Inteligencia Artificial', 'Doctor', 'Principal', 1),
('DOC004', '45678901', 'Ana', 'García', 'ana.garcia@unc.edu.pe', '976456789', 'Redes de Computadoras', 'Magíster', 'Auxiliar', 1),
('DOC005', '56789012', 'Luis', 'Rodríguez', 'luis.rodriguez@unc.edu.pe', '976567890', 'Análisis de Algoritmos', 'Doctor', 'Asociado', 1),
('DOC006', '67890123', 'Carmen', 'Vega', 'carmen.vega@unc.edu.pe', '976678901', 'Ingeniería de Software', 'Magíster', 'Auxiliar', 1);

-- Insertar Estudiantes
INSERT INTO estudiantes (codigo, dni, nombres, apellidos, email, telefono, fecha_nacimiento, direccion, escuela_profesional_id, ciclo_actual, promedio_general, creditos_aprobados) VALUES
('202015001', '12345678', 'Diego', 'Hernández', 'diego.hernandez@unc.edu.pe', '976123456', '2000-05-15', 'Av. Perú 123, Cajamarca', 1, 6, 16.8, 18),
('202015002', '23456789', 'María', 'González', 'maria.gonzalez@unc.edu.pe', '976234567', '2000-08-20', 'Jr. Lima 456, Cajamarca', 1, 6, 17.2, 20),
('202015003', '34567890', 'Juan', 'Pérez', 'juan.perez@unc.edu.pe', '976345678', '2000-03-10', 'Av. Atahualpa 789, Cajamarca', 1, 5, 15.9, 15),
('202015004', '45678901', 'Ana', 'López', 'ana.lopez@unc.edu.pe', '976456789', '2000-11-25', 'Jr. Amazonas 321, Cajamarca', 1, 6, 16.5, 18),
('202015005', '56789012', 'Carlos', 'Martínez', 'carlos.martinez@unc.edu.pe', '976567890', '2000-07-08', 'Av. Manco Cápac 654, Cajamarca', 1, 5, 16.1, 16),
('202015006', '67890123', 'Laura', 'Rodríguez', 'laura.rodriguez@unc.edu.pe', '976678901', '2000-12-03', 'Jr. San Martín 987, Cajamarca', 1, 6, 17.8, 22);

-- Insertar Cursos
INSERT INTO cursos (codigo, nombre, descripcion, creditos, horas_teoria, horas_practica, horas_laboratorio, prerequisitos, escuela_profesional_id, ciclo_recomendado) VALUES
('CS-301', 'Programación Web', 'Desarrollo de aplicaciones web modernas con HTML, CSS, JavaScript y frameworks', 4, 2, 2, 2, 'Programación I, Programación II', 1, 6),
('CS-302', 'Base de Datos Avanzadas', 'Diseño y administración de bases de datos relacionales y NoSQL', 3, 2, 1, 2, 'Base de Datos I', 1, 6),
('CS-303', 'Inteligencia Artificial', 'Fundamentos de IA, machine learning y algoritmos inteligentes', 4, 3, 1, 2, 'Matemática Discreta, Programación II', 1, 6),
('CS-304', 'Redes de Computadoras', 'Protocolos de red, configuración y administración de redes', 3, 2, 1, 2, 'Fundamentos de Computación', 1, 6),
('CS-305', 'Ingeniería de Software', 'Metodologías de desarrollo, patrones de diseño y calidad de software', 4, 2, 2, 2, 'Programación II, Estructuras de Datos', 1, 5),
('CS-306', 'Análisis de Algoritmos', 'Complejidad computacional, optimización y análisis de algoritmos', 3, 3, 1, 1, 'Matemática Discreta, Programación II', 1, 5);

-- Insertar Secciones de Cursos
INSERT INTO secciones_cursos (curso_id, docente_id, ciclo_academico_id, codigo_seccion, cupo_maximo, cupo_actual) VALUES
(1, 1, 1, 'A', 30, 25),
(1, 1, 1, 'B', 30, 28),
(2, 2, 1, 'A', 25, 20),
(3, 3, 1, 'A', 30, 22),
(4, 4, 1, 'A', 25, 18),
(5, 6, 1, 'A', 30, 24),
(6, 5, 1, 'A', 25, 19);

-- Insertar Inscripciones de Estudiantes
INSERT INTO inscripciones_estudiantes (estudiante_id, seccion_curso_id, estado) VALUES
(1, 1, 'INSCRITO'),
(1, 3, 'INSCRITO'),
(1, 4, 'INSCRITO'),
(1, 5, 'INSCRITO'),
(2, 1, 'INSCRITO'),
(2, 3, 'INSCRITO'),
(2, 4, 'INSCRITO'),
(3, 6, 'INSCRITO'),
(3, 7, 'INSCRITO'),
(4, 1, 'INSCRITO'),
(4, 2, 'INSCRITO'),
(4, 3, 'INSCRITO'),
(5, 6, 'INSCRITO'),
(5, 7, 'INSCRITO'),
(6, 1, 'INSCRITO'),
(6, 3, 'INSCRITO'),
(6, 4, 'INSCRITO');

-- Insertar Horarios
INSERT INTO horarios (seccion_curso_id, dia_semana, hora_inicio, hora_fin, tipo_clase, aula) VALUES
-- Programación Web - Sección A
(1, 1, '10:00:00', '12:00:00', 'TEORIA', 'A-101'),
(1, 3, '10:00:00', '12:00:00', 'PRACTICA', 'LAB-201'),
-- Programación Web - Sección B
(2, 2, '14:00:00', '16:00:00', 'TEORIA', 'A-102'),
(2, 4, '14:00:00', '16:00:00', 'PRACTICA', 'LAB-202'),
-- Base de Datos Avanzadas
(3, 2, '08:00:00', '10:00:00', 'TEORIA', 'A-103'),
(3, 4, '08:00:00', '10:00:00', 'LABORATORIO', 'LAB-203'),
-- Inteligencia Artificial
(4, 5, '08:00:00', '12:00:00', 'TEORIA', 'A-104'),
-- Redes de Computadoras
(5, 1, '16:00:00', '18:00:00', 'TEORIA', 'A-105'),
(5, 3, '16:00:00', '18:00:00', 'LABORATORIO', 'LAB-205'),
-- Ingeniería de Software
(6, 2, '16:00:00', '18:00:00', 'TEORIA', 'A-106'),
(6, 4, '16:00:00', '18:00:00', 'PRACTICA', 'LAB-206'),
-- Análisis de Algoritmos
(7, 1, '14:00:00', '16:00:00', 'TEORIA', 'A-107'),
(7, 3, '14:00:00', '16:00:00', 'PRACTICA', 'LAB-207');

-- Insertar Tareas
INSERT INTO tareas (seccion_curso_id, titulo, descripcion, tipo_tarea, fecha_publicacion, fecha_entrega, puntaje_maximo, instrucciones) VALUES
-- Programación Web
(1, 'Desarrollo de Sitio Web Personal', 'Crear un sitio web personal usando HTML, CSS y JavaScript', 'PROYECTO', '2024-11-01 08:00:00', '2024-11-15 23:59:00', 100.00, 'Desarrollar un sitio web personal con al menos 3 páginas, responsive design y funcionalidades interactivas'),
(1, 'Ejercicios de CSS Grid y Flexbox', 'Completar ejercicios prácticos de CSS Grid y Flexbox', 'TAREA', '2024-11-05 08:00:00', '2024-11-08 23:59:00', 50.00, 'Resolver los 10 ejercicios del archivo adjunto sobre CSS Grid y Flexbox'),
(1, 'Examen Parcial - JavaScript', 'Evaluación sobre conceptos fundamentales de JavaScript', 'EXAMEN', '2024-11-10 08:00:00', '2024-11-10 10:00:00', 100.00, 'Examen presencial sobre JavaScript, duración 2 horas'),

-- Base de Datos Avanzadas
(3, 'Diseño de Base de Datos E-commerce', 'Diseñar el esquema de base de datos para una tienda online', 'PROYECTO', '2024-11-02 08:00:00', '2024-11-20 23:59:00', 100.00, 'Crear el diagrama ER y las tablas SQL para un sistema de e-commerce'),
(3, 'Consultas SQL Avanzadas', 'Ejercicios de consultas SQL complejas', 'TAREA', '2024-11-06 08:00:00', '2024-11-09 23:59:00', 60.00, 'Resolver 15 consultas SQL avanzadas incluyendo JOINs, subconsultas y funciones agregadas'),

-- Inteligencia Artificial
(4, 'Implementación de Algoritmo de Clasificación', 'Implementar un algoritmo de machine learning para clasificación', 'PROYECTO', '2024-11-03 08:00:00', '2024-11-25 23:59:00', 100.00, 'Implementar y evaluar un algoritmo de clasificación usando Python y scikit-learn'),
(4, 'Análisis de Datos con Pandas', 'Ejercicios de manipulación y análisis de datos', 'TAREA', '2024-11-07 08:00:00', '2024-11-10 23:59:00', 40.00, 'Completar ejercicios de limpieza y análisis de datos usando Pandas'),

-- Redes de Computadoras
(5, 'Configuración de Red Local', 'Configurar una red local con múltiples dispositivos', 'PROYECTO', '2024-11-04 08:00:00', '2024-11-18 23:59:00', 100.00, 'Configurar una red local con al menos 5 dispositivos, incluyendo configuración de IPs y servicios'),
(5, 'Análisis de Protocolos de Red', 'Análisis de tráfico de red usando Wireshark', 'TAREA', '2024-11-08 08:00:00', '2024-11-11 23:59:00', 50.00, 'Analizar capturas de tráfico de red e identificar protocolos y patrones'),

-- Ingeniería de Software
(6, 'Desarrollo de Aplicación con Metodología Ágil', 'Desarrollar una aplicación siguiendo metodología Scrum', 'PROYECTO', '2024-11-05 08:00:00', '2024-11-30 23:59:00', 100.00, 'Desarrollar una aplicación completa siguiendo metodología Scrum con sprints de 2 semanas'),
(6, 'Diagramas UML', 'Crear diagramas UML para un sistema de gestión', 'TAREA', '2024-11-09 08:00:00', '2024-11-12 23:59:00', 30.00, 'Crear diagramas de casos de uso, clases y secuencia para un sistema de gestión de biblioteca'),

-- Análisis de Algoritmos
(7, 'Implementación y Análisis de Algoritmos', 'Implementar y analizar la complejidad de algoritmos de ordenamiento', 'PROYECTO', '2024-11-06 08:00:00', '2024-11-22 23:59:00', 100.00, 'Implementar 5 algoritmos de ordenamiento y analizar su complejidad temporal y espacial'),
(7, 'Ejercicios de Complejidad', 'Resolver ejercicios de análisis de complejidad', 'TAREA', '2024-11-10 08:00:00', '2024-11-13 23:59:00', 40.00, 'Resolver 20 ejercicios de análisis de complejidad Big O');

-- Insertar Entregas de Tareas (algunas completadas, otras pendientes)
INSERT INTO entregas_tareas (tarea_id, estudiante_id, fecha_entrega, puntaje_obtenido, estado) VALUES
-- Diego Hernández (202015001)
(1, 1, '2024-11-14 22:30:00', 95.00, 'CALIFICADO'),
(2, 1, '2024-11-08 23:45:00', 48.00, 'CALIFICADO'),
(4, 1, '2024-11-19 21:15:00', 88.00, 'CALIFICADO'),
(7, 1, '2024-11-24 20:00:00', 92.00, 'CALIFICADO'),
(10, 1, '2024-11-17 19:30:00', 85.00, 'CALIFICADO'),

-- María González (202015002)
(1, 2, '2024-11-15 23:00:00', 98.00, 'CALIFICADO'),
(2, 2, '2024-11-08 22:15:00', 50.00, 'CALIFICADO'),
(4, 2, '2024-11-20 23:30:00', 95.00, 'CALIFICADO'),
(7, 2, '2024-11-25 21:45:00', 96.00, 'CALIFICADO'),
(10, 2, '2024-11-18 20:15:00', 90.00, 'CALIFICADO'),

-- Juan Pérez (202015003)
(12, 3, '2024-11-29 22:00:00', 87.00, 'CALIFICADO'),
(13, 3, '2024-11-12 23:30:00', 28.00, 'CALIFICADO'),
(15, 3, '2024-11-21 21:00:00', 82.00, 'CALIFICADO'),
(16, 3, '2024-11-13 20:45:00', 38.00, 'CALIFICADO'),

-- Ana López (202015004)
(1, 4, '2024-11-15 23:30:00', 92.00, 'CALIFICADO'),
(2, 4, '2024-11-08 23:00:00', 45.00, 'CALIFICADO'),
(4, 4, '2024-11-20 22:45:00', 90.00, 'CALIFICADO'),
(7, 4, '2024-11-25 20:30:00', 94.00, 'CALIFICADO'),
(10, 4, '2024-11-18 21:15:00', 88.00, 'CALIFICADO'),

-- Carlos Martínez (202015005)
(12, 5, '2024-11-29 23:15:00', 85.00, 'CALIFICADO'),
(13, 5, '2024-11-12 22:45:00', 25.00, 'CALIFICADO'),
(15, 5, '2024-11-21 20:30:00', 78.00, 'CALIFICADO'),
(16, 5, '2024-11-13 21:00:00', 35.00, 'CALIFICADO'),

-- Laura Rodríguez (202015006)
(1, 6, '2024-11-15 22:45:00', 96.00, 'CALIFICADO'),
(4, 6, '2024-11-20 23:15:00', 98.00, 'CALIFICADO'),
(7, 6, '2024-11-25 21:30:00', 97.00, 'CALIFICADO'),
(10, 6, '2024-11-18 22:00:00', 92.00, 'CALIFICADO');

-- Insertar Asistencias (últimas 2 semanas)
INSERT INTO asistencias (estudiante_id, seccion_curso_id, fecha_clase, hora_clase, tipo_clase, estado) VALUES
-- Diego Hernández - Programación Web
(1, 1, '2024-11-04', '10:00:00', 'TEORIA', 'PRESENTE'),
(1, 1, '2024-11-06', '10:00:00', 'PRACTICA', 'PRESENTE'),
(1, 1, '2024-11-11', '10:00:00', 'TEORIA', 'PRESENTE'),
(1, 1, '2024-11-13', '10:00:00', 'PRACTICA', 'AUSENTE'),

-- Diego Hernández - Base de Datos
(1, 3, '2024-11-05', '08:00:00', 'TEORIA', 'PRESENTE'),
(1, 3, '2024-11-07', '08:00:00', 'LABORATORIO', 'PRESENTE'),
(1, 3, '2024-11-12', '08:00:00', 'TEORIA', 'PRESENTE'),
(1, 3, '2024-11-14', '08:00:00', 'LABORATORIO', 'PRESENTE'),

-- Diego Hernández - Inteligencia Artificial
(1, 4, '2024-11-08', '08:00:00', 'TEORIA', 'PRESENTE'),
(1, 4, '2024-11-15', '08:00:00', 'TEORIA', 'PRESENTE'),

-- Diego Hernández - Redes
(1, 5, '2024-11-04', '16:00:00', 'TEORIA', 'PRESENTE'),
(1, 5, '2024-11-06', '16:00:00', 'LABORATORIO', 'PRESENTE'),
(1, 5, '2024-11-11', '16:00:00', 'TEORIA', 'PRESENTE'),
(1, 5, '2024-11-13', '16:00:00', 'LABORATORIO', 'PRESENTE'),

-- María González - Programación Web
(2, 1, '2024-11-04', '10:00:00', 'TEORIA', 'PRESENTE'),
(2, 1, '2024-11-06', '10:00:00', 'PRACTICA', 'PRESENTE'),
(2, 1, '2024-11-11', '10:00:00', 'TEORIA', 'PRESENTE'),
(2, 1, '2024-11-13', '10:00:00', 'PRACTICA', 'PRESENTE'),

-- María González - Base de Datos
(2, 3, '2024-11-05', '08:00:00', 'TEORIA', 'PRESENTE'),
(2, 3, '2024-11-07', '08:00:00', 'LABORATORIO', 'PRESENTE'),
(2, 3, '2024-11-12', '08:00:00', 'TEORIA', 'PRESENTE'),
(2, 3, '2024-11-14', '08:00:00', 'LABORATORIO', 'PRESENTE'),

-- María González - Inteligencia Artificial
(2, 4, '2024-11-08', '08:00:00', 'TEORIA', 'PRESENTE'),
(2, 4, '2024-11-15', '08:00:00', 'TEORIA', 'PRESENTE'),

-- María González - Redes
(2, 5, '2024-11-04', '16:00:00', 'TEORIA', 'PRESENTE'),
(2, 5, '2024-11-06', '16:00:00', 'LABORATORIO', 'PRESENTE'),
(2, 5, '2024-11-11', '16:00:00', 'TEORIA', 'PRESENTE'),
(2, 5, '2024-11-13', '16:00:00', 'LABORATORIO', 'PRESENTE');

-- Insertar Notas
INSERT INTO notas (estudiante_id, seccion_curso_id, tipo_evaluacion, descripcion, puntaje_obtenido, puntaje_maximo, fecha_evaluacion) VALUES
-- Diego Hernández - Programación Web
(1, 1, 'EXAMEN_PARCIAL', 'Primer Examen Parcial', 85.00, 100.00, '2024-10-15'),
(1, 1, 'TAREA', 'Desarrollo de Sitio Web Personal', 95.00, 100.00, '2024-11-15'),
(1, 1, 'TAREA', 'Ejercicios de CSS Grid y Flexbox', 48.00, 50.00, '2024-11-08'),

-- Diego Hernández - Base de Datos
(1, 3, 'EXAMEN_PARCIAL', 'Primer Examen Parcial', 88.00, 100.00, '2024-10-20'),
(1, 3, 'PROYECTO', 'Diseño de Base de Datos E-commerce', 88.00, 100.00, '2024-11-20'),

-- Diego Hernández - Inteligencia Artificial
(1, 4, 'EXAMEN_PARCIAL', 'Primer Examen Parcial', 90.00, 100.00, '2024-10-25'),
(1, 4, 'PROYECTO', 'Implementación de Algoritmo de Clasificación', 92.00, 100.00, '2024-11-25'),

-- Diego Hernández - Redes
(1, 5, 'EXAMEN_PARCIAL', 'Primer Examen Parcial', 82.00, 100.00, '2024-10-30'),
(1, 5, 'PROYECTO', 'Configuración de Red Local', 85.00, 100.00, '2024-11-18'),

-- María González - Programación Web
(2, 1, 'EXAMEN_PARCIAL', 'Primer Examen Parcial', 92.00, 100.00, '2024-10-15'),
(2, 1, 'TAREA', 'Desarrollo de Sitio Web Personal', 98.00, 100.00, '2024-11-15'),
(2, 1, 'TAREA', 'Ejercicios de CSS Grid y Flexbox', 50.00, 50.00, '2024-11-08'),

-- María González - Base de Datos
(2, 3, 'EXAMEN_PARCIAL', 'Primer Examen Parcial', 95.00, 100.00, '2024-10-20'),
(2, 3, 'PROYECTO', 'Diseño de Base de Datos E-commerce', 95.00, 100.00, '2024-11-20'),

-- María González - Inteligencia Artificial
(2, 4, 'EXAMEN_PARCIAL', 'Primer Examen Parcial', 96.00, 100.00, '2024-10-25'),
(2, 4, 'PROYECTO', 'Implementación de Algoritmo de Clasificación', 96.00, 100.00, '2024-11-25'),

-- María González - Redes
(2, 5, 'EXAMEN_PARCIAL', 'Primer Examen Parcial', 88.00, 100.00, '2024-10-30'),
(2, 5, 'PROYECTO', 'Configuración de Red Local', 90.00, 100.00, '2024-11-18');

-- Insertar Anuncios
INSERT INTO anuncios (titulo, contenido, tipo, prioridad, fecha_publicacion, fecha_expiracion, autor_tipo, destinatarios, estado) VALUES
('Cambio de Horario - Programación Web', 'Se informa que la clase de Programación Web del lunes 11 de noviembre se realizará de 14:00 a 16:00 en lugar del horario habitual.', 'ACADEMICO', 'ALTA', '2024-11-08 10:00:00', '2024-11-11 23:59:00', 'DOCENTE', ARRAY['ESTUDIANTES'], 'ACTIVO'),
('Suspensión de Clases - Viernes 15 de Noviembre', 'Se suspenden todas las clases del viernes 15 de noviembre debido a mantenimiento de la infraestructura eléctrica.', 'ADMINISTRATIVO', 'URGENTE', '2024-11-10 08:00:00', '2024-11-15 23:59:00', 'ADMINISTRACION', ARRAY['ESTUDIANTES', 'DOCENTES'], 'ACTIVO'),
('Conferencia: Inteligencia Artificial en la Industria', 'Invitamos a todos los estudiantes a la conferencia sobre IA en la industria moderna. Fecha: 20 de noviembre, 15:00 hrs.', 'GENERAL', 'NORMAL', '2024-11-12 09:00:00', '2024-11-20 23:59:00', 'ADMINISTRACION', ARRAY['ESTUDIANTES'], 'ACTIVO'),
('Recordatorio: Entrega de Proyectos Finales', 'Recordamos que los proyectos finales deben entregarse antes del 30 de noviembre. Consultar con sus docentes respectivos.', 'ACADEMICO', 'ALTA', '2024-11-14 10:00:00', '2024-11-30 23:59:00', 'ADMINISTRACION', ARRAY['ESTUDIANTES'], 'ACTIVO'),
('Hackathon de Programación 2024', 'Se anuncia el Hackathon de Programación 2024. Fecha: 25-26 de noviembre. Premios para los ganadores.', 'GENERAL', 'NORMAL', '2024-11-15 11:00:00', '2024-11-26 23:59:00', 'ADMINISTRACION', ARRAY['ESTUDIANTES'], 'ACTIVO');

-- Insertar Eventos
INSERT INTO eventos (titulo, descripcion, tipo_evento, fecha_inicio, fecha_fin, ubicacion, cupo_maximo, cupo_actual, organizador, contacto_email, contacto_telefono) VALUES
('Conferencia: IA en la Industria 4.0', 'Conferencia magistral sobre aplicaciones de inteligencia artificial en la industria moderna.', 'CONFERENCIA', '2024-11-20 15:00:00', '2024-11-20 17:00:00', 'Auditorio Central', 150, 120, 'Facultad de Ingeniería', 'fi@unc.edu.pe', '076-365430'),
('Taller: Desarrollo con React.js', 'Taller práctico de desarrollo frontend con React y TypeScript.', 'TALLER', '2024-11-22 16:00:00', '2024-11-22 18:00:00', 'Lab. Sistemas 2', 30, 25, 'Ing. Carlos Mendoza', 'carlos.mendoza@unc.edu.pe', '976123456'),
('Feria de Proyectos de Tesis', 'Presentación de proyectos de tesis de estudiantes de noveno y décimo ciclo.', 'FERIA', '2024-11-25 09:00:00', '2024-11-25 17:00:00', 'Patio Central', 200, 80, 'Dirección de Investigación', 'investigacion@unc.edu.pe', '076-365435'),
('Hackathon: Soluciones Tecnológicas', 'Competencia de programación para desarrollar soluciones innovadoras.', 'COMPETENCIA', '2024-11-25 08:00:00', '2024-11-26 18:00:00', 'Centro de Innovación', 60, 45, 'Centro de Innovación', 'innovacion@unc.edu.pe', '076-365440');

-- Insertar Inscripciones a Eventos
INSERT INTO inscripciones_eventos (evento_id, estudiante_id, estado) VALUES
(1, 1, 'INSCRITO'),
(1, 2, 'INSCRITO'),
(1, 4, 'INSCRITO'),
(1, 6, 'INSCRITO'),
(2, 1, 'INSCRITO'),
(2, 2, 'INSCRITO'),
(3, 1, 'INSCRITO'),
(3, 2, 'INSCRITO'),
(3, 4, 'INSCRITO'),
(3, 6, 'INSCRITO'),
(4, 1, 'INSCRITO'),
(4, 2, 'INSCRITO'),
(4, 4, 'INSCRITO'),
(4, 6, 'INSCRITO');

-- Insertar Pagos
INSERT INTO pagos (estudiante_id, concepto, monto, fecha_vencimiento, estado) VALUES
(1, 'Pensión Noviembre 2024', 150.00, '2024-11-30', 'PENDIENTE'),
(1, 'Pensión Octubre 2024', 150.00, '2024-10-31', 'PAGADO'),
(1, 'Pensión Septiembre 2024', 150.00, '2024-09-30', 'PAGADO'),
(2, 'Pensión Noviembre 2024', 150.00, '2024-11-30', 'PENDIENTE'),
(2, 'Pensión Octubre 2024', 150.00, '2024-10-31', 'PAGADO'),
(3, 'Pensión Noviembre 2024', 150.00, '2024-11-30', 'PENDIENTE'),
(3, 'Pensión Octubre 2024', 150.00, '2024-10-31', 'VENCIDO'),
(4, 'Pensión Noviembre 2024', 150.00, '2024-11-30', 'PENDIENTE'),
(4, 'Pensión Octubre 2024', 150.00, '2024-10-31', 'PAGADO'),
(5, 'Pensión Noviembre 2024', 150.00, '2024-11-30', 'PENDIENTE'),
(5, 'Pensión Octubre 2024', 150.00, '2024-10-31', 'PAGADO'),
(6, 'Pensión Noviembre 2024', 150.00, '2024-11-30', 'PENDIENTE'),
(6, 'Pensión Octubre 2024', 150.00, '2024-10-31', 'PAGADO');

-- Insertar Recursos de Biblioteca
INSERT INTO recursos_biblioteca (titulo, autor, tipo_recurso, formato, url_recurso, tamanio_mb, descripcion, etiquetas, fecha_publicacion, descargas, calificacion_promedio) VALUES
('Ingeniería de Software - Sommerville', 'Ian Sommerville', 'LIBRO', 'PDF', 'https://biblioteca.unc.edu.pe/libros/sommerville-software-engineering.pdf', 15.2, 'Libro completo sobre ingeniería de software', ARRAY['ingeniería de software', 'desarrollo', 'metodologías'], '2021-01-15', 234, 4.8),
('Algoritmos y Estructuras de Datos', 'Thomas H. Cormen', 'LIBRO', 'PDF', 'https://biblioteca.unc.edu.pe/libros/cormen-algorithms.pdf', 8.7, 'Fundamentos de algoritmos y estructuras de datos', ARRAY['algoritmos', 'estructuras de datos', 'programación'], '2020-03-20', 189, 4.9),
('Base de Datos - Elmasri & Navathe', 'Ramez Elmasri', 'LIBRO', 'PDF', 'https://biblioteca.unc.edu.pe/libros/elmasri-databases.pdf', 12.1, 'Sistemas de bases de datos relacionales', ARRAY['bases de datos', 'SQL', 'modelado'], '2022-06-10', 156, 4.7),
('Tutorial React.js Completo', 'Prof. Carlos Mendoza', 'VIDEO', 'MP4', 'https://biblioteca.unc.edu.pe/videos/react-tutorial.mp4', 45.3, 'Tutorial completo de React.js desde cero', ARRAY['react', 'javascript', 'frontend'], '2024-01-15', 89, 4.6),
('Guía de Laboratorio - Redes', 'Ing. María Torres', 'DOCUMENTO', 'DOCX', 'https://biblioteca.unc.edu.pe/documentos/redes-lab-guide.docx', 2.1, 'Guía práctica de laboratorio de redes', ARRAY['redes', 'laboratorio', 'práctica'], '2024-02-20', 67, 4.5);

-- Insertar Descargas de Recursos
INSERT INTO descargas_recursos (recurso_id, estudiante_id, ip_address) VALUES
(1, 1, '192.168.1.100'),
(1, 2, '192.168.1.101'),
(1, 4, '192.168.1.102'),
(2, 1, '192.168.1.100'),
(2, 3, '192.168.1.103'),
(3, 1, '192.168.1.100'),
(3, 2, '192.168.1.101'),
(4, 1, '192.168.1.100'),
(4, 2, '192.168.1.101'),
(5, 1, '192.168.1.100');

-- =====================================================
-- ACTUALIZAR ESTADÍSTICAS
-- =====================================================

-- Actualizar cupos actuales en secciones
UPDATE secciones_cursos SET cupo_actual = 25 WHERE id = 1;
UPDATE secciones_cursos SET cupo_actual = 28 WHERE id = 2;
UPDATE secciones_cursos SET cupo_actual = 20 WHERE id = 3;
UPDATE secciones_cursos SET cupo_actual = 22 WHERE id = 4;
UPDATE secciones_cursos SET cupo_actual = 18 WHERE id = 5;
UPDATE secciones_cursos SET cupo_actual = 24 WHERE id = 6;
UPDATE secciones_cursos SET cupo_actual = 19 WHERE id = 7;

-- Actualizar cupos actuales en eventos
UPDATE eventos SET cupo_actual = 120 WHERE id = 1;
UPDATE eventos SET cupo_actual = 25 WHERE id = 2;
UPDATE eventos SET cupo_actual = 80 WHERE id = 3;
UPDATE eventos SET cupo_actual = 45 WHERE id = 4;

-- Actualizar descargas en recursos
UPDATE recursos_biblioteca SET descargas = 234 WHERE id = 1;
UPDATE recursos_biblioteca SET descargas = 189 WHERE id = 2;
UPDATE recursos_biblioteca SET descargas = 156 WHERE id = 3;
UPDATE recursos_biblioteca SET descargas = 89 WHERE id = 4;
UPDATE recursos_biblioteca SET descargas = 67 WHERE id = 5;

-- =====================================================
-- FIN DE DATOS DE EJEMPLO
-- =====================================================
