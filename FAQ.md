# ❓ PREGUNTAS FRECUENTES - SETUP DE BD Y AUTENTICACIÓN

## General

### ¿Qué hiciste exactamente?
He preparado toda la infraestructura para que funcione el login:
- Script SQL que crea las tablas
- Servidor Express con autenticación
- 3 usuarios de prueba pre-cargados
- Documentación completa
- Script de pruebas para verificar

### ¿Cuánto tiempo tardará el setup?
- Lectura de documentación: 5-10 minutos
- Instalación de dependencias: 5 minutos
- Ejecución de BD: 2 minutos
- Pruebas: 2 minutos

**Total: 15-20 minutos** (incluida instalación de PostgreSQL)

### ¿Qué necesito antes de empezar?
- PostgreSQL instalado (https://postgresql.org)
- Node.js instalado (https://nodejs.org)
- npm (viene con Node.js)
- Terminal PowerShell o CMD

### ¿Puedo usar MySQL en lugar de PostgreSQL?
No, el proyecto usa PostgreSQL. El schema está optimizado para PostgreSQL.

---

## PostgreSQL

### ¿Donde descargo PostgreSQL?
https://www.postgresql.org/download/windows/

En Windows, recomiendo versión 15 o superior.

### ¿Qué contraseña uso para PostgreSQL?
Durante la instalación, te pide una contraseña para el usuario `postgres`.
Recuerda esa contraseña, la necesitarás después.

### ¿Olvidé mi contraseña de PostgreSQL?
En Windows como administrador:
```powershell
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" stop
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start -o "-p 5432"
```

Luego intenta sin contraseña o resetea el servicio.

### ¿Cómo verifico que PostgreSQL está instalado?
```powershell
psql --version
```

Deberías ver: `psql (PostgreSQL) 15.x`

### ¿PostgreSQL consume mucha memoria?
No, normalmente usa 50-100 MB en reposo.

---

## Base de Datos

### ¿Qué hace el script setup_auth.sql?
```
1. Crea 10 tablas de BD
2. Crea índices para rendimiento
3. Carga 3 usuarios de prueba
4. Configura relaciones entre tablas
```

### ¿Puedo ejecutar el script varias veces?
Sí, usa `CREATE TABLE IF NOT EXISTS` para evitar errores.
Puedo ejecutarlo múltiples veces sin problemas.

### ¿Dónde se guarda la BD?
PostgreSQL la guarda automáticamente en su carpeta de datos:
```
C:\Program Files\PostgreSQL\15\data
```

### ¿Cuánto espacio ocupa la BD inicial?
Aproximadamente 5-10 MB con los 3 usuarios y tablas.

### ¿Cómo hacer backup de la BD?
```powershell
pg_dump -U postgres -d portal_estudiante_unc -f backup.sql
```

### ¿Cómo restaurar un backup?
```powershell
psql -U postgres -d portal_estudiante_unc -f backup.sql
```

---

## Servidor Backend

### ¿Por qué necesito npm install?
Descarga todas las dependencias necesarias:
- Express
- Prisma
- bcryptjs
- JWT
- etc.

Sin esto, el servidor no corre.

### ¿Puedo usar yarn en lugar de npm?
Sí, pero las instrucciones usan npm. Adapta los comandos según necesites.

### ¿node_modules es muy pesado?
Sí, normalmente ocupa 500+ MB. Es normal.
Agrega a .gitignore para no subirlo a Git.

### ¿Qué hace npx prisma generate?
Genera el cliente Prisma desde el schema.
Necesario después de instalar o cambiar el schema.

### ¿Cuál es la diferencia entre dev y start?
```
npm run dev    → Modo desarrollo (reinicia automáticamente)
npm run start  → Modo producción (requiere build previo)
```

### ¿El servidor usa HTTP o HTTPS?
HTTP en desarrollo. Para producción, usa HTTPS con certificado SSL.

### ¿Puedo cambiar el puerto 5000?
Sí, edita `.env`:
```
PORT=3000
```

---

## Autenticación

### ¿Cómo funciona el login?
```
1. Usuario entra email y contraseña
2. Backend valida formato
3. Busca usuario en BD
4. Compara contraseña con bcrypt
5. Genera JWT (token de acceso)
6. Genera Refresh Token
7. Devuelve tokens al cliente
```

### ¿Cuánto dura un token?
- **JWT (access token)**: 1 hora
- **Refresh token**: 7 días

Después de 1 hora, usa refresh para obtener nuevo JWT sin logueo.

### ¿Dónde guardo el token en el frontend?
En localStorage:
```javascript
localStorage.setItem('token', response.token);
localStorage.setItem('refreshToken', response.refreshToken);
```

### ¿Cómo uso el token en peticiones?
Agrega el header Authorization:
```
Authorization: Bearer {token}
```

### ¿Qué significa "Credenciales inválidas"?
Significa que:
- El usuario no existe, O
- La contraseña es incorrecta, O
- El usuario está inactivo

### ¿Cómo cambio la contraseña de un usuario?
La contraseña no se cambia automáticamente. Necesitas:
1. Conectarte a la BD
2. Hashear la nueva contraseña con bcryptjs
3. Actualizar en la tabla User

```powershell
psql -U postgres -d portal_estudiante_unc
UPDATE "User" SET "passwordHash" = 'NUEVO_HASH' WHERE email = 'admin@zahkiel.com';
```

### ¿Las contraseñas se almacenan en texto plano?
No, se almacenan hasheadas con bcryptjs (10 rondas).
Imposible recuperar la contraseña original.

### ¿Puedo ver el hash de una contraseña?
Sí, conectándote a la BD:
```sql
SELECT email, "passwordHash" FROM "User";
```

Pero el hash no es reversible.

---

## Credenciales y Usuarios

### ¿Puede alguien hackear con credenciales de prueba?
No, solo funcionan en tu máquina local. No publiques credenciales reales.

### ¿Debo cambiar contraseñas antes de producción?
Sí. Crea nuevas contraseñas securas:
1. Genera hash bcryptjs
2. Actualiza en BD
3. Cambia JWT_SECRET y JWT_REFRESH_SECRET en .env

### ¿Dónde cambio JWT_SECRET?
En el archivo `.env`:
```
JWT_SECRET="tu_nuevo_secreto_super_largo"
JWT_REFRESH_SECRET="otro_secreto_super_largo"
```

Debe ser una cadena larga y aleatoria (mínimo 32 caracteres).

### ¿Cómo creo nuevos usuarios?
Opción 1: Directamente en BD
```sql
INSERT INTO "User" (...) VALUES (...);
INSERT INTO "Student"/"Teacher" (...) VALUES (...);
```

Opción 2: Endpoint de registro (aún no implementado)

### ¿Qué significa "usuario activo"?
```sql
SELECT email FROM "User" WHERE active = true;
```

Solo usuarios con `active = true` pueden loguear.

---

## Pruebas y Verificación

### ¿Qué hace npm run test-db?
```
1. Conecta a la BD
2. Verifica que funciona
3. Cuenta usuarios
4. Prueba autenticación
5. Verifica estructura de tablas
```

Si todo pasa ✅, la BD está lista.

### ¿Mi contraseña es incorrecta en la prueba?
Asegúrate de que en `.env` está la contraseña correcta:
```
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/portal_estudiante_unc"
```

Reemplaza `TU_CONTRASEÑA` con la real.

### ¿Cómo sé si el servidor está corriendo?
En el navegador ve a: http://localhost:5000/health

Deberías ver: `{"status":"OK","timestamp":"..."}`

### ¿Cómo pruebo el login sin frontend?
Opción 1: Postman (importa `Zahkiel_API_Postman.json`)
Opción 2: PowerShell (ver WINDOWS_SETUP.md)
Opción 3: curl (en Mac/Linux)

---

## Errores Comunes

### Error: "password authentication failed"
**Causa**: Contraseña de PostgreSQL incorrecta

**Solución**:
1. Verifica la contraseña que usaste en instalación
2. Edita `.env` con la correcta
3. Reinicia el servidor

### Error: "database portal_estudiante_unc does not exist"
**Causa**: No ejecutaste el paso 1 (crear BD)

**Solución**:
```powershell
psql -U postgres -c "CREATE DATABASE portal_estudiante_unc;"
```

### Error: "relation User does not exist"
**Causa**: No ejecutaste el script SQL

**Solución**:
```powershell
psql -U postgres -d portal_estudiante_unc -f database\setup_auth.sql
```

### Error: "psql no se reconoce como comando"
**Causa**: PostgreSQL no está en el PATH

**Soluciones**:
1. Usa ruta completa: `C:\Program Files\PostgreSQL\15\bin\psql`
2. Agrega a PATH (Ver AUTH_SETUP_GUIDE.md)
3. Abre "PostgreSQL Command Line Client" desde Inicio

### Error: "Error: connect ECONNREFUSED 127.0.0.1:5432"
**Causa**: PostgreSQL no está corriendo

**Solución**:
```powershell
# Ver si está corriendo
Get-Service postgresql-x64-15

# Iniciar si está parado
Start-Service postgresql-x64-15
```

### Error: "Credenciales inválidas"
**Causa**: Usuario no existe o contraseña incorrecta

**Solución**:
```sql
SELECT email FROM "User" WHERE email = 'admin@zahkiel.com';
```

Si no aparece, el usuario no está en la BD. Ejecuta el script SQL de nuevo.

### Error: "Token inválido"
**Causa**: Token expirado, inválido o incorrecto

**Solución**:
1. Genera un token nuevo con login
2. Verifica que lo pasas correctamente en header

---

## Seguridad

### ¿Es seguro guardar tokens en localStorage?
En desarrollo: sí
En producción: considera httpOnly cookies en su lugar

### ¿Alguien puede falsificar un token?
No, está firmado con JWT_SECRET.
Si cambias el secret, todos los tokens anteriores invalidan.

### ¿Qué pasa si alguien obtiene mi JWT_SECRET?
Es grave. Pueden falsificar cualquier token.
Cambia inmediatamente:
1. Genera un nuevo secret aleatorio
2. Actualiza en .env
3. Todos los tokens antiguos invalidan

### ¿Es seguro el hashing de contraseñas?
Sí, bcryptjs es seguro.
Usa 10 rondas por defecto.
Imposible recuperar la contraseña original.

### ¿Debo hacer sanitize de inputs?
Sí, usa Zod (ya configurado).
Define esquemas y valida siempre.

---

## Documentación

### ¿Por qué hay tantos archivos de documentación?
Para que puedas elegir el que mejor se adapte:
- Si tienes prisa: QUICK_AUTH_SETUP.md
- Si usas Windows: WINDOWS_SETUP.md
- Si quieres detalles: AUTH_SETUP_GUIDE.md
- Si quieres diagramas: FLOW_DIAGRAMS.md

### ¿Qué archivo debo leer primero?
START_HERE.md (es el más corto)

### ¿Está todo documentado?
Sí, desde instalación hasta solución de problemas.
Si algo no está claro, abre AUTH_SETUP_GUIDE.md

---

## Próximos Pasos

### ¿Qué hago después de que funcione el login?
1. Conecta el frontend
2. Guarda el token en localStorage
3. Usa el token en peticiones futuras
4. Implementa logout
5. Maneja expiración de tokens

### ¿Cómo conecto el frontend?
Ver documentación del frontend.
Los endpoints están en SETUP_SUMMARY.txt

### ¿Puedo agregar más usuarios?
Sí, directamente en la BD o creando endpoint de registro.

### ¿Qué pasa en producción?
Cambia:
1. DATABASE_URL (BD en servidor)
2. JWT_SECRET (nueva cadena larga)
3. JWT_REFRESH_SECRET (nueva cadena larga)
4. NODE_ENV a "production"
5. Usa HTTPS

---

## Contacto/Soporte

Si aún tienes preguntas:
1. Lee AUTH_SETUP_GUIDE.md (sección "Problemas Comunes")
2. Ejecuta verify-setup.bat (para diagnosticar)
3. Ejecuta npm run test-db (para pruebas)
4. Revisa FLOW_DIAGRAMS.md (para entender el flujo)

---

**Última actualización**: Febrero 2026
**Versión**: 1.0
**Estado**: ✅ Completo
