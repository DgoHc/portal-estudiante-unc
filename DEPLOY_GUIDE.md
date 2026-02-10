# 🚀 GUÍA DE DEPLOY A PRODUCCIÓN - ZAHKIEL

## ✅ OPCIÓN 1: DEPLOY EN RAILWAY (Recomendado - Todo Integrado)

Railway es la opción más fácil: soporta BD, Backend y Frontend en un mismo lugar.

### Paso 1: Instalar Railway CLI

```powershell
# Windows
npm install -g @railway/cli

# Mac/Linux
npm install -g @railway/cli
```

### Paso 2: Login a Railway

```powershell
railway login
```

Se abrirá el navegador. Inicia sesión con GitHub o email.

### Paso 3: Crear Proyecto

```powershell
cd c:\Users\DIEGO\EstudiantesPla\ZahkielAP
railway init
```

Sigue las instrucciones. Elige:
- Nombre del proyecto: `zahkiel-portal`
- Región: `us-west` o la más cercana

### Paso 4: Agregar Base de Datos PostgreSQL

```powershell
railway add
```

Selecciona `PostgreSQL` de la lista.

### Paso 5: Configurar Variables de Entorno

```powershell
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=tu_secret_super_largo_aqui_minimo_32_caracteres
railway variables set JWT_REFRESH_SECRET=tu_refresh_secret_super_largo_aqui_minimo_32_caracteres
railway variables set PORT=5000
```

Para obtener la URL de la BD:
```powershell
railway status
```

Verás algo como: `postgresql://usuario:contraseña@railway-host:5432/dbname`

Configura:
```powershell
railway variables set DATABASE_URL=postgresql://usuario:contraseña@railway-host:5432/dbname
```

### Paso 6: Deploy Backend

```powershell
railway up
```

Esto deployará el backend automáticamente.

### Paso 7: Ejecutar Migraciones de BD

```powershell
railway run npm run migrate
```

O si es la primera vez:
```powershell
railway run npx prisma migrate dev --name init
```

### Paso 8: Deploy Frontend (Netlify)

```powershell
# Navega a Netlify: https://netlify.com
# Conecta tu GitHub
# Selecciona el repo: portal-estudiante-unc
# Build command: npm run build
# Publish directory: dist
```

---

## ✅ OPCIÓN 2: DEPLOY CON DOCKER-COMPOSE (Local o VPS)

Si tienes un servidor Linux con Docker:

```bash
# En tu servidor
git clone https://github.com/DgoHc/portal-estudiante-unc.git
cd portal-estudiante-unc

# Crear archivo .env
cat > .env << EOF
NODE_ENV=production
JWT_SECRET=tu_secret_aqui
JWT_REFRESH_SECRET=tu_refresh_secret_aqui
DB_PASSWORD=contraseña_fuerte_para_postgres
REDIS_PASSWORD=contraseña_fuerte_para_redis
EOF

# Iniciar servicios
docker-compose up -d
```

---

## 🌐 URLS DE APLICACIÓN

Después del deploy tendrás:

```
Frontend:  https://zahkiel-portal.netlify.app
Backend:   https://zahkiel-portal.up.railway.app
BD:        postgresql://user:pass@railway.db/zahkiel
```

---

## 🔐 VARIABLES DE ENTORNO (PRODUCCIÓN)

Asegúrate de configurar estas en tu plataforma de deployment:

```
NODE_ENV=production
PORT=5000
JWT_SECRET={genera uno aleatorio largo}
JWT_REFRESH_SECRET={genera otro aleatorio largo}
DATABASE_URL=postgresql://user:pass@host:5432/zahkiel
FRONTEND_URL=https://zahkiel-portal.netlify.app
```

---

## ✅ VERIFICACIÓN POST-DEPLOY

Una vez deployado, verifica:

### 1. Health Check
```
GET https://zahkiel-portal.up.railway.app/health
```

Deberías recibir:
```json
{"status":"OK","timestamp":"2026-02-10T..."}
```

### 2. Login Test
```
POST https://zahkiel-portal.up.railway.app/api/auth/login
Content-Type: application/json

{
  "email": "admin@zahkiel.com",
  "password": "123456"
}
```

Deberías recibir un token JWT.

### 3. Base de Datos
```
GET https://zahkiel-portal.up.railway.app/api/dashboard
Authorization: Bearer {token}
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "No DATABASE_URL"
Asegúrate de configurar la variable de entorno en Railway dashboard.

### Error: "Migraciones fallidas"
```powershell
railway run npx prisma migrate reset --force
railway run npx prisma migrate dev --name init
```

### Error: "Port already in use"
Cambia en railway.toml:
```
PORT=8080
```

### Error: "npm ERR! code ENOENT"
```powershell
railway run npm install
railway run npm run build
```

---

## 📊 MONITOREO

Railway tiene dashboard integrado:
1. Ve a https://railway.app
2. Selecciona tu proyecto
3. Ver logs en tiempo real
4. Monitoreo de CPU y memoria

---

## 🔄 ACTUALIZACIONES

Para actualizar después de cambios:

```powershell
git add .
git commit -m "feat: cambios"
git push origin main

# Railway se actualizará automáticamente
# Si no, ejecuta:
railway up
```

---

## 💰 COSTOS ESTIMADOS

**Railway:**
- Primeros $5 USD gratis cada mes
- PostgreSQL: ~$1-5 USD/mes
- Backend: ~$0-3 USD/mes

**Netlify:**
- Gratis para sitios estáticos

**Total mensual:** $5-10 USD

---

Última actualización: Febrero 2026
