# 🚀 CHECKLIST DE DEPLOYMENT

## Antes de Desplegar a Producción

### 1. Validación Local ✅

- [ ] Ejecutar tests de validación:
  ```bash
  npm run test  # o tu comando de tests
  ```

- [ ] Verificar todos los imports en `src/components/DiagnosticAssessmentFlow.tsx`:
  ```bash
  npm run build  # Debe compilar sin errores
  ```

- [ ] Probar flujo completo en desarrollo:
  - [ ] Acceder a `/assessment`
  - [ ] Completar 25 preguntas
  - [ ] Ver diagnóstico generado
  - [ ] Revisar contenido personalizado
  - [ ] Chatear con tutor IA

### 2. Configuración de Variables de Entorno 🔐

#### Básico (Sin IA - 100% funcional):
```bash
# .env.local (desarrollo)
# No requiere GEMINI_API_KEY
# Sistema funciona completamente con respuestas mock
```

#### Completo (Con Gemini IA):
```bash
# .env.local o .env.production
VITE_GEMINI_API_KEY=tu_api_key_aqui
# Obtener en: https://makersuite.google.com/app/apikey
```

### 3. Dependencias 📦

Verificar que estén instaladas:
```bash
npm list framer-motion
npm list recharts
npm list lucide-react
```

Si faltan:
```bash
npm install framer-motion recharts lucide-react
```

### 4. Base de Datos 💾

#### Opción A: Sin Persistencia (Desarrollo)
- ✅ Sistema funciona completamente en memoria
- ✅ Los datos se pierden al refrescar (OK para testing)

#### Opción B: Con Persistencia (Recomendado)
- [ ] Agregar campos a tabla `students`:
  ```sql
  ALTER TABLE students ADD COLUMN diagnostic_profile JSON;
  ALTER TABLE students ADD COLUMN content_plan JSON;
  ALTER TABLE students ADD COLUMN assessment_completed BOOLEAN DEFAULT false;
  ```

- [ ] Actualizar `AuthContext.tsx` para persistir en BD:
  ```typescript
  // En updateDiagnosticProfile:
  // 1. Guardar en localStorage (ya existe)
  // 2. Llamar API para guardar en BD
  await fetch('/api/students/profile', {
    method: 'PUT',
    body: JSON.stringify({ diagnosticProfile, contentPlan })
  });
  ```

### 5. Integración en App Router ⚙️

```typescript
// src/App.tsx o tu router principal
import { DiagnosticAssessmentFlow } from './components/DiagnosticAssessmentFlow';

// En tus rutas:
<Route path="/assessment" element={<DiagnosticAssessmentFlow />} />

// O en StudentDashboard:
{!user.diagnosticProfile && (
  <DiagnosticAssessmentFlow />
)}
```

### 6. Customización Opcional 🎨

- [ ] Ajustar colores en componentes:
  - `src/components/AdaptiveAssessmentQuiz.tsx` (línea ~150)
  - `src/components/DiagnosticReport.tsx` (línea ~200)
  
- [ ] Agregar más preguntas en `src/data/questionBank.ts`
  
- [ ] Modificar descripciones de competencias en `src/services/diagnosticEngine.ts`

### 7. Testing Final en Staging 🧪

```bash
# Build de producción
npm run build

# Servir localmente
npm run preview

# Verificar:
# - No errores en console
# - Todos los estilos cargados
# - APIs responden correctamente
# - Transiciones suaves
```

### 8. Seguridad 🔒

- [ ] GEMINI_API_KEY NO está en repositorio (usar .env)
- [ ] JWT tokens válidos en cookies seguras
- [ ] CORS configurado correctamente
- [ ] Rate limiting en backend (si existe)
- [ ] Input validation en backend

### 9. Performance 📊

```bash
# Análisis de bundle
npm run build -- --analyze

# Debe cumplir:
# - Bundle < 500KB
# - Lighthouse score > 80
# - LCP < 2.5s
# - FID < 100ms
```

### 10. Monitoreo Post-Deploy 📈

- [ ] Agregar logs en `DiagnosticAssessmentFlow.tsx`:
  ```typescript
  console.log('📊 Assessment completado:', {
    studentId,
    score: profile.overallScore,
    nivel: profile.overallLevel,
    timestamp: new Date()
  });
  ```

- [ ] Dashboard de métricas:
  - Estudiantes completando assessment
  - Scores promedio por competencia
  - Tipos de contenido más usados
  - Tasa de retención

### 11. Rollback Plan 🔄

Si hay problemas:

```bash
# Revertir a versión anterior
git revert <commit>
npm run build
npm run deploy

# O si necesitas versión completamente anterior:
git checkout <branch-anterior>
```

### 12. Documentación para Usuarios 📚

Crear guía para estudiantes:
```markdown
# Cómo usar la Evaluación Adaptativa

1. **Haz el cuestionario inicial**
   - 25 preguntas sobre matemática y comunicación
   - Las preguntas se adaptan a tu nivel

2. **Recibe tu diagnóstico**
   - Ves gráficos de tus fortalezas
   - Identificas áreas a mejorar

3. **Obtén contenido personalizado**
   - Rutas de aprendizaje hechas para ti
   - Recursos seleccionados por competencia
   - Horario semanal recomendado

4. **Usa el tutor IA**
   - Haz preguntas sobre temas
   - Obtén explicaciones paso a paso
```

---

## Checklist de Deployment

### Desarrollo → Staging
- [ ] Tests pasando
- [ ] Build sin errores
- [ ] Variables de entorno configuradas
- [ ] BD actualizada (si aplica)
- [ ] Revisión de código

### Staging → Producción
- [ ] Testing en staging completado
- [ ] Performance verificado
- [ ] Seguridad auditada
- [ ] Respaldos de BD
- [ ] Plan de rollback listo

### Post-Deployment
- [ ] Monitorear errores (24h)
- [ ] Verificar métricas de uso
- [ ] Feedback de usuarios
- [ ] Optimizaciones basadas en datos

---

## Troubleshooting Rápido

### Error: "Cannot find module 'framer-motion'"
```bash
npm install framer-motion
```

### Error: "Recharts is not defined"
```bash
npm install recharts
```

### Quiz no muestra preguntas
- [ ] Verificar que `questionBank.ts` existe
- [ ] Revisar imports en `AdaptiveAssessmentQuiz.tsx`
- [ ] Ejecutar `npm run build` para validar

### Diagnóstico no genera
- [ ] Verificar que completed 25 preguntas
- [ ] Revisar console por errores
- [ ] Validar que `DiagnosticEngine.ts` está presente

### Tutor IA no responde
- [ ] Si sin GEMINI_API_KEY: normal (usa mock)
- [ ] Si con API: revisar consola por errores
- [ ] Validar que API_KEY es válida
- [ ] Verificar tasa de llamadas

### Estilos rotos
- [ ] Tailwind CSS instalado? `npm list tailwindcss`
- [ ] Build ejecutado? `npm run build`
- [ ] Caché del navegador limpio? Ctrl+Shift+Del

---

## Support

Si tienes problemas:

1. Revisar `QUICK_START_GUIDE.md` para ejemplos
2. Ejecutar `SYSTEM_VALIDATION.ts` para diagnóstico
3. Revisar los logs en consola (F12)
4. Crear issue con error específico

¡Listo para desplegar! 🚀
