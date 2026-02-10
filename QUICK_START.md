# 🎓 GUÍA RÁPIDA - ACCESO AL SISTEMA

## 👥 Dos Tipos de Usuarios

### 🎓 ESTUDIANTE
```
📍 Acceso: http://localhost:5173/login
✅ Selecciona: Estudiante
📝 Código:       202015001
🔐 Contraseña:   password
📊 Destino:      /dashboard
```

**Verás**:
- Panel de estudiante
- Tu progreso
- Actividades
- Evaluaciones

---

### 👨‍🏫 PROFESOR
```
📍 Acceso: http://localhost:5173/login
✅ Selecciona: Profesor
📝 Código:       PROF001
🔐 Contraseña:   profesor123
👥 Destino:      /teacher
```

**Verás**:
- Listado de estudiantes
- Progreso individual
- Estadísticas
- Panel de control

---

## 🚀 PASOS PARA INGRESAR

### Paso 1️⃣
```
Abre: http://localhost:5173/login
```

### Paso 2️⃣
```
Selecciona tu rol:
◉ Estudiante  ○ Profesor
```

### Paso 3️⃣
```
Ingresa tus credenciales:
- Código
- Contraseña
```

### Paso 4️⃣
```
Presiona: [ Ingresar ]
```

### Paso 5️⃣ ✅
```
¡Listo! Estás autenticado
```

---

## 🔐 CREDENCIALES DISPONIBLES

| Rol | Código | Contraseña | Destino |
|-----|--------|-----------|---------|
| 🎓 Estudiante | `202015001` | `password` | `/dashboard` |
| 👨‍🏫 Profesor | `PROF001` | `profesor123` | `/teacher` |

---

## ❓ PREGUNTAS FRECUENTES

### "¿Cuál selecciono?"
```
Si quieres:
- Ver estudiante:   ◉ Estudiante
- Ver profesores:   ○ Profesor
```

### "¿Mi sesión se guarda?"
```
✅ SÍ
- Se guarda en localStorage
- Persiste al cerrar navegador
- Se limpia solo al cerrar sesión
```

### "¿Cómo cierro sesión?"
```
HomePage → [🚪 Cerrar Sesión]
↓
Te devuelve a la página principal
↓
localStorage se vacía
```

### "¿Qué pasa si ingreso datos incorrectos?"
```
❌ Error: "Credenciales inválidas"
↓
Sin redirección
↓
Intenta de nuevo
```

### "¿Puedo acceder a /teacher como estudiante?"
```
❌ NO
↓
Serás redirigido a /login automáticamente
↓
El sistema protege las rutas por rol
```

---

## 📱 INTERFAZ DE LOGIN

```
┌─────────────────────────────────────┐
│                                     │
│   Iniciar Sesión - Zadkiel          │
│   Colegio Angelitos de Dios          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Selecciona tu rol:                  │
│  ◉ Estudiante    ○ Profesor         │
│                                     │
│  Código:                             │
│  [______________________]            │
│                                     │
│  Contraseña:                         │
│  [______________________]            │
│                                     │
│  Demo Profesor:                      │
│  • Código: PROF001                  │
│  • Contraseña: profesor123          │
│                                     │
│    [    Ingresar    ]               │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎯 FLUJOS TÍPICOS

### Flujo 1: Login Estudiante
```
http://localhost:5173/login
    ↓
◉ Estudiante
    ↓
202015001 / password
    ↓
[Ingresar]
    ↓
✅ http://localhost:5173/dashboard
```

### Flujo 2: Login Profesor
```
http://localhost:5173/login
    ↓
○ Profesor
    ↓
PROF001 / profesor123
    ↓
[Ingresar]
    ↓
✅ http://localhost:5173/teacher
```

### Flujo 3: Cerrar Sesión
```
En HomePage (autenticado)
    ↓
[🚪 Cerrar Sesión]
    ↓
✅ http://localhost:5173/ (limpio)
```

---

## 🛡️ SEGURIDAD

✅ **Rutas Protegidas**
- `/dashboard` → Solo estudiantes
- `/teacher` → Solo profesores
- `/` → Acceso público

✅ **Persistencia Segura**
- Datos en localStorage
- Validación en tiempo real
- Limpieza automática en logout

✅ **Validación de Credenciales**
- Por rol
- Mensajes de error claros
- Sin exponer información

---

## 📊 VISTAS POR ROL

### ESTUDIANTE verá:
```
/dashboard
├── Header (nombre, avatar)
├── Sidebar (navegación)
├── Dashboard
│   ├── Progreso general
│   ├── Actividades
│   ├── Evaluaciones
│   └── Recomendaciones
└── ChatWidget (soporte)
```

### PROFESOR verá:
```
/teacher
├── TeacherPage
│   ├── Dashboard
│   ├── Listado de Estudiantes
│   ├── Cursos
│   └── Reportes
├── Búsqueda y filtros
├── Panel de detalles de estudiante
└── Acciones (email, mensaje, reportes)
```

### NO AUTENTICADO verá:
```
/
├── Navbar público
├── Hero Section
├── Descripción
├── Características
├── Tecnologías
├── Equipo
├── Call To Action
│   └── [Ir a Iniciar Sesión]
└── Footer
```

---

## ⚡ ACCESO DIRECTO

### URL Rápidas:

**Login**
```
http://localhost:5173/login
```

**Dashboard (requiere autenticación como estudiante)**
```
http://localhost:5173/dashboard
```

**Panel Profesor (requiere autenticación como profesor)**
```
http://localhost:5173/teacher
```

**Inicio**
```
http://localhost:5173/
```

---

## 🆘 TROUBLESHOOTING

### "No puedo acceder a /dashboard"
```
✓ Verifica que estés logueado como estudiante
✓ Selecciona "Estudiante" en login
✓ Usa: 202015001 / password
```

### "Se me desconectó"
```
✓ Presionaste [Cerrar Sesión]
✓ O expiró la sesión
✓ Vuelve a http://localhost:5173/login
```

### "Veo error 'Credenciales inválidas'"
```
✓ Verifica el código exacto
✓ Verifica la contraseña exacta
✓ Selecciona el rol correcto
✓ Intenta de nuevo
```

### "¿Cómo restauro mi sesión?"
```
✓ Cierra el navegador
✓ Reabre la aplicación
✓ Automáticamente se restaura desde localStorage
✓ No necesitas re-ingresar tus datos
```

---

## 📞 REFERENCIAS

- **SYSTEM_STATUS.md** ← Estado técnico
- **AUTH_GUIDE.md** ← Guía detallada
- **IMPLEMENTATION_SUMMARY.md** ← Resumen de cambios

---

**Última Actualización**: Febrero 3, 2026  
**Sistema**: Autenticación Rol-Basada v1.0  
**Estado**: 🟢 FUNCIONAL Y LISTO

```
  ╔════════════════════════╗
  ║  ✅ LISTO PARA USAR   ║
  ╚════════════════════════╝
```
