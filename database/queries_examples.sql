-- =====================================================
-- CONSULTAS SQL DE EJEMPLO PARA EL AGENTE
-- Portal Estudiantil UNC - n8n Integration
-- =====================================================

-- =====================================================
-- CONSULTAS PARA TAREAS Y ACTIVIDADES
-- =====================================================

-- 1. Obtener tareas pendientes de un estudiante específico
-- Uso: "¿Qué tareas tengo pendientes?"
SELECT 
    t.titulo as titulo_tarea,
    t.descripcion,
    t.tipo_tarea,
    t.fecha_entrega,
    t.puntaje_maximo,
    c.nombre as nombre_curso,
    d.nombres || ' ' || d.apellidos as nombre_docente,
    CASE 
        WHEN et.id IS NULL THEN 'PENDIENTE'
        ELSE et.estado
    END as estado_entrega
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN docentes d ON sc.docente_id = d.id
JOIN tareas t ON sc.id = t.seccion_curso_id
LEFT JOIN entregas_tareas et ON t.id = et.tarea_id AND e.id = et.estudiante_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO' 
    AND t.estado = 'ACTIVO' 
    AND t.fecha_entrega >= CURRENT_DATE
    AND (et.id IS NULL OR et.estado = 'ENTREGADO')
ORDER BY t.fecha_entrega;

-- 2. Obtener tareas por fecha específica
-- Uso: "¿Qué tareas tengo para el lunes?"
SELECT 
    t.titulo as titulo_tarea,
    t.descripcion,
    t.tipo_tarea,
    t.fecha_entrega,
    t.puntaje_maximo,
    c.nombre as nombre_curso,
    d.nombres || ' ' || d.apellidos as nombre_docente
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN docentes d ON sc.docente_id = d.id
JOIN tareas t ON sc.id = t.seccion_curso_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO' 
    AND t.estado = 'ACTIVO' 
    AND DATE(t.fecha_entrega) = '2024-11-18'
ORDER BY t.fecha_entrega;

-- 3. Obtener tareas vencidas
-- Uso: "¿Qué tareas tengo vencidas?"
SELECT 
    t.titulo as titulo_tarea,
    t.descripcion,
    t.tipo_tarea,
    t.fecha_entrega,
    t.puntaje_maximo,
    c.nombre as nombre_curso,
    d.nombres || ' ' || d.apellidos as nombre_docente,
    CURRENT_DATE - DATE(t.fecha_entrega) as dias_vencida
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN docentes d ON sc.docente_id = d.id
JOIN tareas t ON sc.id = t.seccion_curso_id
LEFT JOIN entregas_tareas et ON t.id = et.tarea_id AND e.id = et.estudiante_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO' 
    AND t.estado = 'ACTIVO' 
    AND t.fecha_entrega < CURRENT_DATE
    AND et.id IS NULL
ORDER BY t.fecha_entrega;

-- =====================================================
-- CONSULTAS PARA HORARIOS
-- =====================================================

-- 4. Obtener horario completo del estudiante
-- Uso: "¿Cuál es mi horario?"
SELECT 
    CASE h.dia_semana
        WHEN 1 THEN 'Lunes'
        WHEN 2 THEN 'Martes'
        WHEN 3 THEN 'Miércoles'
        WHEN 4 THEN 'Jueves'
        WHEN 5 THEN 'Viernes'
        WHEN 6 THEN 'Sábado'
        WHEN 7 THEN 'Domingo'
    END as dia,
    h.hora_inicio,
    h.hora_fin,
    c.nombre as nombre_curso,
    h.tipo_clase,
    h.aula,
    d.nombres || ' ' || d.apellidos as nombre_docente
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN docentes d ON sc.docente_id = d.id
JOIN horarios h ON sc.id = h.seccion_curso_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO' 
    AND sc.estado = 'ACTIVO'
ORDER BY h.dia_semana, h.hora_inicio;

-- 5. Obtener clases de hoy
-- Uso: "¿Qué clases tengo hoy?"
SELECT 
    h.hora_inicio,
    h.hora_fin,
    c.nombre as nombre_curso,
    h.tipo_clase,
    h.aula,
    d.nombres || ' ' || d.apellidos as nombre_docente
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN docentes d ON sc.docente_id = d.id
JOIN horarios h ON sc.id = h.seccion_curso_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO' 
    AND sc.estado = 'ACTIVO'
    AND h.dia_semana = EXTRACT(DOW FROM CURRENT_DATE) + 1
ORDER BY h.hora_inicio;

-- 6. Obtener próxima clase
-- Uso: "¿Cuál es mi próxima clase?"
SELECT 
    h.hora_inicio,
    h.hora_fin,
    c.nombre as nombre_curso,
    h.tipo_clase,
    h.aula,
    d.nombres || ' ' || d.apellidos as nombre_docente,
    CASE h.dia_semana
        WHEN 1 THEN 'Lunes'
        WHEN 2 THEN 'Martes'
        WHEN 3 THEN 'Miércoles'
        WHEN 4 THEN 'Jueves'
        WHEN 5 THEN 'Viernes'
        WHEN 6 THEN 'Sábado'
        WHEN 7 THEN 'Domingo'
    END as dia
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN docentes d ON sc.docente_id = d.id
JOIN horarios h ON sc.id = h.seccion_curso_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO' 
    AND sc.estado = 'ACTIVO'
    AND (
        (h.dia_semana = EXTRACT(DOW FROM CURRENT_DATE) + 1 AND h.hora_inicio > CURRENT_TIME)
        OR h.dia_semana > EXTRACT(DOW FROM CURRENT_DATE) + 1
    )
ORDER BY h.dia_semana, h.hora_inicio
LIMIT 1;

-- =====================================================
-- CONSULTAS PARA NOTAS Y CALIFICACIONES
-- =====================================================

-- 7. Obtener notas de un estudiante
-- Uso: "¿Cuáles son mis notas?"
SELECT 
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
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO'
ORDER BY c.nombre, n.fecha_evaluacion DESC;

-- 8. Obtener promedio por curso
-- Uso: "¿Cuál es mi promedio en Programación Web?"
SELECT 
    c.nombre as nombre_curso,
    ROUND(AVG((n.puntaje_obtenido / n.puntaje_maximo) * 20), 2) as promedio_curso,
    COUNT(n.id) as total_evaluaciones
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN notas n ON sc.id = n.seccion_curso_id AND e.id = n.estudiante_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO'
    AND c.nombre ILIKE '%Programación Web%'
GROUP BY c.nombre;

-- =====================================================
-- CONSULTAS PARA ASISTENCIA
-- =====================================================

-- 9. Obtener asistencia del estudiante
-- Uso: "¿Cuál es mi asistencia?"
SELECT 
    c.nombre as nombre_curso,
    COUNT(a.id) as total_clases,
    COUNT(CASE WHEN a.estado = 'PRESENTE' THEN 1 END) as asistencias,
    COUNT(CASE WHEN a.estado = 'AUSENTE' THEN 1 END) as ausencias,
    ROUND((COUNT(CASE WHEN a.estado = 'PRESENTE' THEN 1 END) * 100.0 / COUNT(a.id)), 2) as porcentaje_asistencia
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN asistencias a ON sc.id = a.seccion_curso_id AND e.id = a.estudiante_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO'
GROUP BY c.nombre
ORDER BY c.nombre;

-- =====================================================
-- CONSULTAS PARA PAGOS
-- =====================================================

-- 10. Obtener pagos pendientes
-- Uso: "¿Qué pagos tengo pendientes?"
SELECT 
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
WHERE e.codigo = '202015001' 
    AND p.estado = 'PENDIENTE'
ORDER BY p.fecha_vencimiento;

-- =====================================================
-- CONSULTAS PARA ANUNCIOS
-- =====================================================

-- 11. Obtener anuncios recientes
-- Uso: "¿Qué anuncios hay nuevos?"
SELECT 
    a.titulo,
    a.contenido,
    a.tipo,
    a.prioridad,
    a.fecha_publicacion,
    a.autor_tipo
FROM anuncios a
WHERE a.estado = 'ACTIVO'
    AND a.fecha_publicacion >= CURRENT_DATE - INTERVAL '7 days'
    AND (
        'ESTUDIANTES' = ANY(a.destinatarios)
        OR 'TODOS' = ANY(a.destinatarios)
    )
ORDER BY a.prioridad DESC, a.fecha_publicacion DESC;

-- =====================================================
-- CONSULTAS PARA EVENTOS
-- =====================================================

-- 12. Obtener eventos próximos
-- Uso: "¿Qué eventos hay próximos?"
SELECT 
    e.titulo,
    e.descripcion,
    e.tipo_evento,
    e.fecha_inicio,
    e.fecha_fin,
    e.ubicacion,
    e.organizador,
    CASE 
        WHEN ie.estudiante_id IS NOT NULL THEN 'INSCRITO'
        ELSE 'NO_INSCRITO'
    END as estado_inscripcion
FROM eventos e
LEFT JOIN inscripciones_eventos ie ON e.id = ie.evento_id AND ie.estudiante_id = (SELECT id FROM estudiantes WHERE codigo = '202015001')
WHERE e.estado = 'ACTIVO'
    AND e.fecha_inicio >= CURRENT_DATE
ORDER BY e.fecha_inicio;

-- =====================================================
-- CONSULTAS PARA RECURSOS DE BIBLIOTECA
-- =====================================================

-- 13. Buscar recursos por palabra clave
-- Uso: "Buscar recursos sobre React"
SELECT 
    rb.titulo,
    rb.autor,
    rb.tipo_recurso,
    rb.formato,
    rb.descripcion,
    rb.descargas,
    rb.calificacion_promedio,
    rb.etiquetas
FROM recursos_biblioteca rb
WHERE rb.estado = 'DISPONIBLE'
    AND (
        rb.titulo ILIKE '%React%'
        OR rb.descripcion ILIKE '%React%'
        OR 'react' = ANY(rb.etiquetas)
    )
ORDER BY rb.calificacion_promedio DESC, rb.descargas DESC;

-- =====================================================
-- CONSULTAS ESTADÍSTICAS
-- =====================================================

-- 14. Obtener estadísticas generales del estudiante
-- Uso: "¿Cuáles son mis estadísticas?"
SELECT 
    e.nombres || ' ' || e.apellidos as nombre_completo,
    e.codigo,
    e.ciclo_actual,
    e.promedio_general,
    e.creditos_aprobados,
    COUNT(DISTINCT ie.seccion_curso_id) as cursos_inscritos,
    COUNT(DISTINCT t.id) as tareas_pendientes,
    COUNT(DISTINCT p.id) as pagos_pendientes
FROM estudiantes e
LEFT JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id AND ie.estado = 'INSCRITO'
LEFT JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
LEFT JOIN tareas t ON sc.id = t.seccion_curso_id 
    AND t.estado = 'ACTIVO' 
    AND t.fecha_entrega >= CURRENT_DATE
LEFT JOIN entregas_tareas et ON t.id = et.tarea_id AND e.id = et.estudiante_id
LEFT JOIN pagos p ON e.id = p.estudiante_id AND p.estado = 'PENDIENTE'
WHERE e.codigo = '202015001'
GROUP BY e.id, e.nombres, e.apellidos, e.codigo, e.ciclo_actual, e.promedio_general, e.creditos_aprobados;

-- =====================================================
-- CONSULTAS PARA RECOMENDACIONES
-- =====================================================

-- 15. Obtener recomendaciones de recursos basadas en cursos inscritos
-- Uso: "Recomiéndame recursos para mis cursos"
SELECT DISTINCT
    rb.titulo,
    rb.autor,
    rb.tipo_recurso,
    rb.descripcion,
    rb.calificacion_promedio,
    rb.etiquetas
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN recursos_biblioteca rb ON (
    rb.titulo ILIKE '%' || c.nombre || '%'
    OR EXISTS (
        SELECT 1 FROM unnest(rb.etiquetas) tag 
        WHERE tag ILIKE '%' || c.nombre || '%'
    )
)
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO'
    AND rb.estado = 'DISPONIBLE'
ORDER BY rb.calificacion_promedio DESC, rb.descargas DESC
LIMIT 10;

-- =====================================================
-- CONSULTAS PARA ALERTAS Y RECORDATORIOS
-- =====================================================

-- 16. Obtener alertas importantes para el estudiante
-- Uso: "¿Qué alertas tengo?"
SELECT 
    'TAREA_VENCIDA' as tipo_alerta,
    t.titulo as titulo,
    'Tarea vencida: ' || t.titulo as mensaje,
    t.fecha_entrega as fecha_referencia
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN tareas t ON sc.id = t.seccion_curso_id
LEFT JOIN entregas_tareas et ON t.id = et.tarea_id AND e.id = et.estudiante_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO' 
    AND t.estado = 'ACTIVO' 
    AND t.fecha_entrega < CURRENT_DATE
    AND et.id IS NULL

UNION ALL

SELECT 
    'PAGO_VENCIDO' as tipo_alerta,
    p.concepto as titulo,
    'Pago vencido: ' || p.concepto as mensaje,
    p.fecha_vencimiento as fecha_referencia
FROM estudiantes e
JOIN pagos p ON e.id = p.estudiante_id
WHERE e.codigo = '202015001' 
    AND p.estado = 'PENDIENTE'
    AND p.fecha_vencimiento < CURRENT_DATE

UNION ALL

SELECT 
    'TAREA_POR_VENCER' as tipo_alerta,
    t.titulo as titulo,
    'Tarea por vencer: ' || t.titulo as mensaje,
    t.fecha_entrega as fecha_referencia
FROM estudiantes e
JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
JOIN tareas t ON sc.id = t.seccion_curso_id
LEFT JOIN entregas_tareas et ON t.id = et.tarea_id AND e.id = et.estudiante_id
WHERE e.codigo = '202015001' 
    AND ie.estado = 'INSCRITO' 
    AND t.estado = 'ACTIVO' 
    AND t.fecha_entrega BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '3 days'
    AND et.id IS NULL

ORDER BY fecha_referencia;

-- =====================================================
-- FIN DE CONSULTAS DE EJEMPLO
-- =====================================================
