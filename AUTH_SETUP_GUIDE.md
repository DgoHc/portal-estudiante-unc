# 🔐 GUÍA DE SETUP DE AUTENTICACIÓN Y BASE DE DATOS

## ⚡ Inicio Rápido

### Paso 1: Instalar PostgreSQL
Si aún no tienes PostgreSQL instalado:
- **Windows**: Descarga desde https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### Paso 2: Crear la Base de Datos
```bash
# Conectarse a PostgreSQL (usuario por defecto: postgres)
psql -U postgres

# Crear la base de datos
CREATE DATABASE portal_estudiante_unc;

# Salir
\q
```

### Paso 3: Ejecutar el Script SQL de Setup
```bash
# Desde la terminal en Windows
psql -U postgres -d portal_estudiante_unc -f database\setup_auth.sql

# En Mac/Linux
psql -U postgres -d portal_estudiante_unc -f database/setup_auth.sql
```

### Paso 4: Configurar Variables de Entorno
Copiar el archivo `.env.example` a `.env`:
```bash
# Windows
copy backend\.env.example backend\.env

# Mac/Linux
cp backend/.env.example backend/.env
```

Editar `backend/.env` y actualizar:
```
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/portal_estudiante_unc"
JWT_SECRET="tu_jwt_secret_super_seguro_aqui_cambiar_en_produccion"
JWT_REFRESH_SECRET="tu_jwt_refresh_secret_super_seguro_aqui_cambiar_en_produccion"
```

### Paso 5: Instalar Dependencias y Ejecutar Migraciones
```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Ejecutar migraciones de Prisma
npx prisma migrate deploy

# O si es la primera vez:
npx prisma migrate dev --name init

# Generar cliente de Prisma
npx prisma generate
```

### Paso 6: Iniciar el Servidor
```bash
# En modo desarrollo
npm run dev

# En modo producción
npm run build
npm start
```

---

## 🔑 Credenciales de Prueba

Con el script `setup_auth.sql`, tienes estos usuarios disponibles para login:

### Admin
- **Email**: `admin@zahkiel.com`
- **Contraseña**: `123456`
- **Rol**: admin

### Profesor
- **Email**: `teacher@zahkiel.com`
- **Contraseña**: `123456`
- **Rol**: teacher

### Estudiante
- **Email**: `student@zahkiel.com`
- **Contraseña**: `123456`
- **Rol**: student

---

## 🧪 Probar el Login en Postman/Curl

### Request POST
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@zahkiel.com",
  "password": "123456"
}
```

### Response esperado:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "role": "admin",
    "firstName": "Admin",
    "lastName": "Zahkiel"
  }
}
```

---

## 🔧 Verificar Estado de la Base de Datos

```bash
# Conectarse a PostgreSQL
psql -U postgres -d portal_estudiante_unc

# Ver todas las tablas
\dt

# Ver usuarios creados
SELECT id, email, role, "firstName", "lastName", active FROM "User";

# Ver estudiantes
SELECT * FROM "Student";

# Ver profesores
SELECT * FROM "Teacher";

# Salir
\q
```

---

## ⚠️ Problemas Comunes

### Error: "password authentication failed"
- Verifica que la contraseña en `DATABASE_URL` sea correcta
- Intenta con el usuario `postgres` y su contraseña

### Error: "database portal_estudiante_unc does not exist"
- Ejecuta `CREATE DATABASE portal_estudiante_unc;` en psql

### Error: "relation "User" does not exist"
- Asegúrate de haber ejecutado el script `setup_auth.sql`
- Verifica que estés en la base de datos correcta con `\c portal_estudiante_unc`

### Error: "Credenciales inválidas" en login
- Verifica que el usuario exista: `SELECT * FROM "User" WHERE email = 'admin@zahkiel.com';`
- Revisa que el hash de la contraseña sea correcto

### Error en Prisma: "Prisma Client could not find the "@prisma/client" package"
```bash
cd backend
npm install
npx prisma generate
```

---

## 🔄 Regenerar la Base de Datos (Reset completo)

Si necesitas limpiar todo y empezar de nuevo:

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Eliminar base de datos
DROP DATABASE IF EXISTS portal_estudiante_unc;

# Crear nueva base de datos
CREATE DATABASE portal_estudiante_unc;

# Salir y ejecutar el script de setup
\q

psql -U postgres -d portal_estudiante_unc -f database/setup_auth.sql
```

---

## 📚 Estructura de Autenticación

El sistema usa:
- **bcryptjs**: Para hashear contraseñas
- **JWT**: Para generar tokens de acceso (1 hora) y refresh (7 días)
- **Prisma ORM**: Para acceder a la base de datos PostgreSQL

El controller de autenticación se encuentra en:
- `backend/src/controllers/auth.controller.ts`

---

## 🚀 Próximos Pasos

1. Cambiar las contraseñas de los usuarios de prueba
2. Generar nuevos JWT_SECRET y JWT_REFRESH_SECRET
3. Conectar el frontend con el backend
4. Implementar protección de rutas autenticadas

---

**Última actualización**: Febrero 2026
**Estado**: ✅ Lista para usar
