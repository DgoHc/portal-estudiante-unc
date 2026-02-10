@echo off
REM Script de Deploy a Railway para Windows

echo 🚀 Iniciando deploy a Railway...
echo.

REM 1. Verificar que está instalado Railway CLI
where railway >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Railway CLI no está instalado
    echo 📥 Instalando Railway CLI...
    npm install -g @railway/cli
)

REM 2. Login a Railway
echo 🔐 Conectando a Railway...
railway login

REM 3. Crear nuevo proyecto en Railway
echo 📝 Creando proyecto en Railway...
railway init

REM 4. Agregar variables de entorno
echo ⚙️  Configurando variables de entorno...
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=tu_secret_muy_largo_aqui
railway variables set JWT_REFRESH_SECRET=tu_refresh_secret_muy_largo_aqui

REM 5. Agregar base de datos PostgreSQL
echo 🗄️  Agregando base de datos PostgreSQL...
railway add

REM 6. Deploy
echo 🚀 Deployando a Railway...
railway up

echo.
echo ✅ Deploy completado!
echo 🌐 Tu aplicación estará disponible en la URL de Railway
pause
