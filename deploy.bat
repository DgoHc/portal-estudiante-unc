@echo off
REM Script automatizado de deploy a Railway para Windows
REM Uso: deploy.bat <token>

if "%1"=="" (
  echo ❌ Error: Necesitas proporcionar el token de Railway
  echo.
  echo Uso: deploy.bat tu_railway_token
  echo.
  echo Para obtener tu token:
  echo 1. Ve a https://railway.app/account/tokens
  echo 2. Copia tu API token
  echo 3. Ejecuta: deploy.bat tu_token_aqui
  pause
  exit /b 1
)

set RAILWAY_TOKEN=%1

echo 🚀 Iniciando deploy a Railway...
echo.

REM 1. Inicializar proyecto
echo 1️⃣  Inicializando proyecto zahkiel-portal...
call railway init --name zahkiel-portal

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Error al inicializar proyecto
  pause
  exit /b 1
)

echo ✅ Proyecto inicializado
echo.

REM 2. Agregar PostgreSQL
echo 2️⃣  Agregando PostgreSQL...
echo postgres | call railway add

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Error al agregar PostgreSQL
  pause
  exit /b 1
)

echo ✅ PostgreSQL agregado
echo.

REM 3. Configurar variables de entorno
echo 3️⃣  Configurando variables de entorno...

call railway variables set NODE_ENV=production
call railway variables set JWT_SECRET=tu_secret_super_largo_32_caracteres_minimo
call railway variables set JWT_REFRESH_SECRET=otro_secret_super_largo_32_caracteres_minimo
call railway variables set PORT=5000

echo ✅ Variables configuradas
echo.

REM 4. Deploy
echo 4️⃣  Deployando a Railway...
call railway up

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Error durante el deploy
  pause
  exit /b 1
)

echo ✅ Deploy completado
echo.

REM 5. Mostrar info
echo 5️⃣  Información de deploy:
call railway status

echo.
echo 🎉 ¡Deploy exitoso!
echo.
echo Tu aplicación estará disponible en unos minutos.
echo Verifica en: railway status
echo.
pause
