# GUÍA RÁPIDA - SISTEMA ADAPTATIVO DE EVALUACIÓN

## 🚀 INICIO RÁPIDO

### 1. Importar en tu app principal

```tsx
// src/App.tsx o src/AppNew.tsx
import { DiagnosticAssessmentFlow } from './components/DiagnosticAssessmentFlow';

// En tu router:
<Route path="/assessment" element={<DiagnosticAssessmentFlow />} />
<Route path="/dashboard" element={<StudentDashboard />} />
```

### 2. Redirigir después del login

```tsx
// En LoginForm o tu componente de autenticación
const handleLoginSuccess = () => {
  if (!student.assessmentCompleted) {
    navigate('/assessment');  // → Quiz Adaptativo
  } else {
    navigate('/dashboard');   // → Dashboard con contenido
  }
};
```

### 3. Usar en StudentDashboard existente

```tsx
// src/components/StudentDashboardSimple.tsx
import { DiagnosticAssessmentFlow } from './DiagnosticAssessmentFlow';

export function StudentDashboardSimple() {
  const { student } = useAuth();

  // Si no completó evaluación, mostrar quiz
  if (!student?.assessmentCompleted) {
    return <DiagnosticAssessmentFlow />;
  }

  // Si ya completó, mostrar dashboard normal
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Tu dashboard existente */}
    </div>
  );
}
```

---

## 🎯 FLUJO VISUAL

```
┌─────────────────────────────────┐
│  Quiz Adaptativo (25 preguntas) │
│  ✓ Dinámico                      │
│  ✓ Feedback inmediato            │
│  ✓ Refuerzo para errores         │
└──────────────┬──────────────────┘
               │
               ↓
┌─────────────────────────────────┐
│  Análisis Diagnóstico            │
│  ✓ Gráficos radar/barras         │
│  ✓ Fortalezas & Debilidades      │
│  ✓ Recomendaciones               │
└──────────────┬──────────────────┘
               │
               ↓
┌─────────────────────────────────┐
│  Contenido Personalizado         │
│  ✓ Rutas de aprendizaje          │
│  ✓ Horario semanal               │
│  ✓ Recursos recomendados         │
│  ✓ Tutor IA Gemini               │
└─────────────────────────────────┘
```

---

## 📊 EJEMPLO DE RESULTADO ESPERADO

### Quiz Adaptativo
- ✅ 25 preguntas en ~20-30 minutos
- ✅ Dificultad se ajusta automáticamente
- ✅ Feedback inmediato para cada respuesta
- ✅ Preguntas de refuerzo si falla

### Reporte Diagnóstico
```
MATEMÁTICA: 72%
├─ Cantidad: 85% (Fortaleza)
├─ Regularidad: 65% (Intermedio)
├─ Forma/Movimiento: 70% (Intermedio)
└─ Gestión Datos: 58% (Mejorar)

COMUNICACIÓN: 58%
├─ Comprensión Lectora: 70% (Intermedio)
├─ Producción Textos: 55% (Mejorar)
├─ Gramática: 45% (Mejorar)
└─ Vocabulario: 60% (Intermedio)

Score General: 65% (Intermedio)
Estilo: Visual
Ritmo: Normal
```

### Rutas Personalizadas
- Ruta 1: Refuerza Gramática (ALTA PRIORIDAD)
  - 5 horas estimadas
  - 3 videos + 10 ejercicios + 2 quizzes
  - + Tutor IA

- Ruta 2: Mejora Producción de Textos (MEDIA PRIORIDAD)
  - 10 horas estimadas
  - 5 videos + 15 ejercicios + 3 quizzes

- Ruta 3: Profundiza Cantidad (BAJA PRIORIDAD)
  - 15 horas estimadas
  - 7 videos + 20 ejercicios + 4 quizzes

---

## 🔧 CONFIGURACIÓN GEMINI API

### Opción 1: Desarrollo (Sin API)
```bash
# Simplemente no agregues la variable
# El sistema usa respuestas mock automáticamente
npm run dev
```

### Opción 2: Desarrollo (Con API)
```bash
# .env.local
VITE_GEMINI_API_KEY=sk-...

npm run dev
```

### Opción 3: Producción (Seguro)
```bash
# En tu servidor/variables de entorno
export VITE_GEMINI_API_KEY=tu_key_segura

npm run build
npm start
```

---

## 📱 COMPONENTES DISPONIBLES

### DiagnosticAssessmentFlow
Wrapper que integra todo el flujo.

```tsx
import { DiagnosticAssessmentFlow } from './components/DiagnosticAssessmentFlow';

<DiagnosticAssessmentFlow />
```

### AdaptiveAssessmentQuiz
Solo el quiz (si lo quieres separado).

```tsx
import { AdaptiveAssessmentQuiz } from './components/AdaptiveAssessmentQuiz';

<AdaptiveAssessmentQuiz 
  studentId="123"
  onComplete={(results) => {
    console.log(results);
  }}
/>
```

### DiagnosticReport
Solo el reporte (si lo quieres separado).

```tsx
import { DiagnosticReport } from './components/DiagnosticReport';

<DiagnosticReport 
  profile={learningProfile}
  onContinue={() => navigate('/content')}
/>
```

### PersonalizedContent
Solo el contenido personalizado.

```tsx
import { PersonalizedContent } from './components/PersonalizedContent';

<PersonalizedContent 
  profile={learningProfile}
  contentPlan={contentPlan}
  onSelectResource={(resource) => {}}
  onStartTutoring={() => {}}
/>
```

---

## 🎨 PERSONALIZAR ESTILOS

### Cambiar colores

Todos los componentes usan Tailwind CSS. Puedes cambiar:

```tsx
// En AdaptiveAssessmentQuiz.tsx
className="bg-gradient-to-r from-blue-600 to-indigo-600"
// Cambia a:
className="bg-gradient-to-r from-purple-600 to-pink-600"
```

### Cambiar idioma

Los textos están hardcodeados. Para multiidioma:

```tsx
// Crea un archivo i18n
// src/locales/es.json
{
  "assessment.title": "Evaluación Adaptativa",
  "assessment.progress": "Progreso"
}

// En componentes:
import { useTranslation } from 'i18next';
const { t } = useTranslation();
<h1>{t('assessment.title')}</h1>
```

---

## 🧪 TESTEAR LOCALMENTE

### Estudiante de Prueba
```
Código: 202015001
Contraseña: password
```

### Escenarios de Test
1. **Quiz simple**: Contesta todas correctamente
2. **Quiz mixto**: Alterna correctas e incorrectas
3. **Quiz bajo desempeño**: Responde incorrectamente la mayoría

---

## 📈 AGREGAR MÁS PREGUNTAS

### Formato de pregunta

```ts
{
  id: 'unique_id',
  subject: 'matemática',
  competency: 'cantidad',
  difficulty: 'básico',
  question: '¿Cuánto es 2 + 2?',
  options: ['4', '3', '5', '6'],
  correctAnswer: 0,  // índice de la correcta
  explanation: '2 + 2 = 4',
  hints: ['Cuenta con los dedos', 'Dibuja dos puntos'],
}
```

### Agregar a questionBank.ts

```ts
const mathematicaQuantity: QuestionSet = {
  'mat_cant_bas_001': { ... },
  'mat_cant_bas_002': { ... },
  // Agrega más aquí:
  'mat_cant_bas_003': {
    id: 'mat_cant_bas_003',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'básico',
    question: 'Tu pregunta',
    options: ['Op1', 'Op2', 'Op3', 'Op4'],
    correctAnswer: 0,
    explanation: 'Explicación',
    hints: ['Pista 1', 'Pista 2'],
  },
};
```

---

## 🤖 USAR TUTOR IA

### Crear sesión de tutoría

```tsx
import { geminiTutor } from './services/geminAITutor';

const session = geminiTutor.createTutoringSession(
  studentId,
  'cantidad',  // competencia
  'Suma de fracciones'  // tema
);

// Preguntar algo
const response = await geminiTutor.chatWithTutor(
  session.id,
  '¿Cómo sumo 1/2 + 1/4?'
);

console.log(response);
// "1/2 + 1/4 = 2/4 + 1/4 = 3/4. Primero convertimos..."
```

### Obtener explicación de un tema

```tsx
const explanation = await geminiTutor.getExplanation({
  studentId: '123',
  competency: 'cantidad',
  topic: 'Suma de fracciones',
  difficulty: 'básico',
  studentLevel: 'básico',
  previousErrors: ['fracciones no equivalentes'],
});

console.log(explanation);
// {
//   explanation: "...",
//   stepByStep: ["Paso 1", "Paso 2", ...],
//   examples: [...],
//   tips: [...]
// }
```

---

## 📊 MONITOREAR PROGRESO

### Acceder a datos del estudiante

```tsx
import { useAuth } from './contexts/AuthContext';

export function MyComponent() {
  const { student } = useAuth();

  return (
    <div>
      {student?.diagnosticProfile && (
        <>
          <h2>Score: {student.diagnosticProfile.overallScore}%</h2>
          <p>Nivel: {student.diagnosticProfile.overallLevel}</p>
          <ul>
            {student.diagnosticProfile.strengths.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
```

### Acceder a plan de contenido

```tsx
const contentPlan = student?.contentPlan;

console.log(contentPlan?.personalizedPath);
// [
//   { id: 'path_cantidad', title: 'Fortalece: Cantidad', ... },
//   { id: 'path_vocab', title: 'Mejora: Vocabulario', ... }
// ]

console.log(contentPlan?.weeklySchedule);
// [
//   { day: 'Lunes', competencies: [...], totalTime: 60 },
//   { day: 'Martes', competencies: [...], totalTime: 60 }
// ]
```

---

## ⚙️ CONFIGURACIÓN AVANZADA

### Cambiar cantidad de preguntas

En `src/services/adaptiveAssessment.ts`:

```ts
private readonly QUESTIONS_TOTAL = 25;  // Cambiar a 20, 30, etc
```

### Cambiar umbrales de dificultad

En el mismo archivo:

```ts
private readonly DIFFICULTY_UP_THRESHOLD = 2;    // Aciertos para subir
private readonly DIFFICULTY_DOWN_THRESHOLD = 2;  // Fallos para bajar
```

### Personalizar algoritmo adaptativo

El método `getNextQuestion()` en `AdaptiveAssessmentEngine`:

```ts
getNextQuestion(): Question {
  // Aquí está la lógica de selección
  // Puedes cambiar estrategias, ponderaciones, etc.
}
```

---

## 🐛 TROUBLESHOOTING

### El quiz no carga
```
✓ Verifica que questionBank.ts esté en src/data/
✓ Revisa importaciones en AdaptiveAssessmentQuiz.tsx
```

### No funcionan los gráficos
```
✓ Instala recharts: npm install recharts
✓ Verifica que datos de diagnosticProfile sean válidos
```

### Gemini API no responde
```
✓ Verifica VITE_GEMINI_API_KEY en .env.local
✓ Revisa límites de API en https://ai.google.dev
✓ Usa modo mock (sin API key) para desarrollo
```

### El perfil no se guarda
```
✓ Verifica updateDiagnosticProfile en AuthContext
✓ Revisa que localStorage no esté deshabilitado
✓ Abre DevTools → Application → Local Storage
```

---

## 📞 SOPORTE Y MEJORAS

### Próximos features sugeridos
- [ ] Exportar reporte PDF
- [ ] Sincronizar con BD
- [ ] Analytics dashboard para profesores
- [ ] Notifications de progreso
- [ ] Gamification (badges, leaderboard)
- [ ] Compartir avances con padres

### Reportar bugs
Crear issue en tu repo con:
1. Qué esperabas que pasara
2. Qué pasó en realidad
3. Pasos para reproducir
4. Browser y OS

---

## 📚 REFERENCIAS

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)
- [Currículo Perú 1ro Secundaria](https://www.gob.pe/institucion/minedu/informes-publicaciones)

---

**Creado con ❤️ para educación personalizada adaptativa**
