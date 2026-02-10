/**
 * COMPONENTE: CONTENIDO PERSONALIZADO
 * Muestra rutas de aprendizaje y recursos recomendados
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LearningProfile,
  LearningPath,
  CompetencyProfile,
} from '../services/diagnosticEngine';
import {
  PersonalizedContentPlan,
  ContentResource,
} from '../services/contentRecommendation';
import {
  BookOpen,
  Clock,
  Target,
  Video,
  Zap,
  CheckCircle,
  Play,
  Award,
} from 'lucide-react';

interface PersonalizedContentProps {
  profile: LearningProfile;
  contentPlan: PersonalizedContentPlan;
  onSelectResource: (resource: ContentResource) => void;
  onStartTutoring: () => void;
}

export function PersonalizedContent({
  profile,
  contentPlan,
  onSelectResource,
  onStartTutoring,
}: PersonalizedContentProps) {
  const [activeTab, setActiveTab] = useState<
    'rutas' | 'recursos' | 'horario' | 'hitos'
  >('rutas');
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tu Ruta Personalizada
          </h1>
          <p className="text-gray-600">
            Plan de aprendizaje diseñado específicamente para ti
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'rutas', label: 'Rutas', icon: Target },
            { id: 'recursos', label: 'Recursos', icon: BookOpen },
            { id: 'horario', label: 'Horario', icon: Clock },
            { id: 'hitos', label: 'Hitos', icon: Award },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* RUTAS */}
        {activeTab === 'rutas' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6">
              {contentPlan.personalizedPath.length > 0 ? (
                contentPlan.personalizedPath.map((path) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedPath(
                          expandedPath === path.id ? null : path.id
                        )
                      }
                      className="w-full p-8 text-left hover:bg-gray-50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {path.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold ${
                                path.priority === 'alta'
                                  ? 'bg-red-100 text-red-700'
                                  : path.priority === 'media'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              Prioridad {path.priority}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">
                            {path.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-blue-600" />
                              {path.estimatedHours} horas
                            </div>
                            <div className="flex items-center gap-1">
                              <Video className="w-4 h-4 text-blue-600" />
                              {path.resources.videos} videos
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="w-4 h-4 text-blue-600" />
                              {path.resources.exercises} ejercicios
                            </div>
                            {path.resources.tutor && (
                              <div className="flex items-center gap-1">
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-bold text-xs">
                                  + Tutor IA
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-3xl ml-4">
                          {expandedPath === path.id ? '▼' : '▶'}
                        </div>
                      </div>

                      {/* Barra de dificultad */}
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-600 mb-1">
                          Nivel: {path.difficulty}
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              path.difficulty === 'básico'
                                ? 'bg-green-500 w-1/3'
                                : path.difficulty === 'intermedio'
                                ? 'bg-yellow-500 w-2/3'
                                : 'bg-red-500 w-full'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </button>

                    {/* Detalles expandidos */}
                    {expandedPath === path.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-gray-200 p-8 bg-gray-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-bold text-gray-900 mb-4">
                              Contenido
                            </h4>
                            <ul className="space-y-2">
                              {path.resources.videos > 0 && (
                                <li className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span>
                                    {path.resources.videos} video
                                    {path.resources.videos > 1 ? 's' : ''} educativo
                                    {path.resources.videos > 1 ? 's' : ''}
                                  </span>
                                </li>
                              )}
                              {path.resources.exercises > 0 && (
                                <li className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span>
                                    {path.resources.exercises} ejercicio
                                    {path.resources.exercises > 1 ? 's' : ''}{' '}
                                    práctico
                                    {path.resources.exercises > 1 ? 's' : ''}
                                  </span>
                                </li>
                              )}
                              {path.resources.quizzes > 0 && (
                                <li className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span>
                                    {path.resources.quizzes} cuestionario
                                    {path.resources.quizzes > 1 ? 's' : ''}
                                  </span>
                                </li>
                              )}
                              {path.resources.tutor && (
                                <li className="flex items-center gap-2 text-purple-700 font-bold">
                                  <CheckCircle className="w-4 h-4 text-purple-600" />
                                  <span>Sesiones con Tutor IA</span>
                                </li>
                              )}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900 mb-4">
                              Acciones
                            </h4>
                            <div className="space-y-3">
                              <button
                                onClick={() => {
                                  /* Implementar inicio de ruta */
                                }}
                                className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                              >
                                <Play className="w-4 h-4" />
                                Comenzar esta ruta
                              </button>
                              {path.resources.tutor && (
                                <button
                                  onClick={onStartTutoring}
                                  className="w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
                                >
                                  <Zap className="w-4 h-4" />
                                  Chat con Tutor IA
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                  <p className="text-gray-600">
                    Creando tus rutas personalizadas...
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* RECURSOS */}
        {activeTab === 'recursos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {contentPlan.recommendedResources.length > 0 ? (
              contentPlan.recommendedResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onSelectResource(resource)}
                  className="bg-white rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-all"
                >
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        resource.type === 'video'
                          ? 'bg-red-100 text-red-700'
                          : resource.type === 'ejercicio'
                          ? 'bg-blue-100 text-blue-700'
                          : resource.type === 'lectura'
                          ? 'bg-green-100 text-green-700'
                          : resource.type === 'interactivo'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {resource.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {resource.duration} min
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {resource.rating}
                    </div>
                  </div>

                  <button className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all">
                    Acceder
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-3xl shadow-xl p-12 text-center">
                <p className="text-gray-600">No hay recursos recomendados</p>
              </div>
            )}
          </motion.div>
        )}

        {/* HORARIO */}
        {activeTab === 'horario' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {contentPlan.weeklySchedule.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {day.day}
                  </h3>
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-full">
                    {day.totalTime} minutos
                  </span>
                </div>

                <div className="space-y-4">
                  {day.competencies.map((comp, i) => (
                    <div
                      key={i}
                      className="border-l-4 border-blue-600 pl-4 py-2"
                    >
                      <h4 className="font-bold text-gray-900 mb-2">
                        {comp.competency.replace(/_/g, ' ').toUpperCase()}
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {comp.activities.map((activity, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* HITOS */}
        {activeTab === 'hitos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {contentPlan.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Objetivo</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {milestone.targetScore}%
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Tiempo Estimado</p>
                    <p className="text-2xl font-bold text-green-600">
                      {milestone.estimatedDays} días
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Recompensa</p>
                    <p className="text-sm font-bold text-yellow-700">
                      {milestone.reward}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-bold text-gray-600 mb-2">
                    Progreso
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-0"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
