# Guía de Autenticación Rol-Basada (Role-Based Authentication)

## 📋 Descripción General

El sistema implementa autenticación separada para **Estudiantes** y **Profesores**, con credenciales distintas y vistas completamente diferentes después del login.

---

## 🔐 Credenciales de Prueba

### Para Estudiantes
- **Código**: `202015001`
- **Contraseña**: `password`
- **Destino tras login**: `/dashboard` (Panel de estudiante)

### Para Profesores
- **Código**: `PROF001`
- **Contraseña**: `profesor123`
- **Destino tras login**: `/teacher` (Panel de profesor)

---

## 🏗️ Arquitectura de Autenticación

### 1. **AuthContext** (`src/contexts/AuthContext.tsx`)
Gestiona todo el sistema de autenticación con tipos de usuario diferenciados:

```typescript
export type UserRole = 'student' | 'teacher';

interface Student {
  id, name, code, grade, compentencies, email, phone
}

interface Teacher {
  id, name, code, email, phone, department, courses[]
}

interface AuthContextType {
  student: Student | null;
  teacher: Teacher | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  login: (code: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  // ... otros métodos
}
```

**Estado guardado en localStorage**:
- Cuando se cierra la sesión y se vuelve a abrir, el usuario permanece autenticado
- Se guarda solo el `userRole` para identificar qué tipo de usuario es

---

### 2. **LoginForm Actualizado** (`src/components/auth/LoginForm.tsx`)

Ahora incluye un selector de rol (radio buttons):

```
┌─────────────────────────────────────┐
│     Iniciar Sesión - Zadkiel       │
│  Colegio Angelitos de Dios          │
├─────────────────────────────────────┤
│ ◉ Estudiante  ○ Profesor            │
├─────────────────────────────────────┤
│ Código: [202015001          ]       │
│ Contraseña: [***]                  │
├─────────────────────────────────────┤
│       Demo Estudiante:              │
│       Código: 202015001             │
│       Contraseña: password          │
├─────────────────────────────────────┤
│            [ Ingresar ]             │
└─────────────────────────────────────┘
```

**Características**:
- Selector de rol con radio buttons
- Placeholder dinámico según rol seleccionado
- Credenciales de demo mostradas en tiempo real
- Validación de credenciales por rol

---

### 3. **AppNew.tsx** - Protección de Rutas (`src/AppNew.tsx`)

Implementa dos componentes para proteger rutas:

```typescript
// Solo estudiantes autenticados
<ProtectedStudentRoute>
  <YourComponent />
</ProtectedStudentRoute>

// Solo profesores autenticados
<ProtectedTeacherRoute>
  <YourComponent />
</ProtectedTeacherRoute>
```

**Rutas protegidas**:

| Ruta | Acceso | Destino |
|------|--------|---------|
| `/dashboard` | Solo Estudiantes | Panel del estudiante |
| `/teacher` | Solo Profesores | Panel de profesor |
| `/` | Todos | Página de inicio |
| `/login` | No autenticados | Formulario de login |

---

### 4. **HomePage.tsx** - Navegación Rol-Basada (`src/pages/HomePage.tsx`)

Muestra botones diferentes según el rol:

```
ESTUDIANTE AUTENTICADO:
[📚 Dashboard Estudiante] [🚪 Cerrar Sesión]

PROFESOR AUTENTICADO:
[👥 Panel Profesor] [🚪 Cerrar Sesión]

NO AUTENTICADO:
[Sección de Llamada a la Acción (CTA)]
```

---

## 🔄 Flujo de Autenticación

### 1. Acceso a Página de Login

```
Usuario → / → HomePage
         → [Ir a Login] → /login → LoginForm
```

### 2. Selección de Rol y Credenciales

```
LoginForm
├─ Selecciona rol (Estudiante/Profesor)
├─ Ingresa código
├─ Ingresa contraseña
└─ Presiona "Ingresar"
```

### 3. Validación de Credenciales

```
login(code, password, role)
├─ Si role === 'student':
│  ├─ Intenta API (apiLogin)
│  └─ Si falla: fallback con mock (202015001/password)
├─ Si role === 'teacher':
│  └─ Valida contra mock (PROF001/profesor123)
└─ Retorna: boolean
```

### 4. Redirección Post-Login

```
✅ Login exitoso + role='student'  → /dashboard
✅ Login exitoso + role='teacher'  → /teacher
❌ Credenciales inválidas          → Mostrar error
```

### 5. Persistencia de Sesión

```
Session Login
    ↓
Guardar en localStorage
    ↓
Cerrar navegador
    ↓
Reabrir app → useEffect en AuthContext
    ↓
Restaurar sesión automáticamente
```

---

## 🛡️ Protección de Rutas

### Estudiante intenta acceder a `/teacher`:
```
ProtectedTeacherRoute
├─ Verifica: isAuthenticated && userRole === 'teacher'
├─ ❌ No cumple
└─ Redirige a → /login
```

### Profesor accede a `/teacher`:
```
ProtectedTeacherRoute
├─ Verifica: isAuthenticated && userRole === 'teacher'
├─ ✅ Cumple
└─ Renderiza → TeacherPage
```

---

## 🔌 Integración API

### Estudiantes (API real)
```typescript
// En AuthContext.tsx - login function
const { student: apiStudent } = await apiLogin(code, password);
// Envía credenciales a backend
// Backend valida contra base de datos
```

### Profesores (Mock por ahora)
```typescript
// Validación local
if (code === 'PROF001' && password === 'profesor123') {
  setTeacher(mockTeacher);
  // En producción: integrar con API de profesores
}
```

---

## 📝 Cambios Realizados

### Archivos Modificados:

1. **`src/contexts/AuthContext.tsx`**
   - ✅ Agregado tipo `UserRole` ('student' | 'teacher')
   - ✅ Agregada interfaz `Teacher`
   - ✅ Separados estados `student` y `teacher`
   - ✅ Parámetro `role` en método `login`
   - ✅ Lógica de validación por rol
   - ✅ Mock data para profesor

2. **`src/components/auth/LoginForm.tsx`**
   - ✅ Radio buttons para seleccionar rol
   - ✅ Placeholder dinámico según rol
   - ✅ Credenciales de demo mostradas
   - ✅ Estado de carga (loading)
   - ✅ Redirección diferenciada

3. **`src/AppNew.tsx`**
   - ✅ Componente `ProtectedStudentRoute`
   - ✅ Componente `ProtectedTeacherRoute`
   - ✅ Protección de ruta `/dashboard`
   - ✅ Protección de ruta `/teacher`

4. **`src/pages/HomePage.tsx`**
   - ✅ Mostrar botones según `userRole`
   - ✅ Botón de "Cerrar Sesión"
   - ✅ Condición: si autenticado → mostrar role-panel, si no → CTA

5. **`src/hooks/useAuth.ts`**
   - ✅ Re-export del contexto (compatibilidad)

---

## 🎯 Próximos Pasos (TODO)

1. **Backend API de Profesores**
   ```typescript
   // POST /api/auth/login/teacher
   // { code, password }
   // Response: { teacher: {...}, token }
   ```

2. **Persistencia de Token**
   ```typescript
   // Guardar JWT en localStorage
   // Enviar en headers: Authorization: Bearer <token>
   ```

3. **Roles Adicionales** (si es necesario)
   ```typescript
   type UserRole = 'student' | 'teacher' | 'admin' | 'parent';
   ```

4. **Recuperación de Contraseña**
   - Flujo de reset para estudiantes
   - Flujo de reset para profesores

5. **Multi-dispositivo**
   - Invalidar sesión en otros dispositivos
   - Limitaciones de sesión simultaneas

---

## 🧪 Pruebas

### Caso 1: Login Estudiante Correcto
```
1. Seleccionar "Estudiante"
2. Código: 202015001
3. Contraseña: password
4. Resultado: ✅ Redirige a /dashboard
```

### Caso 2: Login Profesor Correcto
```
1. Seleccionar "Profesor"
2. Código: PROF001
3. Contraseña: profesor123
4. Resultado: ✅ Redirige a /teacher
```

### Caso 3: Credenciales Inválidas
```
1. Seleccionar rol
2. Ingresar credenciales incorrectas
3. Resultado: ❌ Muestra error, sin redirección
```

### Caso 4: Acceso a Ruta Protegida sin Auth
```
1. URL directa: /teacher
2. Sin estar autenticado
3. Resultado: ❌ Redirige a /login
```

### Caso 5: Persistencia de Sesión
```
1. Login como estudiante
2. Cerrar navegador
3. Reabrir navegador
4. Resultado: ✅ Sesión restaurada, en /dashboard
```

---

## 📚 Archivos Clave

```
src/
├── contexts/
│   └── AuthContext.tsx          ← Lógica principal
├── components/
│   └── auth/
│       └── LoginForm.tsx        ← Interfaz login
├── hooks/
│   └── useAuth.ts              ← Re-export
├── pages/
│   ├── HomePage.tsx            ← Botones rol-basados
│   └── TeacherPage.tsx         ← Panel profesor
├── AppNew.tsx                  ← Rutas protegidas
└── main.tsx                    ← Punto de entrada (ImportaAppNew)
```

---

## ✅ Checklist de Implementación

- ✅ Tipos User (Student | Teacher) definidos
- ✅ AuthContext extendido con roles
- ✅ LoginForm con selector de rol
- ✅ Validación por rol
- ✅ Rutas protegidas por rol
- ✅ Redirección post-login diferenciada
- ✅ HomePage con botones rol-específicos
- ✅ Persistencia de sesión
- ⏳ API Backend integrada (en progreso)
- ⏳ Recuperación de contraseña
- ⏳ Dashboard profesor funcional (existente pero sin datos reales)

---

## 🐛 Troubleshooting

### "Error: useAuth must be used within an AuthProvider"
- ✅ Verificar que `AppNew.tsx` envuelve la app con `<AuthProvider>`

### Usuario no persiste tras recargar
- ✅ Verificar localStorage: `localStorage.getItem('auth')`
- ✅ Check browser DevTools → Application → localStorage

### Ruta protegida no redirige a login
- ✅ Verificar que `ProtectedRoute` está siendo usado
- ✅ Verificar que `isReady` es `true` antes de renderizar

### LoginForm no cambia placeholder
- ✅ Verificar que `onChange` actualiza estado `role`
- ✅ Verificar que placeholder tiene lógica: `role === 'student' ? ... : ...`

---

## 📞 Soporte

Para dudas o errores:
1. Revisar console del navegador (F12 → Console)
2. Revisar localStorage (F12 → Application)
3. Verificar que estés en la rama correcta
4. Revisar que AppNew.tsx esté siendo usado (main.tsx)

---

**Última Actualización**: Febrero 2026  
**Estado**: ✅ Sistema de Autenticación Rol-Basada Implementado y Funcional
