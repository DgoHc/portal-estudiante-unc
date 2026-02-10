#!/bin/bash

# Script de Deploy a Railway
# Este script automáticamente deployará el proyecto a Railway

echo "🚀 Iniciando deploy a Railway..."
echo ""

# 1. Verificar que está instalado Railway CLI
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI no está instalado"
    echo "📥 Instalando Railway CLI..."
    npm install -g @railway/cli
fi

# 2. Login a Railway
echo "🔐 Conectando a Railway..."
railway login

# 3. Crear nuevo proyecto en Railway
echo "📝 Creando proyecto en Railway..."
railway init

# 4. Agregar variables de entorno
echo "⚙️  Configurando variables de entorno..."
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=$(openssl rand -hex 32)
railway variables set JWT_REFRESH_SECRET=$(openssl rand -hex 32)

# 5. Agregar base de datos PostgreSQL
echo "🗄️  Agregando base de datos PostgreSQL..."
railway add

# 6. Deploy
echo "🚀 Deployando a Railway..."
railway up

echo ""
echo "✅ Deploy completado!"
echo "🌐 Tu aplicación estará disponible en la URL de Railway"
