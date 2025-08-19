import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import fetch from 'node-fetch';
import crypto from 'crypto';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
});

async function query(sql, params = []) {
  const client = await pool.connect();
  try {
    const res = await client.query(sql, params);
    return res.rows;
  } finally {
    client.release();
  }
}

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'unciabot-api', timestamp: new Date().toISOString() });
});

// Register student with password
app.post('/api/auth/register', async (req, res) => {
  try {
    const { code, dni, nombres, apellidos, email, telefono, escuela_profesional_id, password } = req.body || {};
    if (!code || !dni || !nombres || !apellidos || !email || !password) {
      return res.status(400).json({ error: 'Campos requeridos: code, dni, nombres, apellidos, email, password' });
    }
    // check if exists by code or email or dni
    const exists = await query(
      `SELECT 1 FROM estudiantes WHERE codigo = $1 OR email = $2 OR dni = $3 LIMIT 1`,
      [code, email, dni]
    );
    if (exists.length > 0) return res.status(409).json({ error: 'Estudiante ya registrado' });

    const rows = await query(
      `INSERT INTO estudiantes (codigo, dni, nombres, apellidos, email, telefono, escuela_profesional_id, ciclo_actual)
       VALUES ($1,$2,$3,$4,$5,$6,$7,1)
       RETURNING id, codigo, nombres, apellidos, email, telefono, ciclo_actual`,
      [code, dni, nombres, apellidos, email, telefono || null, escuela_profesional_id || null]
    );
    const s = rows[0];
    // store password hash
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    await query(
      `INSERT INTO estudiantes_auth (estudiante_id, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (estudiante_id) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = CURRENT_TIMESTAMP`,
      [s.id, passwordHash]
    );

    res.status(201).json({
      student: {
        id: String(s.id),
        name: `${s.nombres} ${s.apellidos}`,
        code: s.codigo,
        semester: Number(s.ciclo_actual) || 1,
        email: s.email,
        phone: s.telefono || '',
      },
      note: 'Cuenta creada'
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err?.message });
  }
});

// DB ping
app.get('/api/db/ping', async (_req, res) => {
  try {
    const rows = await query('SELECT 1 as ok');
    res.json({ ok: true, result: rows[0] });
  } catch (err) {
    console.error('DB ping error:', err);
    res.status(500).json({ ok: false, error: err?.message });
  }
});

// Auth: login by student code + password (sha256)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { code, password } = req.body || {};
    if (!code || !password) return res.status(400).json({ error: 'code and password are required' });
    const students = await query(
      `SELECT e.id, e.codigo AS code, e.nombres, e.apellidos, e.email, e.telefono, e.ciclo_actual AS semester,
              e.promedio_general, e.creditos_aprobados, ep.nombre AS career
       FROM estudiantes e
       LEFT JOIN escuelas_profesionales ep ON e.escuela_profesional_id = ep.id
       WHERE e.codigo = $1`,
      [code]
    );
    if (students.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });
    const [auth] = await query(`SELECT password_hash FROM estudiantes_auth WHERE estudiante_id = $1`, [students[0].id]);
    const hashed = crypto.createHash('sha256').update(password).digest('hex');
    if (!auth || auth.password_hash !== hashed) return res.status(401).json({ error: 'Credenciales inválidas' });
    const s = students[0];
    const student = {
      id: String(s.id),
      name: `${s.nombres} ${s.apellidos}`,
      code: s.code,
      career: s.career || '—',
      semester: Number(s.semester) || 1,
      email: s.email,
      phone: s.telefono || '',
      promedio_general: Number(s.promedio_general || 0),
      creditos_aprobados: Number(s.creditos_aprobados || 0),
    };
    res.json({ student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Student profile
app.get('/api/student/:code/profile', async (req, res) => {
  try {
    const { code } = req.params;
    const rows = await query(
      `SELECT e.id, e.codigo AS code, e.nombres, e.apellidos, e.email, e.telefono, e.ciclo_actual AS semester,
              e.promedio_general, e.creditos_aprobados, ep.nombre AS career
       FROM estudiantes e
       LEFT JOIN escuelas_profesionales ep ON e.escuela_profesional_id = ep.id
       WHERE e.codigo = $1`,
      [code]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const s = rows[0];
    res.json({
      id: String(s.id),
      name: `${s.nombres} ${s.apellidos}`,
      code: s.code,
      career: s.career || '—',
      semester: Number(s.semester) || 1,
      email: s.email,
      phone: s.telefono || '',
      promedio_general: Number(s.promedio_general || 0),
      creditos_aprobados: Number(s.creditos_aprobados || 0),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Schedule for student
app.get('/api/student/:code/schedule', async (req, res) => {
  try {
    const { code } = req.params;
    const rows = await query(
      `SELECT codigo_estudiante, nombre_estudiante, codigo_curso, nombre_curso, nombre_docente,
              dia_semana, hora_inicio, hora_fin, tipo_clase, aula, codigo_seccion
       FROM v_horario_estudiante
       WHERE codigo_estudiante = $1
       ORDER BY dia_semana, hora_inicio`,
      [code]
    );
    const dayMap = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };
    const typeMap = { TEORIA: 'Teoría', PRACTICA: 'Práctica', LABORATORIO: 'Laboratorio' };
    const schedule = rows.map((r, idx) => ({
      id: idx + 1,
      time: `${String(r.hora_inicio).slice(0,5)} - ${String(r.hora_fin).slice(0,5)}`,
      course: r.nombre_curso,
      room: r.aula || '',
      professor: r.nombre_docente,
      type: typeMap[r.tipo_clase] || r.tipo_clase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      status: 'upcoming',
      date: dayMap[r.dia_semana] || '',
    }));
    res.json({ schedule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Payments for student
app.get('/api/student/:code/payments', async (req, res) => {
  try {
    const { code } = req.params;
    const rows = await query(
      `SELECT p.id, p.concepto, p.monto, p.fecha_vencimiento, p.fecha_pago, p.estado
       FROM pagos p
       JOIN estudiantes e ON p.estudiante_id = e.id
       WHERE e.codigo = $1
       ORDER BY p.fecha_vencimiento DESC`,
      [code]
    );
    const payments = rows.map(r => ({
      id: r.id,
      month: r.concepto,
      amount: Number(r.monto),
      status: r.estado === 'PAGADO' ? 'paid' : r.estado === 'PENDIENTE' ? 'pending' : 'pending',
      dueDate: r.fecha_vencimiento,
      paidDate: r.fecha_pago,
      type: 'Pensión/Trámite',
      description: '',
    }));
    res.json({ payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Announcements
app.get('/api/announcements', async (_req, res) => {
  try {
    const rows = await query(
      `SELECT id, titulo, contenido, tipo, prioridad, fecha_publicacion
       FROM anuncios
       WHERE estado = 'ACTIVO'
       ORDER BY fecha_publicacion DESC
       LIMIT 50`
    );
    const typeMap = { GENERAL: 'info', ACADEMICO: 'tramite', ADMINISTRATIVO: 'info', URGENTE: 'evento' };
    const prioMap = { URGENTE: 'urgent', ALTA: 'high', NORMAL: 'medium', BAJA: 'low' };
    const announcements = rows.map(r => ({
      id: r.id,
      title: r.titulo,
      description: r.contenido,
      date: r.fecha_publicacion,
      location: '—',
      type: typeMap[r.tipo] || 'info',
      priority: prioMap[r.prioridad] || 'medium',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      link: '#',
    }));
    res.json({ announcements });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Events
app.get('/api/events', async (_req, res) => {
  try {
    const rows = await query(
      `SELECT id, titulo, descripcion, tipo_evento, fecha_inicio, fecha_fin, ubicacion, cupo_maximo, cupo_actual
       FROM eventos
       WHERE estado = 'ACTIVO'
       ORDER BY fecha_inicio ASC`
    );
    const events = rows.map(r => ({
      id: r.id,
      title: r.titulo,
      description: r.descripcion || '',
      date: r.fecha_inicio,
      location: r.ubicacion || '',
      type: (r.tipo_evento || '').toLowerCase(),
      attendees: Number(r.cupo_actual || 0),
      maxAttendees: Number(r.cupo_maximo || 0),
      isRegistered: false,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '#',
    }));
    res.json({ events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Library resources
app.get('/api/library/resources', async (_req, res) => {
  try {
    const rows = await query(
      `SELECT id, titulo, autor, tipo_recurso, formato, tamanio_mb, descargas, calificacion_promedio, fecha_publicacion
       FROM recursos_biblioteca
       WHERE estado = 'DISPONIBLE'
       ORDER BY fecha_publicacion DESC
       LIMIT 100`
    );
    const typeMap = { LIBRO: 'libro', VIDEO: 'video', DOCUMENTO: 'documento', ARTICULO: 'documento', PRESENTACION: 'documento' };
    const resources = rows.map(r => ({
      id: r.id,
      title: r.titulo,
      type: typeMap[r.tipo_recurso] || 'documento',
      author: r.autor || '—',
      year: r.fecha_publicacion ? new Date(r.fecha_publicacion).getFullYear() : null,
      format: r.formato || 'PDF',
      size: r.tamanio_mb ? `${Number(r.tamanio_mb).toFixed(1)} MB` : '—',
      downloads: Number(r.descargas || 0),
      rating: Number(r.calificacion_promedio || 0),
      isAvailable: true,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      description: '',
    }));
    res.json({ resources });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Register to event
app.post('/api/events/:id/register', async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body || {};
    if (!code) return res.status(400).json({ error: 'code requerido' });
    const studentRows = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [code]);
    if (studentRows.length === 0) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const estudianteId = studentRows[0].id;
    await query(
      `INSERT INTO inscripciones_eventos (evento_id, estudiante_id, estado)
       VALUES ($1, $2, 'INSCRITO')
       ON CONFLICT (evento_id, estudiante_id) DO UPDATE SET estado = EXCLUDED.estado, updated_at = CURRENT_TIMESTAMP`,
      [id, estudianteId]
    );
    // increment cupo_actual if possible
    await query(`UPDATE eventos SET cupo_actual = LEAST(COALESCE(cupo_actual,0)+1, COALESCE(cupo_maximo, COALESCE(cupo_actual,0)+1)) WHERE id = $1`, [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Pay a payment record for a student
app.post('/api/student/:code/payments/:paymentId/pay', async (req, res) => {
  try {
    const { code, paymentId } = req.params;
    const rows = await query(
      `UPDATE pagos p SET estado = 'PAGADO', fecha_pago = CURRENT_TIMESTAMP
       FROM estudiantes e
       WHERE p.id = $1 AND e.codigo = $2 AND p.estudiante_id = e.id
       RETURNING p.id, p.estado, p.fecha_pago`,
      [paymentId, code]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json({ payment: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Library resource download
app.post('/api/library/resources/:id/download', async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query(
      `UPDATE recursos_biblioteca SET descargas = COALESCE(descargas,0) + 1 WHERE id = $1 RETURNING id, descargas`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Recurso no encontrado' });
    res.json({ id: rows[0].id, downloads: rows[0].descargas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ==========================
// Social: Profiles
// ==========================
app.get('/api/profile/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const rows = await query(
      `SELECT e.id, e.codigo AS code, e.nombres || ' ' || e.apellidos AS name, e.email, e.telefono,
              e.ciclo_actual AS semester, ep.nombre AS career, p.avatar_url, p.bio
       FROM estudiantes e
       LEFT JOIN escuelas_profesionales ep ON e.escuela_profesional_id = ep.id
       LEFT JOIN estudiantes_perfiles p ON p.estudiante_id = e.id
       WHERE e.codigo = $1`,
      [code]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Perfil no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/profile/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const { avatar_url, bio } = req.body || {};
    const rows = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [code]);
    if (rows.length === 0) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const estudianteId = rows[0].id;
    const up = await query(
      `INSERT INTO estudiantes_perfiles (estudiante_id, avatar_url, bio)
       VALUES ($1, $2, $3)
       ON CONFLICT (estudiante_id)
       DO UPDATE SET avatar_url = EXCLUDED.avatar_url, bio = EXCLUDED.bio, updated_at = CURRENT_TIMESTAMP
       RETURNING avatar_url, bio`,
      [estudianteId, avatar_url || null, bio || null]
    );
    res.json(up[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ==========================
// Social: Community posts
// ==========================
app.get('/api/community/posts', async (_req, res) => {
  try {
    const rows = await query(
      `SELECT p.id, p.contenido AS content, p.likes_count AS likes, p.created_at,
              e.codigo AS code, e.nombres || ' ' || e.apellidos AS author
       FROM comunidad_posts p
       JOIN estudiantes e ON p.autor_id = e.id
       ORDER BY p.created_at DESC
       LIMIT 100`
    );
    res.json({ posts: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/community/posts', async (req, res) => {
  try {
    const { code, content } = req.body || {};
    if (!code || !content) return res.status(400).json({ error: 'code y content requeridos' });
    const rows = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [code]);
    if (rows.length === 0) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const estId = rows[0].id;
    const ins = await query(
      `INSERT INTO comunidad_posts (autor_id, contenido) VALUES ($1, $2) RETURNING id, created_at`,
      [estId, content]
    );
    res.status(201).json({ id: ins[0].id, created_at: ins[0].created_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Comments
app.get('/api/community/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query(
      `SELECT c.id, c.contenido AS content, c.created_at, e.codigo AS code, e.nombres || ' ' || e.apellidos AS author
       FROM comunidad_comentarios c
       JOIN estudiantes e ON c.autor_id = e.id
       WHERE c.post_id = $1
       ORDER BY c.created_at ASC`,
      [id]
    );
    res.json({ comments: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/community/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { code, content } = req.body || {};
    if (!code || !content) return res.status(400).json({ error: 'code y content requeridos' });
    const [u] = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [code]);
    if (!u) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const [ins] = await query(
      `INSERT INTO comunidad_comentarios (post_id, autor_id, contenido)
       VALUES ($1, $2, $3) RETURNING id, created_at`,
      [id, u.id, content]
    );
    res.status(201).json({ id: ins.id, created_at: ins.created_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/community/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body || {};
    if (!code) return res.status(400).json({ error: 'code requerido' });
    const rows = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [code]);
    if (rows.length === 0) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const estId = rows[0].id;
    await query(`INSERT INTO comunidad_likes (post_id, estudiante_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [id, estId]);
    const upd = await query(`UPDATE comunidad_posts SET likes_count = likes_count + 1 WHERE id = $1 RETURNING likes_count`, [id]);
    res.json({ likes: upd[0]?.likes_count || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ==========================
// Social: Friendships
// ==========================
app.post('/api/friends/request', async (req, res) => {
  try {
    const { fromCode, toCode } = req.body || {};
    if (!fromCode || !toCode) return res.status(400).json({ error: 'fromCode y toCode requeridos' });
    const [fromRow] = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [fromCode]);
    const [toRow] = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [toCode]);
    if (!fromRow || !toRow) return res.status(404).json({ error: 'Estudiante no encontrado' });
    await query(
      `INSERT INTO amistades (solicitante_id, destinatario_id, estado)
       VALUES ($1, $2, 'PENDIENTE')
       ON CONFLICT (solicitante_id, destinatario_id) DO UPDATE SET estado='PENDIENTE', updated_at = CURRENT_TIMESTAMP`,
      [fromRow.id, toRow.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`unciabot API listening on http://localhost:${port}`);
});

// Voice agent proxy (optional)
const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://diehc.app.n8n.cloud/webhook/90e68585-c69a-4e6c-ba85-cfdff32fd98e/chat';
app.post('/api/agent/voice', async (req, res) => {
  try {
    const { message, metadata } = req.body || {};
    if (!message) return res.status(400).json({ error: 'message requerido' });
    const r = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, metadata: metadata || {} }),
    });
    const text = await r.text();
    res.type('text/plain').send(text);
  } catch (err) {
    console.error('Agent voice error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ==========================
// Social: Groups chat (basic)
// ==========================
app.post('/api/groups', async (req, res) => {
  try {
    const { code, name } = req.body || {};
    if (!code || !name) return res.status(400).json({ error: 'code y name requeridos' });
    const [u] = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [code]);
    if (!u) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const [g] = await query(`INSERT INTO comunidad_grupos (nombre, creador_id) VALUES ($1, $2) RETURNING id`, [name, u.id]);
    await query(`INSERT INTO comunidad_grupo_miembros (grupo_id, estudiante_id, rol) VALUES ($1, $2, 'ADMIN')`, [g.id, u.id]);
    res.status(201).json({ id: g.id, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/groups/:id/join', async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body || {};
    const [u] = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [code]);
    if (!u) return res.status(404).json({ error: 'Estudiante no encontrado' });
    await query(`INSERT INTO comunidad_grupo_miembros (grupo_id, estudiante_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [id, u.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/groups/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query(
      `SELECT m.id, m.autor_id, m.autor_tipo, m.contenido, m.creado_en,
              e.codigo AS code, COALESCE(e.nombres || ' ' || e.apellidos, 'Agente') AS author
       FROM comunidad_grupo_mensajes m
       LEFT JOIN estudiantes e ON e.id = m.autor_id
       WHERE m.grupo_id = $1
       ORDER BY m.creado_en DESC
       LIMIT 100`,
      [id]
    );
    res.json({ messages: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/groups/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const { code, content } = req.body || {};
    if (!content) return res.status(400).json({ error: 'content requerido' });
    let autorId = null;
    if (code) {
      const [u] = await query(`SELECT id FROM estudiantes WHERE codigo = $1`, [code]);
      autorId = u?.id || null;
    }
    const [ins] = await query(
      `INSERT INTO comunidad_grupo_mensajes (grupo_id, autor_id, autor_tipo, contenido)
       VALUES ($1, $2, $3, $4)
       RETURNING id, creado_en`,
      [id, autorId, autorId ? 'USUARIO' : 'BOT', content]
    );
    res.status(201).json({ id: ins.id, created_at: ins.creado_en });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Agent relay into group as bot
app.post('/api/groups/:id/agent', async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: 'message requerido' });
    // call n8n
    await fetch(n8nWebhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) });
    // store bot message
    const [ins] = await query(
      `INSERT INTO comunidad_grupo_mensajes (grupo_id, autor_id, autor_tipo, contenido)
       VALUES ($1, NULL, 'BOT', $2) RETURNING id, creado_en`,
      [id, message]
    );
    res.status(201).json({ id: ins.id, created_at: ins.creado_en });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


