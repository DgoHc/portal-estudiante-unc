# 🪟 GUÍA PARA WINDOWS - SETUP DE BD Y LOGIN

## ⚡ RESUMEN RÁPIDO (5 minutos)

Si ya tienes PostgreSQL instalado, ejecuta esto en PowerShell (en la raíz del proyecto):

```powershell
# 1. Crear BD
psql -U postgres -c "CREATE DATABASE portal_estudiante_unc;"

# 2. Cargar datos
psql -U postgres -d portal_estudiante_unc -f database\setup_auth.sql

# 3. Crear .env
copy backend\.env.example backend\.env

# 4. Editar .env (reemplaza TU_CONTRASEÑA)
# Luego instala y ejecuta:
cd backend
npm install
npx prisma generate
npm run test-db
npm run dev
```

---

## 📦 INSTALACIÓN COMPLETA DE POSTGRESQL (Si no lo tienes)

### Descargar PostgreSQL
1. Ve a: https://www.postgresql.org/download/windows/
2. Descarga **PostgreSQL 15** o superior
3. Ejecuta el instalador
4. **IMPORTANTE**: Recuerda la contraseña que ingreses para el usuario `postgres`

### Verificar instalación
Abre PowerShell y ejecuta:
```powershell
psql --version
```

Deberías ver algo como: `psql (PostgreSQL) 15.x`

---

## 🔧 CONFIGURACIÓN PASO A PASO EN WINDOWS

### PASO 1: Crear la Base de Datos

Abre PowerShell (puedes usar `Win + R` y escribir `powershell`)

```powershell
# Conectarse a PostgreSQL
psql -U postgres
```

Se te pedirá la contraseña (la que usaste en la instalación)

Una vez adentro, verás algo como:
```
postgres=#
```

Ahora ejecuta:
```sql
CREATE DATABASE portal_estudiante_unc;
```

Deberías ver:
```
CREATE DATABASE
```

Luego escribe:
```sql
\q
```

Esto cierra la conexión.

---

### PASO 2: Cargar el Script SQL

Aún en PowerShell, navega a la carpeta del proyecto:

```powershell
# Si no estás en la carpeta del proyecto, navega:
cd C:\Users\DIEGO\EstudiantesPla\ZahkielAP
```

Ahora ejecuta:
```powershell
psql -U postgres -d portal_estudiante_unc -f database\setup_auth.sql
```

Ingresa la contraseña de PostgreSQL

Deberías ver al final:
```
Setup completado!
 mensaje
─────────────────────
Setup completado!

(1 row)

 total_usuarios
─────────────────
              3
(1 row)
```

---

### PASO 3: Crear el Archivo .env

En PowerShell:

```powershell
copy backend\.env.example backend\.env
```

Luego abre el archivo `backend\.env` con un editor de texto (Notepad, VSCode, etc.)

Busca esta línea:
```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/portal_estudiante_unc"
```

Y cámbiala a:
```
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA_AQUI@localhost:5432/portal_estudiante_unc"
```

Reemplaza `TU_CONTRASEÑA_AQUI` con la contraseña que usaste en PostgreSQL.

Guarda el archivo.

---

### PASO 4: Instalar Dependencias

En PowerShell:

```powershell
cd backend
npm install
npx prisma generate
cd ..
```

Esto tardará unos minutos. Espera a que termine.

---

### PASO 5: Verificar la Conexión a BD

En PowerShell:

```powershell
cd backend
npm run test-db
cd ..
```

Deberías ver:

```
🔍 Iniciando pruebas de conexión...

1️⃣  Conectando a la base de datos...
   ✅ Conexión exitosa

2️⃣  Verificando usuarios en la BD...
   ✅ Total de usuarios: 3

3️⃣  Listando usuarios:
   - admin@zahkiel.com (admin) - Admin Zahkiel
   - teacher@zahkiel.com (teacher) - Juan Profesor
   - student@zahkiel.com (student) - Diego Estudiante

4️⃣  Probando autenticación...
   ✅ Usuario encontrado: admin@zahkiel.com
   ✅ Contraseña correcta

...

╔════════════════════════════════════════╗
║  ✅ TODOS LOS TESTS PASARON!          ║
║  La base de datos está lista           ║
╚════════════════════════════════════════╝
```

Si ves esto, **¡PERFECTO!** La BD está lista.

---

### PASO 6: Iniciar el Servidor

En PowerShell:

```powershell
cd backend
npm run dev
```

Deberías ver:

```
╔════════════════════════════════════════╗
║   🚀 Servidor Zahkiel iniciado        ║
║   Puerto: 5000                         ║
║   Ambiente: development                ║
╚════════════════════════════════════════╝
```

¡El servidor está corriendo! No cierres esta ventana.

---

## 🧪 PROBAR EL LOGIN

Abre **OTRA ventana de PowerShell** (sin cerrar la del servidor)

```powershell
$body = @{
    email = "admin@zahkiel.com"
    password = "123456"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body

$response.Content | ConvertFrom-Json | ConvertTo-Json
```

Deberías ver algo como:

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

**¡ÉXITO!** El login funciona perfectamente.

---

## 🔑 CREDENCIALES DE PRUEBA

Puedes probar con cualquiera de estas:

```powershell
# Profesor
$body = @{
    email = "teacher@zahkiel.com"
    password = "123456"
} | ConvertTo-Json

# Estudiante
$body = @{
    email = "student@zahkiel.com"
    password = "123456"
} | ConvertTo-Json
```

---

## 🛠️ HERRAMIENTAS ÚTILES PARA WINDOWS

### Ver todas las bases de datos
```powershell
psql -U postgres -l
```

### Ver todos los usuarios en la BD
```powershell
psql -U postgres -d portal_estudiante_unc -c "SELECT email, role, \"firstName\" FROM \"User\";"
```

### Limpiar todo y empezar de nuevo
```powershell
# Eliminar BD
psql -U postgres -c "DROP DATABASE IF EXISTS portal_estudiante_unc;"

# Crear de nuevo
psql -U postgres -c "CREATE DATABASE portal_estudiante_unc;"

# Cargar datos
psql -U postgres -d portal_estudiante_unc -f database\setup_auth.sql
```

---

## ⚠️ ERRORES COMUNES EN WINDOWS

### Error: "psql no se reconoce"
PostgreSQL no está en el PATH. Dos soluciones:

**Opción 1**: Agregar a PATH
```powershell
# Ejecuta esto una sola vez
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\Program Files\PostgreSQL\15\bin", "User")

# Cierra y reabre PowerShell
```

**Opción 2**: Usar la ruta completa
```powershell
C:\Program Files\PostgreSQL\15\bin\psql -U postgres
```

### Error: "password authentication failed"
La contraseña es incorrecta. Intenta con la que pusiste en la instalación.

Si la olvidaste, puedes resetearla (requiere acceso de administrador):
```powershell
# Abre PowerShell como Administrador
"password" | pg_ctl reload -D "C:\Program Files\PostgreSQL\15\data"
```

### Error: "port 5432 in use"
Otro servicio está usando el puerto 5432. Soluciona con:

```powershell
# Encuentra qué está usando el puerto
Get-Process -Id (Get-NetTCPConnection -LocalPort 5432).OwningProcess

# O reinicia PostgreSQL
Restart-Service postgresql-x64-15
```

### Error: "Error: connect ECONNREFUSED"
PostgreSQL no está corriendo. Inicia el servicio:

```powershell
# En PowerShell como Administrador
Start-Service postgresql-x64-15

# Verifica que esté corriendo
Get-Service postgresql-x64-15
```

---

## 📚 ARCHIVOS DE REFERENCIA

- `AUTH_SETUP_GUIDE.md` - Guía detallada (cualquier SO)
- `QUICK_AUTH_SETUP.md` - Resumen rápido
- `DATABASE_CHECKLIST.md` - Checklist visual
- `database\setup_auth.sql` - Script de creación

---

## ✅ CONFIRMACIÓN FINAL

Si llegaste aquí y todo funciona, tienes:

✅ PostgreSQL instalado
✅ Base de datos creada
✅ Tablas creadas
✅ 3 usuarios de prueba cargados
✅ Servidor corriendo en puerto 5000
✅ Login funcionando

**¡Ahora puedes conectar el frontend con confianza!**

---

**Última actualización**: Febrero 2026
**Compatibilidad**: Windows 10/11
**Estado**: ✅ Listo
