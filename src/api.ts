export interface LoginResponse {
  student: {
    id: string;
    name: string;
    code: string;
    career: string;
    semester: number;
    email: string;
    phone: string;
    promedio_general?: number;
    creditos_aprobados?: number;
  };
}

export async function apiLogin(code: string, password: string): Promise<LoginResponse> {
  // Lanza error inmediatamente para usar fallback mock
  throw new Error('Backend API no disponible. Usando credenciales mock.');
}

export async function apiGetSchedule(code: string): Promise<{ schedule: any[] }> {
  const res = await fetch(`/api/student/${encodeURIComponent(code)}/schedule`);
  if (!res.ok) throw new Error('Error fetching schedule');
  return res.json();
}

export async function apiGetPayments(code: string): Promise<{ payments: any[] }> {
  const res = await fetch(`/api/student/${encodeURIComponent(code)}/payments`);
  if (!res.ok) throw new Error('Error fetching payments');
  return res.json();
}

export async function apiGetAnnouncements(): Promise<{ announcements: any[] }> {
  const res = await fetch('/api/announcements');
  if (!res.ok) throw new Error('Error fetching announcements');
  return res.json();
}

export async function apiGetEvents(): Promise<{ events: any[] }> {
  const res = await fetch('/api/events');
  if (!res.ok) throw new Error('Error fetching events');
  return res.json();
}

export async function apiGetLibraryResources(): Promise<{ resources: any[] }> {
  const res = await fetch('/api/library/resources');
  if (!res.ok) throw new Error('Error fetching library resources');
  return res.json();
}

// Registration
export async function apiRegister(payload: {
  code: string;
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  escuela_profesional_id?: number;
}): Promise<LoginResponse> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Register failed');
  }
  return res.json();
}

export async function apiRegisterEvent(eventId: number, code: string): Promise<{ ok: boolean }> {
  const res = await fetch(`/api/events/${eventId}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) throw new Error('Error registering to event');
  return res.json();
}

export async function apiPayPayment(code: string, paymentId: number): Promise<any> {
  const res = await fetch(`/api/student/${encodeURIComponent(code)}/payments/${paymentId}/pay`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Error making payment');
  return res.json();
}

export async function apiDownloadResource(resourceId: number): Promise<any> {
  const res = await fetch(`/api/library/resources/${resourceId}/download`, { method: 'POST' });
  if (!res.ok) throw new Error('Error downloading resource');
  return res.json();
}

// Community & Profiles
export async function apiGetProfile(code: string) {
  const res = await fetch(`/api/profile/${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error('Perfil no encontrado');
  return res.json();
}

export async function apiUpdateProfile(code: string, payload: { avatar_url?: string; bio?: string; }) {
  const res = await fetch(`/api/profile/${encodeURIComponent(code)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error actualizando perfil');
  return res.json();
}

export async function apiGetCommunityPosts() {
  const res = await fetch('/api/community/posts');
  if (!res.ok) throw new Error('Error obteniendo posts');
  return res.json();
}

export async function apiCreateCommunityPost(code: string, content: string) {
  const res = await fetch('/api/community/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, content })
  });
  if (!res.ok) throw new Error('Error creando post');
  return res.json();
}

export async function apiLikeCommunityPost(code: string, postId: number) {
  const res = await fetch(`/api/community/posts/${postId}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  if (!res.ok) throw new Error('Error al dar like');
  return res.json();
}

export async function apiGetComments(postId: number) {
  const res = await fetch(`/api/community/posts/${postId}/comments`);
  if (!res.ok) throw new Error('Error comentarios');
  return res.json();
}

export async function apiAddComment(postId: number, code: string, content: string) {
  const res = await fetch(`/api/community/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, content })
  });
  if (!res.ok) throw new Error('Error comentar');
  return res.json();
}

export async function apiSendFriendRequest(fromCode: string, toCode: string) {
  const res = await fetch('/api/friends/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fromCode, toCode })
  });
  if (!res.ok) throw new Error('Error al enviar solicitud');
  return res.json();
}

// Groups
export async function apiCreateGroup(name: string, code: string) {
  const res = await fetch('/api/groups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, code })
  });
  if (!res.ok) throw new Error('Error creando grupo');
  return res.json();
}

export async function apiJoinGroup(groupId: number, code: string) {
  const res = await fetch(`/api/groups/${groupId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  if (!res.ok) throw new Error('Error al unirse al grupo');
  return res.json();
}

export async function apiGetGroupMessages(groupId: number) {
  const res = await fetch(`/api/groups/${groupId}/messages`);
  if (!res.ok) throw new Error('Error mensajes de grupo');
  return res.json();
}

export async function apiSendGroupMessage(groupId: number, code: string, content: string) {
  const res = await fetch(`/api/groups/${groupId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, content })
  });
  if (!res.ok) throw new Error('Error enviando mensaje');
  return res.json();
}

export async function apiSendAgentMessageToGroup(groupId: number, code: string, message: string) {
  const res = await fetch(`/api/groups/${groupId}/agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, message })
  });
  if (!res.ok) throw new Error('Error agente');
  return res.json();
}

// Legacy functions (keeping for compatibility)
export async function apiGroupMessages(groupId: number) {
  return apiGetGroupMessages(groupId);
}

export async function apiSendGroupMessageLegacy(groupId: number, content: string, code?: string) {
  if (!code) throw new Error('Code is required');
  return apiSendGroupMessage(groupId, code, content);
}

export async function apiAgentToGroup(groupId: number, message: string) {
  const res = await fetch(`/api/groups/${groupId}/agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  if (!res.ok) throw new Error('Error agente');
  return res.json();
}


