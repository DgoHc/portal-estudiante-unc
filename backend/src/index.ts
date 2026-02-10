import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './config/database';
import { AuthController } from './controllers/auth.controller';
import { auth as authMiddleware } from './middlewares/auth';

// Cargar variables de entorno
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const authController = new AuthController();

// Verificar variables de entorno críticas
const requiredEnv = ['JWT_SECRET', 'JWT_REFRESH_SECRET'];
const missingEnv = requiredEnv.filter(env => !process.env[env]);

if (missingEnv.length > 0 && process.env.NODE_ENV === 'production') {
  console.error('❌ Variables de entorno faltantes:', missingEnv);
  process.exit(1);
}

// =====================================================
// MIDDLEWARES GLOBALES
// =====================================================

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parser JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// RUTAS DE SALUD
// =====================================================

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'API OK', timestamp: new Date().toISOString() });
});

// =====================================================
// RUTAS DE AUTENTICACIÓN (Públicas)
// =====================================================

const authRouter = express.Router();

// Login
authRouter.post('/login', (req: Request, res: Response) => {
  authController.login(req, res);
});

// Refresh token
authRouter.post('/refresh', (req: Request, res: Response) => {
  authController.refresh(req, res);
});

app.use('/api/auth', authRouter);

// =====================================================
// RUTAS PROTEGIDAS
// =====================================================

const protectedRouter = express.Router();

// Aplicar middleware de autenticación
protectedRouter.use(authMiddleware);

// Ruta de ejemplo: obtener perfil del usuario
protectedRouter.get('/profile', (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ 
    message: 'Perfil obtenido',
    user 
  });
});

// Dashboard según rol
protectedRouter.get('/dashboard', (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({
    message: `Dashboard para ${user.role}`,
    role: user.role,
    userId: user.userId
  });
});

app.use('/api', protectedRouter);

// =====================================================
// MANEJO DE ERRORES
// =====================================================

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { details: err })
  });
});

// Ruta no encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// =====================================================
// INICIAR SERVIDOR
// =====================================================

async function main() {
  try {
    // Verificar conexión a base de datos
    await prisma.$connect();
    console.log('✅ Conectado a la base de datos');

    // Iniciar servidor
    app.listen(port, () => {
      console.log(`
╔════════════════════════════════════════╗
║   🚀 Servidor Zahkiel iniciado        ║
║   Puerto: ${port}                              ║
║   Ambiente: ${process.env.NODE_ENV || 'development'}              ║
╚════════════════════════════════════════╝
      `);
      console.log('📝 Rutas disponibles:');
      console.log('   POST   /api/auth/login       - Iniciar sesión');
      console.log('   POST   /api/auth/refresh     - Refrescar token');
      console.log('   GET    /api/profile          - Obtener perfil (protegido)');
      console.log('   GET    /api/dashboard        - Dashboard (protegido)');
      console.log('   GET    /health               - Estado del servidor');
    });
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}

// Manejo de señales
process.on('SIGINT', async () => {
  console.log('\n👋 Desconectando...');
  await prisma.$disconnect();
  process.exit(0);
});

main();

export default app;
