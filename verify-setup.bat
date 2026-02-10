@echo off
REM Script de verificación de setup de autenticación para Windows
title Verificacion de Setup - Zahkiel

echo.
echo ╔════════════════════════════════════════╗
echo ║  🔍 Verificación de Setup Auth        ║
echo ╚════════════════════════════════════════╝
echo.

echo 1️⃣  Verificando PostgreSQL...
where psql >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo    ✅ PostgreSQL instalado
) else (
    echo    ❌ PostgreSQL NO instalado
)
echo.

echo 2️⃣  Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo    ✅ Node.js instalado: %NODE_VERSION%
) else (
    echo    ❌ Node.js NO instalado
)
echo.

echo 3️⃣  Verificando npm...
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo    ✅ npm instalado: %NPM_VERSION%
) else (
    echo    ❌ npm NO instalado
)
echo.

echo 4️⃣  Verificando archivo .env...
if exist "backend\.env" (
    echo    ✅ Archivo .env existe
) else (
    echo    ⚠️  Archivo .env NO existe ^(crear desde .env.example^)
)
echo.

echo 5️⃣  Verificando dependencias del backend...
if exist "backend\node_modules" (
    echo    ✅ node_modules existe
) else (
    echo    ❌ node_modules NO existe ^(ejecutar: cd backend ^&^& npm install^)
)
echo.

echo 6️⃣  Verificando base de datos...
echo    Para verificar que la BD existe, ejecuta en PowerShell:
echo    psql -U postgres -d portal_estudiante_unc -c "SELECT COUNT(*) FROM \"User\";"
echo.

echo ╔════════════════════════════════════════╗
echo ║  📝 Próximos pasos:                   ║
echo ║  1. Crear base de datos PostgreSQL    ║
echo ║  2. Ejecutar setup_auth.sql           ║
echo ║  3. Configurar archivo .env           ║
echo ║  4. npm install en \backend           ║
echo ║  5. npm run dev para iniciar         ║
echo ╚════════════════════════════════════════╝
echo.

pause
