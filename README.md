# 🎓 Portal Estudiante - Universidad Nacional de Cajamarca

Un portal estudiantil moderno y completo para la Universidad Nacional de Cajamarca, desarrollado con React, TypeScript y Tailwind CSS.

## ✨ Características

### 🎨 **Diseño Moderno**
- Interfaz de usuario moderna y responsiva
- Diseño con gradientes y animaciones suaves
- Paleta de colores institucional
- Componentes reutilizables y modulares

### 📚 **Secciones Principales**
- **Dashboard Académico**: Resumen de notas, créditos y progreso
- **Horario de Clases**: Programación diaria con indicadores visuales
- **Estado de Pagos**: Gestión de pensiones y trámites
- **Anuncios**: Notificaciones importantes de la universidad
- **Eventos y Actividades**: Actividades extracurriculares
- **Biblioteca Digital**: Recursos académicos y materiales
- **Accesos Rápidos**: Funciones esenciales del estudiante

### 🤖 **Asistente Virtual**
- Chat integrado con n8n para respuestas automáticas
- Soporte para consultas académicas
- Interfaz de chat moderna y funcional

### 📱 **Responsive Design**
- Optimizado para móviles, tablets y desktop
- Navegación adaptativa
- Menú lateral colapsible

## 🚀 Tecnologías Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconografía
- **n8n** - Automatización de respuestas del chat
- **Vite** - Build tool y desarrollo
- **Framer Motion** - Animaciones

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/portal-estudiante-unc.git
cd portal-estudiante-unc
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
```

## 🔧 Configuración

### Variables de Entorno
```env
VITE_N8N_WEBHOOK_URL=https://tu-webhook.n8n.cloud/webhook/chat
VITE_APP_TITLE=Portal Estudiante UNC
```

### Configuración del Chat (n8n)
El chat utiliza el widget oficial de n8n. Configura tu webhook en:
```typescript
webhookUrl: 'https://tu-webhook.n8n.cloud/webhook/chat'
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── sections/          # Secciones del dashboard
│   │   ├── AcademicSection.tsx
│   │   ├── AnnouncementsSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── LibrarySection.tsx
│   │   ├── PaymentsSection.tsx
│   │   ├── QuickActions.tsx
│   │   └── ScheduleSection.tsx
│   ├── ChatWidget.tsx     # Widget de chat n8n
│   ├── Dashboard.tsx      # Dashboard principal
│   ├── Header.tsx         # Header de navegación
│   ├── LoginForm.tsx      # Formulario de login
│   └── Sidebar.tsx        # Barra lateral
├── contexts/
│   └── AuthContext.tsx    # Contexto de autenticación
├── App.tsx               # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🎯 Funcionalidades

### 🔐 **Autenticación**
- Login con código de estudiante
- Gestión de sesiones
- Datos de prueba incluidos

### 📊 **Dashboard Académico**
- Promedio ponderado
- Créditos aprobados
- Progreso por curso
- Estadísticas visuales

### 📅 **Gestión de Horarios**
- Horario diario
- Indicadores de clase actual
- Información de aulas y profesores

### 💳 **Sistema de Pagos**
- Estado de pensiones
- Historial de pagos
- Métodos de pago disponibles

### 📢 **Sistema de Anuncios**
- Notificaciones prioritarias
- Filtros por tipo
- Indicadores de urgencia

### 🎪 **Gestión de Eventos**
- Calendario de eventos
- Sistema de inscripciones
- Estadísticas de asistencia

### 📚 **Biblioteca Digital**
- Catálogo de recursos
- Sistema de búsqueda
- Descargas de materiales

## 🚀 Deploy

### Netlify
1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno
3. Deploy automático en cada push

### Vercel
1. Importa el proyecto en Vercel
2. Configura las variables de entorno
3. Deploy automático

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [TuUsuario](https://github.com/TuUsuario)

## 🙏 Agradecimientos

- Universidad Nacional de Cajamarca
- Comunidad de React
- Equipo de n8n
- Contribuidores del proyecto

## 📞 Soporte

Para soporte técnico:
- Email: soporte.ti@unc.edu.pe
- Teléfono: 076-365430 Ext. 123

---

**Desarrollado con ❤️ para la Universidad Nacional de Cajamarca**
