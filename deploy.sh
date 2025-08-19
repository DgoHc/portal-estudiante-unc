#!/bin/bash

echo "🚀 Iniciando deploy de UnciaBot..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi

print_status "Verificando dependencias..."

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    print_status "Instalando dependencias..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Error al instalar dependencias"
        exit 1
    fi
    print_success "Dependencias instaladas correctamente"
else
    print_success "Dependencias ya están instaladas"
fi

# Construir el proyecto
print_status "Construyendo el proyecto..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Error al construir el proyecto"
    exit 1
fi
print_success "Proyecto construido correctamente"

# Verificar si git está inicializado
if [ ! -d ".git" ]; then
    print_status "Inicializando repositorio git..."
    git init
    print_success "Repositorio git inicializado"
fi

# Verificar estado de git
print_status "Verificando estado de git..."
git status

# Agregar todos los archivos
print_status "Agregando archivos al repositorio..."
git add .

# Hacer commit
print_status "Haciendo commit de los cambios..."
git commit -m "Deploy: UnciaBot application ready for production $(date)"

print_success "✅ Deploy local completado exitosamente!"

echo ""
echo "📋 Próximos pasos para producción:"
echo ""
echo "1. 🌐 SUBIR A GITHUB:"
echo "   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git"
echo "   git push -u origin main"
echo ""
echo "2. 🚀 DEPLOY EN NETLIFY:"
echo "   - Ir a netlify.com"
echo "   - 'New site from Git' → GitHub"
echo "   - Seleccionar tu repositorio"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist"
echo ""
echo "3. 🗄️ BASE DE DATOS (SUPABASE):"
echo "   - Crear proyecto en supabase.com"
echo "   - Ejecutar scripts SQL en orden:"
echo "     * schema.sql"
echo "     * social_schema.sql"
echo "     * social_groups.sql"
echo "     * sample_data.sql"
echo ""
echo "4. ⚙️ BACKEND (RAILWAY):"
echo "   - Crear proyecto en railway.app"
echo "   - Conectar con GitHub"
echo "   - Configurar DATABASE_URL"
echo ""
echo "5. 🔗 CONFIGURAR VARIABLES:"
echo "   - En Netlify: VITE_API_URL=https://tu-backend.railway.app"
echo "   - En Railway: DATABASE_URL=tu_url_supabase"
echo ""
echo "📖 Para instrucciones detalladas, consulta el archivo DEPLOY.md"
echo ""
print_success "🎉 ¡Tu aplicación está lista para producción!"
