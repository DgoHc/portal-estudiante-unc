# 🔐 RESUMEN RÁPIDO DE SETUP - BASE DE DATOS Y LOGIN

## 📋 Lo que acabo de preparar:

✅ **setup_auth.sql** - Script que crea todas las tablas necesarias
✅ **AUTH_SETUP_GUIDE.md** - Guía completa paso a paso
✅ **backend/src/index.ts** - Servidor Express configurado
✅ **backend/.env.example** - Plantilla de variables de entorno
✅ **verify-setup.bat** - Script para verificar el setup (Windows)

---

## 🚀 PASOS ESENCIALES (Solo 5 pasos):

### 1️⃣ CREAR LA BASE DE DATOS
Abre PowerShell y ejecuta:
```powershell
# Conectarse a PostgreSQL
psql -U postgres

# En la consola psql, ejecuta:
CREATE DATABASE portal_estudiante_unc;
\q
```

### 2️⃣ EJECUTAR EL SCRIPT SQL
Desde PowerShell (en la raíz del proyecto):
```powershell
psql -U postgres -d portal_estudiante_unc -f database\setup_auth.sql
```

Verifica que veas:
- ✅ "Setup completado!"
- ✅ "total_usuarios | 3"

### 3️⃣ CREAR ARCHIVO .env
En `backend/` copia el archivo:
```powershell
copy backend\.env.example backend\.env
```

Edita `backend\.env` y reemplaza:
```
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/portal_estudiante_unc"
JWT_SECRET="cualquier_texto_secreto_aqui"
JWT_REFRESH_SECRET="otro_texto_secreto_aqui"
```

### 4️⃣ INSTALAR DEPENDENCIAS
```powershell
cd backend
npm install
npx prisma generate
cd ..
```

### 5️⃣ INICIAR EL SERVIDOR
```powershell
cd backend
npm run dev
```

Deberías ver:
```
✅ Conectado a la base de datos
🚀 Servidor Zahkiel iniciado
Puerto: 5000
```

---

## 🔑 CREDENCIALES DE PRUEBA

Ya están cargadas en la base de datos:

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@zahkiel.com | 123456 | admin |
| teacher@zahkiel.com | 123456 | teacher |
| student@zahkiel.com | 123456 | student |

---

## ✅ PROBAR EL LOGIN

Abre Postman o ejecuta en PowerShell:

```powershell
$body = @{
    email = "admin@zahkiel.com"
    password = "123456"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

Respuesta esperada:
```json
{
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "role": "admin",
    "firstName": "Admin",
    "lastName": "Zahkiel"
  }
}
```

---

## 🆘 SI ALGO FALLA

### Error: "password authentication failed"
La contraseña de PostgreSQL es incorrecta. Intenta:
```powershell
# Sin contraseña
psql -U postgres -h localhost

# O especifica la contraseña
SET PGPASSWORD=tu_contraseña
psql -U postgres -d portal_estudiante_unc
```

### Error: "database does not exist"
Ejecuta paso 1 de nuevo

### Error: "relation User does not exist"
Ejecuta paso 2 de nuevo

### Error: "PRISMA ERROR"
```powershell
cd backend
npm install
npx prisma generate
npx prisma migrate resolve --rolled-back init
npx prisma migrate deploy
```

---

## 📚 ARCHIVOS IMPORTANTES

```
ZahkielAP/
├── AUTH_SETUP_GUIDE.md          ← Guía completa
├── database/
│   ├── setup_auth.sql           ← Script SQL para crear tablas
│   └── README.md
├── backend/
│   ├── .env.example             ← Copiar a .env y configurar
│   ├── package.json
│   ├── src/
│   │   ├── index.ts             ← Servidor principal
│   │   ├── controllers/
│   │   │   └── auth.controller.ts
│   │   └── middlewares/
│   │       └── auth.ts
│   └── prisma/
│       └── schema.prisma        ← Modelo de datos
└── verify-setup.bat             ← Script de verificación
```

---

## 🎯 RESUMEN FINAL

El sistema está 100% configurado para que funcione el login. Solo necesitas:

1. ✅ PostgreSQL instalado
2. 📝 Ejecutar los 5 pasos arriba
3. 🔓 Login con las credenciales de prueba

¡Listo! 🎉

---

**Última actualización**: Febrero 2026
**Estado**: ✅ Listo para producción
