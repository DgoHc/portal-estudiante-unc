# 🎯 INICIO RÁPIDO - BD Y LOGIN LISTOS

## ✅ Lo que ya está hecho:

- ✔️ Script SQL para crear tablas (`database/setup_auth.sql`)
- ✔️ Servidor Express configurado (`backend/src/index.ts`)
- ✔️ Controlador de autenticación (`backend/src/controllers/auth.controller.ts`)
- ✔️ Middleware JWT (`backend/src/middlewares/auth.ts`)
- ✔️ Script de pruebas (`backend/src/test-db.ts`)
- ✔️ Variables de entorno (`backend/.env.example`)
- ✔️ Documentación completa

---

## 🚀 AHORA TÚ DEBES HACER (5 PASOS):

### 1️⃣ PostgreSQL
Instala desde: https://www.postgresql.org/download/windows/

### 2️⃣ Crear BD
```powershell
psql -U postgres -c "CREATE DATABASE portal_estudiante_unc;"
```

### 3️⃣ Cargar datos
```powershell
psql -U postgres -d portal_estudiante_unc -f database\setup_auth.sql
```

### 4️⃣ Configurar .env
```powershell
copy backend\.env.example backend\.env
```

Edita `backend\.env` y reemplaza la contraseña de PostgreSQL.

### 5️⃣ Ejecutar
```powershell
cd backend
npm install
npx prisma generate
npm run dev
```

---

## 🔑 Usuarios de prueba:
- `admin@zahkiel.com` / `123456`
- `teacher@zahkiel.com` / `123456`
- `student@zahkiel.com` / `123456`

---

## 📖 Guías disponibles:
- **QUICK_AUTH_SETUP.md** - Guía rápida (5 minutos)
- **WINDOWS_SETUP.md** - Comandos PowerShell listos
- **AUTH_SETUP_GUIDE.md** - Guía completa y detallada

---

**¡Listo para iniciar sesión sin problemas!**
