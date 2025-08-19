# 🚀 Guía de Deploy a Producción - UnciaBot

## 📋 Resumen de Funcionalidades Implementadas

### ✅ **Frontend Completo**
- ✅ Dashboard funcional con todas las secciones
- ✅ Sistema de autenticación con localStorage
- ✅ Perfiles de usuario con edición de foto y bio
- ✅ Sección de comunidad con posts, likes y comentarios
- ✅ Grupos de chat con integración del agente n8n
- ✅ Navegación funcional en sidebar y navbar
- ✅ Diseño responsive y moderno con Tailwind CSS

### ✅ **Backend API Completo**
- ✅ Servidor Express.js con todas las rutas necesarias
- ✅ Autenticación con hash SHA-256
- ✅ Endpoints para estudiantes, pagos, anuncios, eventos
- ✅ Sistema de comunidad (posts, likes, comentarios)
- ✅ Grupos de chat y mensajes
- ✅ Integración con agente n8n

### ✅ **Base de Datos**
- ✅ Esquema PostgreSQL completo
- ✅ Tablas para estudiantes, cursos, pagos, anuncios
- ✅ Sistema social (perfiles, posts, amigos, grupos)
- ✅ Datos de ejemplo incluidos

---

## 🌐 **Deploy del Frontend (Netlify)**

### **Paso 1: Preparar el Proyecto**
```bash
# Asegúrate de estar en el directorio del proyecto
cd unciabot

# Instalar dependencias
npm install

# Construir el proyecto
npm run build
```

### **Paso 2: Subir a GitHub**
```bash
# Inicializar git si no está inicializado
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: UnciaBot complete application"

# Agregar tu repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# Subir a GitHub
git push -u origin main
```

### **Paso 3: Deploy en Netlify**
1. **Ir a [netlify.com](https://netlify.com)** y crear cuenta/iniciar sesión
2. **"New site from Git"** → Seleccionar GitHub
3. **Seleccionar tu repositorio** `unciabot`
4. **Configuración del build:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Click "Deploy site"**

### **Paso 4: Configurar Variables de Entorno**
En Netlify, ir a **Site settings** → **Environment variables**:
```
VITE_API_URL=https://tu-backend-url.com
```

---

## 🖥️ **Deploy del Backend (Opciones)**

### **Opción A: Railway (Recomendado para principiantes)**
1. **Ir a [railway.app](https://railway.app)**
2. **"New Project"** → **"Deploy from GitHub repo"**
3. **Seleccionar tu repositorio**
4. **Railway detectará automáticamente** que es un proyecto Node.js
5. **Configurar variables de entorno:**
   ```
   DATABASE_URL=tu_url_de_postgresql
   PORT=4000
   NODE_ENV=production
   ```

### **Opción B: Render**
1. **Ir a [render.com](https://render.com)**
2. **"New Web Service"** → **"Connect GitHub repo"**
3. **Configurar:**
   - **Name:** `unciabot-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Agregar variables de entorno**

### **Opción C: Heroku**
1. **Instalar Heroku CLI**
2. **Login:** `heroku login`
3. **Crear app:** `heroku create unciabot-backend`
4. **Deploy:** `git push heroku main`

---

## 🗄️ **Base de Datos en Producción**

### **Opción 1: Supabase (Recomendado)**
1. **Ir a [supabase.com](https://supabase.com)**
2. **"New Project"** → Crear proyecto
3. **En SQL Editor, ejecutar:**
   ```sql
   -- Ejecutar todos los archivos SQL en orden:
   -- 1. schema.sql
   -- 2. social_schema.sql  
   -- 3. social_groups.sql
   -- 4. sample_data.sql
   ```
4. **Copiar la DATABASE_URL** de Settings → Database

### **Opción 2: Neon (PostgreSQL Serverless)**
1. **Ir a [neon.tech](https://neon.tech)**
2. **"Create Project"**
3. **Ejecutar los scripts SQL** en el editor
4. **Copiar la connection string**

### **Opción 3: Railway PostgreSQL**
1. **En Railway, crear "Database"**
2. **Seleccionar PostgreSQL**
3. **Railway generará automáticamente** la DATABASE_URL

---

## 🔧 **Configuración Final**

### **1. Actualizar API URL en Frontend**
```typescript
// src/api.ts - Cambiar la URL base
const API_BASE = import.meta.env.VITE_API_URL || 'https://tu-backend-url.com';
```

### **2. Configurar CORS en Backend**
```javascript
// server/index.js
app.use(cors({
  origin: ['https://tu-app.netlify.app', 'http://localhost:5173'],
  credentials: true
}));
```

### **3. Variables de Entorno del Backend**
```bash
DATABASE_URL=postgresql://usuario:password@host:puerto/database
NODE_ENV=production
PORT=4000
```

---

## 🚨 **Problemas Comunes y Soluciones**

### **Error: "Cannot find module"**
```bash
# En el directorio del backend
npm install
npm run build
```

### **Error de CORS**
- Verificar que la URL del frontend esté en la lista de origins permitidos
- Asegurar que el backend esté corriendo en HTTPS en producción

### **Error de Base de Datos**
- Verificar que la DATABASE_URL sea correcta
- Asegurar que las tablas estén creadas
- Verificar permisos de la base de datos

---

## 📱 **URLs Finales**
- **Frontend:** `https://tu-app.netlify.app`
- **Backend:** `https://tu-backend.railway.app` (o similar)
- **Base de Datos:** PostgreSQL en Supabase/Neon/Railway

---

## 🎯 **Próximos Pasos Recomendados**
1. **Deploy del frontend** a Netlify
2. **Configurar base de datos** en Supabase
3. **Deploy del backend** a Railway
4. **Configurar variables de entorno**
5. **Probar todas las funcionalidades**
6. **Configurar dominio personalizado** (opcional)

---

## 📞 **Soporte**
Si tienes problemas durante el deploy:
1. **Revisar logs** en la plataforma de deploy
2. **Verificar variables de entorno**
3. **Comprobar conectividad** entre frontend, backend y base de datos
4. **Revisar consola del navegador** para errores de frontend

¡Tu aplicación UnciaBot estará funcionando en producción en poco tiempo! 🎉
