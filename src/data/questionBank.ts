/**
 * BANCO DE PREGUNTAS ADAPTATIVO
 * Sistema de evaluación diagnóstica para 1ro de secundaria - Perú
 * Competencias: Matemática y Comunicación
 */

export type Difficulty = 'básico' | 'intermedio' | 'avanzado';
export type Subject = 'matemática' | 'comunicación';
export type Competency = 
  | 'cantidad' // Matemática
  | 'regularidad' // Matemática
  | 'forma_movimiento' // Matemática
  | 'gestión_datos' // Matemática
  | 'comprensión_lectora' // Comunicación
  | 'producción_textos' // Comunicación
  | 'gramática_ortografía' // Comunicación
  | 'vocabulario'; // Comunicación

export interface Question {
  id: string;
  subject: Subject;
  competency: Competency;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hints: string[]; // Para refuerzo
  reinforcementQuestions?: string[]; // Preguntas de refuerzo si falla
}

export interface QuestionSet {
  [key: string]: Question;
}

// ============================================
// MATEMÁTICA - CANTIDAD (Números y operaciones)
// ============================================

const mathematicaQuantity: QuestionSet = {
  'mat_cant_bas_001': {
    id: 'mat_cant_bas_001',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'básico',
    question: '¿Cuánto es 23 + 17?',
    options: ['40', '39', '41', '38'],
    correctAnswer: 0,
    explanation: '23 + 17 = 40. Se suman las unidades (3 + 7 = 10) y las decenas (2 + 1 = 3), lo que da 40.',
    hints: ['Agrupa las unidades', 'Luego suma las decenas'],
  },
  'mat_cant_bas_002': {
    id: 'mat_cant_bas_002',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'básico',
    question: '¿Cuánto es 1/2 + 1/4?',
    options: ['3/4', '1/2', '1/4', '1'],
    correctAnswer: 0,
    explanation: '1/2 = 2/4, entonces 2/4 + 1/4 = 3/4',
    hints: ['Convierte a fracciones equivalentes', 'Usa 4 como denominador común'],
  },
  'mat_cant_bas_003': {
    id: 'mat_cant_bas_003',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'básico',
    question: '¿Cuál es el 25% de 100?',
    options: ['25', '50', '75', '10'],
    correctAnswer: 0,
    explanation: 'El 25% significa 1/4 parte. 1/4 de 100 = 100 ÷ 4 = 25',
    hints: ['25% = 1/4', 'Divide entre 4'],
  },
  'mat_cant_bas_004': {
    id: 'mat_cant_bas_004',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'básico',
    question: '¿Cuánto es 45 - 28?',
    options: ['17', '18', '19', '16'],
    correctAnswer: 0,
    explanation: '45 - 28 = 17. Podemos pensar: 45 - 20 = 25, luego 25 - 8 = 17',
    hints: ['Resta primero las decenas', 'Luego resta las unidades'],
  },
  'mat_cant_int_001': {
    id: 'mat_cant_int_001',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'intermedio',
    question: '¿Cuánto es 3/5 + 2/10?',
    options: ['4/5', '5/10', '1', '3/10'],
    correctAnswer: 0,
    explanation: '3/5 = 6/10, entonces 6/10 + 2/10 = 8/10 = 4/5',
    hints: ['Busca un denominador común', 'Multiplica 3/5 × 2/2'],
  },
  'mat_cant_int_002': {
    id: 'mat_cant_int_002',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'intermedio',
    question: 'Un producto cuesta 200 soles y tiene 30% de descuento. ¿Cuánto pagas?',
    options: ['140', '130', '120', '150'],
    correctAnswer: 0,
    explanation: '30% de 200 = 60 soles de descuento. Entonces: 200 - 60 = 140 soles',
    hints: ['Calcula el 30% de 200', 'Resta el descuento del precio original'],
  },
  'mat_cant_int_003': {
    id: 'mat_cant_int_003',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'intermedio',
    question: '¿Cuál es el resultado de (-5) + 8?',
    options: ['3', '-3', '13', '-13'],
    correctAnswer: 0,
    explanation: 'Números enteros: -5 + 8 = 3. Como 8 es mayor y positivo, el resultado es positivo.',
    hints: ['Piensa en una recta numérica', 'Comienza en -5 y avanza 8 pasos'],
  },
  'mat_cant_int_004': {
    id: 'mat_cant_int_004',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'intermedio',
    question: '¿Cuánto es (1.5) × (2.4)?',
    options: ['3.6', '3.5', '3.8', '3.4'],
    correctAnswer: 0,
    explanation: '1.5 × 2.4 = (15/10) × (24/10) = 360/100 = 3.6',
    hints: ['Multiplica sin decimales: 15 × 24 = 360', 'Cuenta los decimales (2 en total)'],
  },
  'mat_cant_ava_001': {
    id: 'mat_cant_ava_001',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'avanzado',
    question: 'Si 2x = 16, ¿cuánto es x?',
    options: ['8', '4', '2', '16'],
    correctAnswer: 0,
    explanation: '2x = 16 → x = 16 ÷ 2 = 8',
    hints: ['Divide ambos lados por 2', 'Verifica: 2 × 8 = 16'],
  },
  'mat_cant_ava_002': {
    id: 'mat_cant_ava_002',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'avanzado',
    question: '¿Cuál es la raíz cuadrada de 144?',
    options: ['12', '14', '11', '13'],
    correctAnswer: 0,
    explanation: '√144 = 12, porque 12 × 12 = 144',
    hints: ['¿Qué número multiplicado por sí mismo da 144?', 'Piensa en números entre 10 y 15'],
  },
};

// ============================================
// MATEMÁTICA - REGULARIDAD (Patrones y Álgebra)
// ============================================

const mathematicaRegularity: QuestionSet = {
  'mat_reg_bas_001': {
    id: 'mat_reg_bas_001',
    subject: 'matemática',
    competency: 'regularidad',
    difficulty: 'básico',
    question: '¿Qué número sigue en la serie: 2, 4, 6, 8, ?',
    options: ['10', '12', '9', '11'],
    correctAnswer: 0,
    explanation: 'La serie aumenta de 2 en 2. 2, 4, 6, 8, 10',
    hints: ['¿Cuánto aumenta entre número y número?', 'Suma 2 al último número'],
  },
  'mat_reg_bas_002': {
    id: 'mat_reg_bas_002',
    subject: 'matemática',
    competency: 'regularidad',
    difficulty: 'básico',
    question: '¿Qué número sigue: 1, 3, 5, 7, ?',
    options: ['9', '8', '10', '6'],
    correctAnswer: 0,
    explanation: 'Números impares consecutivos. Cada número aumenta en 2.',
    hints: ['Son números impares', 'La diferencia es siempre 2'],
  },
  'mat_reg_bas_003': {
    id: 'mat_reg_bas_003',
    subject: 'matemática',
    competency: 'regularidad',
    difficulty: 'básico',
    question: '¿Qué número falta: 5, 10, 15, ?, 25',
    options: ['20', '22', '18', '21'],
    correctAnswer: 0,
    explanation: 'La serie avanza de 5 en 5. 5, 10, 15, 20, 25',
    hints: ['¿Cuál es la diferencia entre números?', 'La diferencia es 5'],
  },
  'mat_reg_int_001': {
    id: 'mat_reg_int_001',
    subject: 'matemática',
    competency: 'regularidad',
    difficulty: 'intermedio',
    question: '¿Qué número sigue: 2, 4, 8, 16, ?',
    options: ['32', '18', '24', '20'],
    correctAnswer: 0,
    explanation: 'Cada número se multiplica por 2. 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16, 16 × 2 = 32',
    hints: ['¿Se multiplica o se suma?', 'Cada número es el doble del anterior'],
  },
  'mat_reg_int_002': {
    id: 'mat_reg_int_002',
    subject: 'matemática',
    competency: 'regularidad',
    difficulty: 'intermedio',
    question: '¿Qué número sigue: 1, 4, 9, 16, ?',
    options: ['25', '20', '24', '26'],
    correctAnswer: 0,
    explanation: 'Cuadrados perfectos. 1², 2², 3², 4², 5² = 1, 4, 9, 16, 25',
    hints: ['Relaciona con cuadrados', '1², 2², 3², 4², ?²'],
  },
  'mat_reg_int_003': {
    id: 'mat_reg_int_003',
    subject: 'matemática',
    competency: 'regularidad',
    difficulty: 'intermedio',
    question: 'Si y = 2x + 1, ¿cuánto es y cuando x = 3?',
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: 'y = 2(3) + 1 = 6 + 1 = 7',
    hints: ['Reemplaza x por 3', 'Multiplica 2 × 3, luego suma 1'],
  },
  'mat_reg_ava_001': {
    id: 'mat_reg_ava_001',
    subject: 'matemática',
    competency: 'regularidad',
    difficulty: 'avanzado',
    question: '¿Qué número sigue: 1, 1, 2, 3, 5, 8, ?',
    options: ['13', '11', '10', '12'],
    correctAnswer: 0,
    explanation: 'Serie de Fibonacci: cada número es la suma de los dos anteriores. 5 + 8 = 13',
    hints: ['¿Cómo se relaciona cada número con los anteriores?', 'Suma los dos números anteriores'],
  },
};

// ============================================
// MATEMÁTICA - FORMA Y MOVIMIENTO (Geometría)
// ============================================

const mathematicaForm: QuestionSet = {
  'mat_forma_bas_001': {
    id: 'mat_forma_bas_001',
    subject: 'matemática',
    competency: 'forma_movimiento',
    difficulty: 'básico',
    question: '¿Cuál es el perímetro de un cuadrado con lado de 5 cm?',
    options: ['20 cm', '25 cm', '10 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'Perímetro = 4 × lado = 4 × 5 = 20 cm',
    hints: ['Un cuadrado tiene 4 lados iguales', 'Suma los 4 lados'],
  },
  'mat_forma_bas_002': {
    id: 'mat_forma_bas_002',
    subject: 'matemática',
    competency: 'forma_movimiento',
    difficulty: 'básico',
    question: '¿Cuál es el área de un rectángulo de 6 cm × 4 cm?',
    options: ['24 cm²', '20 cm²', '10 cm²', '12 cm²'],
    correctAnswer: 0,
    explanation: 'Área = largo × ancho = 6 × 4 = 24 cm²',
    hints: ['Multiplica el largo por el ancho', 'No olvides escribir cm²'],
  },
  'mat_forma_bas_003': {
    id: 'mat_forma_bas_003',
    subject: 'matemática',
    competency: 'forma_movimiento',
    difficulty: 'básico',
    question: '¿Cuántos grados mide un ángulo recto?',
    options: ['90°', '180°', '45°', '60°'],
    correctAnswer: 0,
    explanation: 'Un ángulo recto mide exactamente 90 grados.',
    hints: ['Las esquinas de una puerta forman ángulos rectos', 'Es como la letra L'],
  },
  'mat_forma_int_001': {
    id: 'mat_forma_int_001',
    subject: 'matemática',
    competency: 'forma_movimiento',
    difficulty: 'intermedio',
    question: '¿Cuál es el área de un triángulo con base 8 cm y altura 6 cm?',
    options: ['24 cm²', '14 cm²', '48 cm²', '12 cm²'],
    correctAnswer: 0,
    explanation: 'Área del triángulo = (base × altura) ÷ 2 = (8 × 6) ÷ 2 = 48 ÷ 2 = 24 cm²',
    hints: ['Multiplica base × altura', 'Luego divide entre 2'],
  },
  'mat_forma_int_002': {
    id: 'mat_forma_int_002',
    subject: 'matemática',
    competency: 'forma_movimiento',
    difficulty: 'intermedio',
    question: '¿Cuál es el perímetro de un rectángulo de 5 cm × 3 cm?',
    options: ['16 cm', '15 cm', '8 cm', '18 cm'],
    correctAnswer: 0,
    explanation: 'Perímetro = 2 × (largo + ancho) = 2 × (5 + 3) = 2 × 8 = 16 cm',
    hints: ['Suma largo + ancho, luego multiplica por 2', 'O suma: 5 + 3 + 5 + 3'],
  },
  'mat_forma_ava_001': {
    id: 'mat_forma_ava_001',
    subject: 'matemática',
    competency: 'forma_movimiento',
    difficulty: 'avanzado',
    question: 'En un triángulo rectángulo con catetos de 3 cm y 4 cm, ¿cuál es la hipotenusa?',
    options: ['5 cm', '6 cm', '7 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'Teorema de Pitágoras: h² = 3² + 4² = 9 + 16 = 25, entonces h = 5 cm',
    hints: ['Usa el Teorema de Pitágoras', 'h² = a² + b²'],
  },
};

// ============================================
// MATEMÁTICA - GESTIÓN DE DATOS
// ============================================

const mathematicaData: QuestionSet = {
  'mat_datos_bas_001': {
    id: 'mat_datos_bas_001',
    subject: 'matemática',
    competency: 'gestión_datos',
    difficulty: 'básico',
    question: 'Si en un grupo hay 5 niños y 7 niñas, ¿cuántos estudiantes hay en total?',
    options: ['12', '11', '13', '14'],
    correctAnswer: 0,
    explanation: 'Total = 5 + 7 = 12 estudiantes',
    hints: ['Suma niños y niñas', '5 + 7 = ?'],
  },
  'mat_datos_bas_002': {
    id: 'mat_datos_bas_002',
    subject: 'matemática',
    competency: 'gestión_datos',
    difficulty: 'básico',
    question: 'El promedio de 4, 6 y 8 es:',
    options: ['6', '5', '7', '8'],
    correctAnswer: 0,
    explanation: 'Promedio = (4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6',
    hints: ['Suma todos los números', 'Divide entre la cantidad de números'],
  },
  'mat_datos_int_001': {
    id: 'mat_datos_int_001',
    subject: 'matemática',
    competency: 'gestión_datos',
    difficulty: 'intermedio',
    question: 'Si la media de tres números es 10 y dos de ellos son 8 y 12, ¿cuál es el tercero?',
    options: ['10', '9', '11', '12'],
    correctAnswer: 0,
    explanation: 'Media = (x + 8 + 12) ÷ 3 = 10 → x + 20 = 30 → x = 10',
    hints: ['La suma debe ser 30 (porque 30 ÷ 3 = 10)', '8 + 12 = 20, así que falta 10'],
  },
};

// ============================================
// COMUNICACIÓN - COMPRENSIÓN LECTORA
// ============================================

const comunicacionComprehension: QuestionSet = {
  'com_compr_bas_001': {
    id: 'com_compr_bas_001',
    subject: 'comunicación',
    competency: 'comprensión_lectora',
    difficulty: 'básico',
    question: 'Texto: "María fue al parque con su hermano. Jugaron en los columpios y luego comieron helado." ¿A dónde fue María?',
    options: ['Al parque', 'A la escuela', 'A la playa', 'A casa'],
    correctAnswer: 0,
    explanation: 'El texto dice claramente que María fue al parque.',
    hints: ['Lee la primera oración', 'Busca el lugar mencionado'],
  },
  'com_compr_bas_002': {
    id: 'com_compr_bas_002',
    subject: 'comunicación',
    competency: 'comprensión_lectora',
    difficulty: 'básico',
    question: 'Texto: "El gato está durmiendo bajo el árbol." ¿Qué está haciendo el gato?',
    options: ['Durmiendo', 'Jugando', 'Comiendo', 'Corriendo'],
    correctAnswer: 0,
    explanation: 'El texto indica que el gato está durmiendo.',
    hints: ['¿Cuál es la acción del gato?', 'Lee atentamente'],
  },
  'com_compr_int_001': {
    id: 'com_compr_int_001',
    subject: 'comunicación',
    competency: 'comprensión_lectora',
    difficulty: 'intermedio',
    question: 'Texto: "El águila es el rey del cielo. Con sus alas poderosas puede volar muy alto y ver todo desde arriba." ¿Por qué se le llama al águila el rey del cielo?',
    options: ['Por su tamaño y capacidad de volar alto', 'Porque come reyes', 'Porque vive en un palacio', 'Porque tiene corona'],
    correctAnswer: 0,
    explanation: 'Se le llama rey porque es poderosa y puede volar más alto que otros pájaros, dominando el cielo.',
    hints: ['¿Qué características especiales tiene?', 'Lee las palabras "poderosas" y "muy alto"'],
  },
  'com_compr_int_002': {
    id: 'com_compr_int_002',
    subject: 'comunicación',
    competency: 'comprensión_lectora',
    difficulty: 'intermedio',
    question: 'Texto: "El agua es esencial para la vida. Todos los seres vivos necesitan agua para sobrevivir. Sin agua, no habría plantas, animales ni humanos." ¿Cuál es la idea principal?',
    options: ['El agua es necesaria para que exista vida', 'El agua es azul', 'Hay mucha agua en el mar', 'Los humanos no necesitan agua'],
    correctAnswer: 0,
    explanation: 'La idea principal es que el agua es esencial y necesaria para la vida de todos los seres.',
    hints: ['¿Cuál es el tema central?', 'Busca las palabras "esencial" y "necesitan"'],
  },
};

// ============================================
// COMUNICACIÓN - PRODUCCIÓN DE TEXTOS
// ============================================

const comunicacionProduction: QuestionSet = {
  'com_prod_bas_001': {
    id: 'com_prod_bas_001',
    subject: 'comunicación',
    competency: 'producción_textos',
    difficulty: 'básico',
    question: '¿Cuál de estas oraciones está correctamente estructurada?',
    options: ['El niño juega en el parque', 'Juega el parque en niño', 'En el parque el niño', 'Parque el niño en juega'],
    correctAnswer: 0,
    explanation: 'Una oración debe tener: sujeto (el niño) + verbo (juega) + complemento (en el parque).',
    hints: ['Busca: sujeto + verbo + complemento', 'La oración debe tener sentido'],
  },
  'com_prod_int_001': {
    id: 'com_prod_int_001',
    subject: 'comunicación',
    competency: 'producción_textos',
    difficulty: 'intermedio',
    question: '¿Cuál es un conector apropiado para esta oración: "Estudié mucho __ no pasé el examen"?',
    options: ['pero', 'porque', 'y', 'si'],
    correctAnswer: 0,
    explanation: '"Pero" une ideas opuestas. "Estudié mucho pero no pasé" muestra un contraste lógico.',
    hints: ['¿Hay una contradicción entre las ideas?', 'Usa conectores que expresen oposición'],
  },
  'com_prod_int_002': {
    id: 'com_prod_int_002',
    subject: 'comunicación',
    competency: 'producción_textos',
    difficulty: 'intermedio',
    question: '¿Qué texto tiene mejor coherencia y organización?',
    options: [
      'Primero desayunamos. Luego fuimos a la escuela. Después tuvimos clases. Finalmente regresamos a casa.',
      'Fuimos a la escuela. Desayunamos. Regresamos a casa. Tuvimos clases.',
      'Tuvimos clases y fuimos a casa. Desayunamos después.',
      'A la escuela, desayunamos, clases, casa.'
    ],
    correctAnswer: 0,
    explanation: 'La primera opción sigue un orden lógico y temporal (primero → luego → después → finalmente).',
    hints: ['¿El texto tiene un orden temporal lógico?', 'Busca conectores de secuencia'],
  },
};

// ============================================
// COMUNICACIÓN - GRAMÁTICA Y ORTOGRAFÍA
// ============================================

const comunicacionGrammar: QuestionSet = {
  'com_gram_bas_001': {
    id: 'com_gram_bas_001',
    subject: 'comunicación',
    competency: 'gramática_ortografía',
    difficulty: 'básico',
    question: '¿Cuál de estas palabras está correctamente escrita?',
    options: ['bicicleta', 'bisikleta', 'bicicletá', 'biciccleta'],
    correctAnswer: 0,
    explanation: '"Bicicleta" se escribe con "c" y "i", no con "k".',
    hints: ['Pronuncia la palabra lentamente', 'Busca la raíz: "ciclo"'],
  },
  'com_gram_bas_002': {
    id: 'com_gram_bas_002',
    subject: 'comunicación',
    competency: 'gramática_ortografía',
    difficulty: 'básico',
    question: '¿Cuál es el plural de "mesa"?',
    options: ['mesas', 'mesaes', 'mesás', 'mesa'],
    correctAnswer: 0,
    explanation: 'El plural se forma añadiendo "-s" a las palabras que terminan en vocal.',
    hints: ['¿Cómo se forman los plurales?', 'Añade una "s"'],
  },
  'com_gram_int_001': {
    id: 'com_gram_int_001',
    subject: 'comunicación',
    competency: 'gramática_ortografía',
    difficulty: 'intermedio',
    question: '¿Cuál es el tiempo correcto del verbo? "Cuando llegué a casa, mi madre __ la cena."',
    options: ['estaba preparando', 'prepara', 'preparó', 'preparará'],
    correctAnswer: 0,
    explanation: 'Se usa el imperfecto "estaba preparando" porque la acción ocurría mientras otro evento sucedía.',
    hints: ['¿Qué tiempo pasado expresa una acción que duraba?', 'Imperfecto: estaba + gerundio'],
  },
  'com_gram_int_002': {
    id: 'com_gram_int_002',
    subject: 'comunicación',
    competency: 'gramática_ortografía',
    difficulty: 'intermedio',
    question: '¿Cuál de estas oraciones tiene un acento ortográfico correcto?',
    options: ['Él come rápidamente', 'El come rapidamente', 'él come rapidamente', 'Él come rapidamente'],
    correctAnswer: 0,
    explanation: '"Él" (pronombre) lleva tilde, y "rápidamente" debe llevar acento en la "a".',
    hints: ['Identifica pronombres que llevan tilde', 'Los adverbios en "-mente" heredan el acento'],
  },
};

// ============================================
// COMUNICACIÓN - VOCABULARIO
// ============================================

const comunicacionVocabulary: QuestionSet = {
  'com_vocab_bas_001': {
    id: 'com_vocab_bas_001',
    subject: 'comunicación',
    competency: 'vocabulario',
    difficulty: 'básico',
    question: '¿Cuál es el antónimo de "grande"?',
    options: ['pequeño', 'enorme', 'gigante', 'inmense'],
    correctAnswer: 0,
    explanation: '"Pequeño" es lo opuesto a "grande".',
    hints: ['Busca una palabra con significado opuesto', 'Piensa en tamaños'],
  },
  'com_vocab_bas_002': {
    id: 'com_vocab_bas_002',
    subject: 'comunicación',
    competency: 'vocabulario',
    difficulty: 'básico',
    question: '¿Cuál es el sinónimo de "feliz"?',
    options: ['contento', 'triste', 'enojado', 'cansado'],
    correctAnswer: 0,
    explanation: '"Contento" significa casi lo mismo que "feliz".',
    hints: ['Busca una palabra con significado similar', 'Relacionado con alegría'],
  },
  'com_vocab_int_001': {
    id: 'com_vocab_int_001',
    subject: 'comunicación',
    competency: 'vocabulario',
    difficulty: 'intermedio',
    question: 'En el contexto "El profesor explicó con paciencia", ¿cuál es el significado de "paciencia"?',
    options: ['Capacidad de tolerar sin enojo', 'Rapidez', 'Inteligencia', 'Distancia'],
    correctAnswer: 0,
    explanation: 'Paciencia significa la capacidad de esperar o soportar algo sin perder la calma.',
    hints: ['¿Cómo explica algo sin enojarse?', 'Relacionado con calma'],
  },
  'com_vocab_int_002': {
    id: 'com_vocab_int_002',
    subject: 'comunicación',
    competency: 'vocabulario',
    difficulty: 'intermedio',
    question: '¿Cuál es el significado de "efímero"?',
    options: ['Que dura poco tiempo', 'Muy fuerte', 'De otro planeta', 'Lleno de vida'],
    correctAnswer: 0,
    explanation: '"Efímero" describe algo que tiene una duración muy corta.',
    hints: ['Piensa en cosas que desaparecen rápido', 'Lo opuesto a permanente'],
  },
  'com_vocab_ava_001': {
    id: 'com_vocab_ava_001',
    subject: 'comunicación',
    competency: 'vocabulario',
    difficulty: 'avanzado',
    question: '¿Cuál es el significado de "perspicacia"?',
    options: ['Capacidad de entender rápida y profundamente', 'Miedo', 'Enfermedad', 'Frío'],
    correctAnswer: 0,
    explanation: '"Perspicacia" es la cualidad de comprender o ver las cosas con claridad y profundidad.',
    hints: ['Relacionado con inteligencia y comprensión', 'Capacidad de análisis'],
  },
};

// ============================================
// PREGUNTAS DE REFUERZO (Cuando el estudiante falla)
// ============================================

const reinforcementQuestions: QuestionSet = {
  'refuerzo_mat_basico': {
    id: 'refuerzo_mat_basico',
    subject: 'matemática',
    competency: 'cantidad',
    difficulty: 'básico',
    question: 'Vamos a practicar: ¿Cuánto es 10 + 5?',
    options: ['15', '14', '16', '12'],
    correctAnswer: 0,
    explanation: '10 + 5 = 15. Suma simple de números.',
    hints: ['Comienza con 10', 'Añade 5'],
  },
  'refuerzo_com_basico': {
    id: 'refuerzo_com_basico',
    subject: 'comunicación',
    competency: 'comprensión_lectora',
    difficulty: 'básico',
    question: 'Lee: "Ana tiene un gato negro." ¿De qué color es el gato?',
    options: ['Negro', 'Blanco', 'Gris', 'Marrón'],
    correctAnswer: 0,
    explanation: 'El texto dice que el gato es negro.',
    hints: ['Busca el color en la oración', 'Lee palabra por palabra'],
  },
};

// ============================================
// EXPORTAR BANCO COMPLETO
// ============================================

export const questionBank: QuestionSet = {
  ...mathematicaQuantity,
  ...mathematicaRegularity,
  ...mathematicaForm,
  ...mathematicaData,
  ...comunicacionComprehension,
  ...comunicacionProduction,
  ...comunicacionGrammar,
  ...comunicacionVocabulary,
  ...reinforcementQuestions,
};

// Índice por dificultad
export const questionsByDifficulty = {
  básico: Object.values(questionBank).filter(q => q.difficulty === 'básico'),
  intermedio: Object.values(questionBank).filter(q => q.difficulty === 'intermedio'),
  avanzado: Object.values(questionBank).filter(q => q.difficulty === 'avanzado'),
};

// Índice por competencia
export const questionsByCompetency = {
  cantidad: Object.values(questionBank).filter(q => q.competency === 'cantidad'),
  regularidad: Object.values(questionBank).filter(q => q.competency === 'regularidad'),
  forma_movimiento: Object.values(questionBank).filter(q => q.competency === 'forma_movimiento'),
  gestión_datos: Object.values(questionBank).filter(q => q.competency === 'gestión_datos'),
  comprensión_lectora: Object.values(questionBank).filter(q => q.competency === 'comprensión_lectora'),
  producción_textos: Object.values(questionBank).filter(q => q.competency === 'producción_textos'),
  gramática_ortografía: Object.values(questionBank).filter(q => q.competency === 'gramática_ortografía'),
  vocabulario: Object.values(questionBank).filter(q => q.competency === 'vocabulario'),
};

// Índice por materia
export const questionsBySubject = {
  matemática: Object.values(questionBank).filter(q => q.subject === 'matemática'),
  comunicación: Object.values(questionBank).filter(q => q.subject === 'comunicación'),
};
