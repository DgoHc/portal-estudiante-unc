import React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface GenerateContentForm {
  objective: string;
  level: 'básico' | 'intermedio' | 'avanzado';
  sessionTimeMinutes: number;
  maxWords: number;
  teacherReviewRequired: boolean;
}

export function ContentGenerator() {
  const { studentId } = useParams<{ studentId: string }>();
  const [form, setForm] = React.useState<GenerateContentForm>({
    objective: '',
    level: 'básico',
    sessionTimeMinutes: 20,
    maxWords: 400,
    teacherReviewRequired: true,
  });

  const generateMutation = useMutation({
    mutationFn: (data: GenerateContentForm) =>
      axios.post('/api/personalized-content/generate', {
        student_id: studentId,
        ...data,
      }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateMutation.mutate(form);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Generar Contenido Personalizado</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objetivo de aprendizaje
          </label>
          <textarea
            value={form.objective}
            onChange={(e) => setForm({ ...form, objective: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows={3}
            placeholder="¿Qué quieres que aprenda el estudiante?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nivel
          </label>
          <select
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value as any })}
            className="w-full p-2 border rounded-md"
          >
            <option value="básico">Básico</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiempo de sesión (minutos)
            </label>
            <input
              type="number"
              value={form.sessionTimeMinutes}
              onChange={(e) =>
                setForm({ ...form, sessionTimeMinutes: parseInt(e.target.value) })
              }
              min={5}
              max={60}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Máximo de palabras
            </label>
            <input
              type="number"
              value={form.maxWords}
              onChange={(e) =>
                setForm({ ...form, maxWords: parseInt(e.target.value) })
              }
              min={100}
              max={1000}
              step={50}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="review"
            checked={form.teacherReviewRequired}
            onChange={(e) =>
              setForm({ ...form, teacherReviewRequired: e.target.checked })
            }
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor="review" className="ml-2 text-sm text-gray-700">
            Requiere revisión del docente
          </label>
        </div>

        <button
          type="submit"
          disabled={generateMutation.isLoading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            generateMutation.isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {generateMutation.isLoading ? 'Generando...' : 'Generar contenido'}
        </button>
      </form>

      {generateMutation.isSuccess && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <p className="text-green-700">
            ¡Contenido generado! ID: {generateMutation.data.data.content_id}
          </p>
          <p className="text-sm text-green-600">
            Estado: {generateMutation.data.data.status}
          </p>
        </div>
      )}

      {generateMutation.isError && (
        <div className="mt-6 p-4 bg-red-50 rounded-md">
          <p className="text-red-700">
            Error al generar el contenido. Por favor intenta de nuevo.
          </p>
        </div>
      )}
    </div>
  );
}