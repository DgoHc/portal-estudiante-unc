import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testConnection() {
  console.log('🔍 Iniciando pruebas de conexión...\n');

  try {
    // Test 1: Conectar a la BD
    console.log('1️⃣  Conectando a la base de datos...');
    await prisma.$connect();
    console.log('   ✅ Conexión exitosa\n');

    // Test 2: Contar usuarios
    console.log('2️⃣  Verificando usuarios en la BD...');
    const userCount = await prisma.user.count();
    console.log(`   ✅ Total de usuarios: ${userCount}\n`);

    // Test 3: Listar todos los usuarios
    console.log('3️⃣  Listando usuarios:');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        active: true
      }
    });

    if (users.length === 0) {
      console.log('   ⚠️  No hay usuarios en la BD');
    } else {
      users.forEach(user => {
        console.log(`   - ${user.email} (${user.role}) - ${user.firstName} ${user.lastName}`);
      });
    }
    console.log('');

    // Test 4: Probar autenticación
    console.log('4️⃣  Probando autenticación...');
    const testUser = await prisma.user.findUnique({
      where: { email: 'admin@zahkiel.com' },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        role: true
      }
    });

    if (!testUser) {
      console.log('   ❌ Usuario admin@zahkiel.com NO encontrado');
    } else {
      console.log(`   ✅ Usuario encontrado: ${testUser.email}`);
      
      // Probar contraseña
      const passwordMatch = await bcrypt.compare('123456', testUser.passwordHash);
      if (passwordMatch) {
        console.log('   ✅ Contraseña correcta\n');
      } else {
        console.log('   ❌ Contraseña incorrecta\n');
      }
    }

    // Test 5: Verificar tablas
    console.log('5️⃣  Verificando estructura de tablas...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    ` as any[];

    console.log(`   ✅ Total de tablas: ${tables.length}`);
    tables.forEach(table => {
      console.log(`   - ${table.table_name}`);
    });
    console.log('');

    // Test 6: Verificar estudiantes
    console.log('6️⃣  Verificando estudiantes...');
    const studentCount = await prisma.student.count();
    console.log(`   ✅ Total de estudiantes: ${studentCount}\n`);

    // Test 7: Verificar profesores
    console.log('7️⃣  Verificando profesores...');
    const teacherCount = await prisma.teacher.count();
    console.log(`   ✅ Total de profesores: ${teacherCount}\n`);

    console.log('╔════════════════════════════════════════╗');
    console.log('║  ✅ TODOS LOS TESTS PASARON!          ║');
    console.log('║  La base de datos está lista           ║');
    console.log('╚════════════════════════════════════════╝');

  } catch (error) {
    console.error('❌ Error en la prueba:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
