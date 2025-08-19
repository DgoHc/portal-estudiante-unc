# Base de Datos - Portal Estudiantil UNC

## 📋 Descripción

Base de datos PostgreSQL completa para el Portal Estudiantil de la Universidad Nacional de Cajamarca. Esta base de datos está diseñada para integrarse con el agente de n8n y proporcionar respuestas inteligentes a las consultas de los estudiantes.

## 🗄️ Estructura de la Base de Datos

### Tablas Principales

| Tabla | Descripción |
|-------|-------------|
| `facultades` | Información de las facultades de la universidad |
| `escuelas_profesionales` | Escuelas profesionales por facultad |
| `ciclos_academicos` | Ciclos académicos activos |
| `docentes` | Información de los docentes |
| `estudiantes` | Información de los estudiantes |
| `cursos` | Catálogo de cursos disponibles |
| `secciones_cursos` | Secciones de cursos con docentes asignados |
| `inscripciones_estudiantes` | Inscripciones de estudiantes a cursos |
| `horarios` | Horarios de clases por sección |
| `tareas` | Tareas y actividades asignadas |
| `entregas_tareas` | Entregas de tareas por estudiantes |
| `asistencias` | Registro de asistencia |
| `notas` | Calificaciones de estudiantes |
| `anuncios` | Anuncios y comunicaciones |
| `eventos` | Eventos y actividades extracurriculares |
| `inscripciones_eventos` | Inscripciones a eventos |
| `pagos` | Sistema de pagos y pensiones |
| `recursos_biblioteca` | Recursos digitales de la biblioteca |
| `descargas_recursos` | Registro de descargas |

### Vistas Útiles

- `v_horario_estudiante` - Horario completo del estudiante
- `v_tareas_pendientes_estudiante` - Tareas pendientes
- `v_notas_estudiante` - Notas del estudiante
- `v_asistencia_estudiante` - Asistencia del estudiante
- `v_pagos_pendientes` - Pagos pendientes

## 🚀 Instalación

### Prerrequisitos

- PostgreSQL 12 o superior
- Extensión `pg_trgm` habilitada
- Extensión `uuid-ossp` habilitada

### Pasos de Instalación

1. **Crear la base de datos:**
```bashDATABASE portal_estudiante_unc;"
psql -U postgres -c "CREATE 
```

2. **Ejecutar el esquema:**
```bash
psql -U postgres -d portal_estudiante_unc -f schema.sql
```

3. **Poblar con datos de ejemplo:**
```bash
psql -U postgres -d portal_estudiante_unc -f sample_data.sql
```

4. **Verificar la instalación:**
```bash
psql -U postgres -d portal_estudiante_unc -c "SELECT COUNT(*) FROM estudiantes;"
```

## 🔧 Configuración para n8n

### Variables de Entorno

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portal_estudiante_unc
DB_USER=postgres
DB_PASSWORD=tu_password
```

### Conexión en n8n

1. **Crear nodo PostgreSQL:**
   - Host: `{{ $env.DB_HOST }}`
   - Port: `{{ $env.DB_PORT }}`
   - Database: `{{ $env.DB_NAME }}`
   - User: `{{ $env.DB_USER }}`
   - Password: `{{ $env.DB_PASSWORD }}`

2. **Configurar consultas dinámicas:**
   - Usar el parámetro `codigo_estudiante` para filtrar por estudiante
   - Implementar lógica de NLP para interpretar preguntas

## 📊 Datos de Ejemplo

### Estudiantes de Prueba

| Código | Nombre | Email |
|--------|--------|-------|
| 202015001 | Diego Hernández | diego.hernandez@unc.edu.pe |
| 202015002 | María González | maria.gonzalez@unc.edu.pe |
| 202015003 | Juan Pérez | juan.perez@unc.edu.pe |
| 202015004 | Ana López | ana.lopez@unc.edu.pe |
| 202015005 | Carlos Martínez | carlos.martinez@unc.edu.pe |
| 202015006 | Laura Rodríguez | laura.rodriguez@unc.edu.pe |

### Cursos Disponibles

- CS-301: Programación Web
- CS-302: Base de Datos Avanzadas
- CS-303: Inteligencia Artificial
- CS-304: Redes de Computadoras
- CS-305: Ingeniería de Software
- CS-306: Análisis de Algoritmos

## 💬 Ejemplos de Consultas para el Agente

### Tareas y Actividades

```sql
-- "¿Qué tareas tengo pendientes?"
SELECT t.titulo, t.fecha_entrega, c.nombre as curso
FROM tareas t
JOIN secciones_cursos sc ON t.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN inscripciones_estudiantes ie ON sc.id = ie.seccion_curso_id
WHERE ie.estudiante_id = (SELECT id FROM estudiantes WHERE codigo = '202015001')
  AND t.fecha_entrega >= CURRENT_DATE
  AND t.estado = 'ACTIVO';
```

### Horarios

```sql
-- "¿Cuál es mi horario?"
SELECT h.dia_semana, h.hora_inicio, h.hora_fin, c.nombre, h.aula
FROM horarios h
JOIN secciones_cursos sc ON h.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
JOIN inscripciones_estudiantes ie ON sc.id = ie.seccion_curso_id
WHERE ie.estudiante_id = (SELECT id FROM estudiantes WHERE codigo = '202015001')
ORDER BY h.dia_semana, h.hora_inicio;
```

### Notas

```sql
-- "¿Cuáles son mis notas?"
SELECT c.nombre, n.tipo_evaluacion, 
       ROUND((n.puntaje_obtenido / n.puntaje_maximo) * 20, 2) as nota_20
FROM notas n
JOIN secciones_cursos sc ON n.seccion_curso_id = sc.id
JOIN cursos c ON sc.curso_id = c.id
WHERE n.estudiante_id = (SELECT id FROM estudiantes WHERE codigo = '202015001')
ORDER BY c.nombre, n.fecha_evaluacion DESC;
```

## 🤖 Integración con n8n

### Flujo de Trabajo Sugerido

1. **Nodo Webhook** - Recibe la pregunta del chat
2. **Nodo Function** - Procesa la pregunta y extrae el código de estudiante
3. **Nodo Switch** - Determina el tipo de consulta (tareas, horario, notas, etc.)
4. **Nodo PostgreSQL** - Ejecuta la consulta correspondiente
5. **Nodo Function** - Formatea la respuesta
6. **Nodo Respond to Webhook** - Envía la respuesta al chat

### Ejemplo de Función de Procesamiento

```javascript
// Extraer código de estudiante y tipo de consulta
const message = $input.first().json.message;
const codigoEstudiante = '202015001'; // En producción, extraer del contexto

let queryType = 'general';
let sqlQuery = '';

if (message.includes('tarea') || message.includes('trabajo')) {
  queryType = 'tareas';
  sqlQuery = `
    SELECT t.titulo, t.fecha_entrega, c.nombre as curso
    FROM tareas t
    JOIN secciones_cursos sc ON t.seccion_curso_id = sc.id
    JOIN cursos c ON sc.curso_id = c.id
    JOIN inscripciones_estudiantes ie ON sc.id = ie.seccion_curso_id
    WHERE ie.estudiante_id = (SELECT id FROM estudiantes WHERE codigo = '${codigoEstudiante}')
      AND t.fecha_entrega >= CURRENT_DATE
      AND t.estado = 'ACTIVO'
    ORDER BY t.fecha_entrega
  `;
} else if (message.includes('horario')) {
  queryType = 'horario';
  // Consulta de horario...
}

return {
  codigoEstudiante,
  queryType,
  sqlQuery,
  originalMessage: message
};
```

## 📈 Consultas Avanzadas

### Estadísticas del Estudiante

```sql
-- Obtener estadísticas completas
SELECT 
  e.nombres || ' ' || e.apellidos as nombre,
  e.promedio_general,
  e.creditos_aprobados,
  COUNT(DISTINCT ie.seccion_curso_id) as cursos_inscritos,
  COUNT(DISTINCT t.id) as tareas_pendientes
FROM estudiantes e
LEFT JOIN inscripciones_estudiantes ie ON e.id = ie.estudiante_id
LEFT JOIN secciones_cursos sc ON ie.seccion_curso_id = sc.id
LEFT JOIN tareas t ON sc.id = t.seccion_curso_id AND t.fecha_entrega >= CURRENT_DATE
WHERE e.codigo = '202015001'
GROUP BY e.id, e.nombres, e.apellidos, e.promedio_general, e.creditos_aprobados;
```

### Alertas y Recordatorios

```sql
-- Obtener alertas importantes
SELECT 
  'TAREA_VENCIDA' as tipo,
  t.titulo,
  t.fecha_entrega
FROM tareas t
JOIN secciones_cursos sc ON t.seccion_curso_id = sc.id
JOIN inscripciones_estudiantes ie ON sc.id = ie.seccion_curso_id
WHERE ie.estudiante_id = (SELECT id FROM estudiantes WHERE codigo = '202015001')
  AND t.fecha_entrega < CURRENT_DATE
  AND t.estado = 'ACTIVO'
UNION ALL
SELECT 
  'PAGO_VENCIDO' as tipo,
  p.concepto,
  p.fecha_vencimiento
FROM pagos p
WHERE p.estudiante_id = (SELECT id FROM estudiantes WHERE codigo = '202015001')
  AND p.fecha_vencimiento < CURRENT_DATE
  AND p.estado = 'PENDIENTE';
```

## 🔒 Seguridad

### Recomendaciones

1. **Usar conexiones SSL** para la conexión a la base de datos
2. **Implementar autenticación** basada en tokens JWT
3. **Validar inputs** antes de ejecutar consultas SQL
4. **Usar prepared statements** para evitar SQL injection
5. **Limitar permisos** del usuario de la base de datos

### Usuario de Aplicación

```sql
-- Crear usuario específico para la aplicación
CREATE USER portal_app WITH PASSWORD 'secure_password';

-- Otorgar permisos mínimos necesarios
GRANT SELECT ON ALL TABLES IN SCHEMA public TO portal_app;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO portal_app;
```

## 📝 Mantenimiento

### Backups

```bash
# Backup completo
pg_dump -U postgres -d portal_estudiante_unc > backup_$(date +%Y%m%d).sql

# Backup solo datos
pg_dump -U postgres -d portal_estudiante_unc --data-only > data_backup_$(date +%Y%m%d).sql
```

### Actualizaciones

```bash
# Ejecutar migraciones
psql -U postgres -d portal_estudiante_unc -f migrations/migration_001.sql
```

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de conexión:**
   - Verificar que PostgreSQL esté ejecutándose
   - Confirmar credenciales de conexión
   - Verificar firewall y configuración de red

2. **Error de permisos:**
   - Verificar que el usuario tenga permisos en la base de datos
   - Confirmar que las extensiones estén habilitadas

3. **Consultas lentas:**
   - Verificar que los índices estén creados
   - Analizar el plan de ejecución con `EXPLAIN ANALYZE`
   - Optimizar consultas complejas

## 📞 Soporte

Para soporte técnico o preguntas sobre la base de datos:

- **Email:** soporte@unc.edu.pe
- **Documentación:** [docs.unc.edu.pe](https://docs.unc.edu.pe)
- **GitHub:** [github.com/unc/portal-estudiante](https://github.com/unc/portal-estudiante)

---

**Desarrollado por:** Universidad Nacional de Cajamarca  
**Versión:** 1.0.0  
**Última actualización:** Noviembre 2024
