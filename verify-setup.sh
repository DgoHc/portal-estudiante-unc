#!/bin/bash

# Script de verificación de setup de autenticación
echo "╔════════════════════════════════════════╗"
echo "║  🔍 Verificación de Setup Auth        ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Verificar PostgreSQL
echo "1️⃣  Verificando PostgreSQL..."
if command -v psql &> /dev/null; then
    echo "   ✅ PostgreSQL instalado"
else
    echo "   ❌ PostgreSQL NO instalado"
fi
echo ""

# Verificar Node.js
echo "2️⃣  Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "   ✅ Node.js instalado: $NODE_VERSION"
else
    echo "   ❌ Node.js NO instalado"
fi
echo ""

# Verificar npm
echo "3️⃣  Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "   ✅ npm instalado: $NPM_VERSION"
else
    echo "   ❌ npm NO instalado"
fi
echo ""

# Verificar archivo .env
echo "4️⃣  Verificando archivo .env..."
if [ -f "backend/.env" ]; then
    echo "   ✅ Archivo .env existe"
else
    echo "   ⚠️  Archivo .env NO existe (crear desde .env.example)"
fi
echo ""

# Verificar dependencias instaladas
echo "5️⃣  Verificando dependencias del backend..."
if [ -d "backend/node_modules" ]; then
    echo "   ✅ node_modules existe"
else
    echo "   ❌ node_modules NO existe (ejecutar: cd backend && npm install)"
fi
echo ""

echo "╔════════════════════════════════════════╗"
echo "║  📝 Próximos pasos:                   ║"
echo "║  1. Crear base de datos PostgreSQL    ║"
echo "║  2. Ejecutar setup_auth.sql           ║"
echo "║  3. Configurar archivo .env           ║"
echo "║  4. npm install en /backend           ║"
echo "║  5. npm run dev para iniciar         ║"
echo "╚════════════════════════════════════════╝"
