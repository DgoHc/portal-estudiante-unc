/**
 * COMPONENTE: REPORTE DIAGNÓSTICO CON GRÁFICOS
 * Visualiza resultados y recomendaciones personalizadas
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { LearningProfile } from '../services/diagnosticEngine';
import { TrendingUp, AlertCircle, Star, Target } from 'lucide-react';

interface DiagnosticReportProps {
  profile: LearningProfile;
  onContinue: () => void;
}

export function DiagnosticReport({
  profile,
  onContinue,
}: DiagnosticReportProps) {
  const [expandedCompetency, setExpandedCompetency] = useState<string | null>(
    null
  );

  // Preparar datos para gráficos
  const competencyData = [
    ...profile.mathematicsProfile.competencies,
    ...profile.communicationProfile.competencies,
  ].map(c => ({
    name: c.name.substring(0, 15),
    score: c.score,
    competency: c.competency,
  }));

  const mathRadarData = profile.mathematicsProfile.competencies.map(c => ({
    subject: c.name.substring(0, 12),
    score: c.score,
    fullMark: 100,
  }));

  const commRadarData = profile.communicationProfile.competencies.map(c => ({
    subject: c.name.substring(0, 12),
    score: c.score,
    fullMark: 100,
  }));

  const getColorByScore = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Tu Diagnóstico Personalizado
              </h1>
              <p className="text-gray-600 mt-2">
                Resultados detallados de tu evaluación
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-blue-600">
                {profile.overallScore}%
              </div>
              <p className="text-gray-600 font-medium capitalize">
                Nivel: {profile.overallLevel}
              </p>
            </div>
          </div>

          {/* Score cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">Matemática</h3>
                <span className="text-3xl font-bold text-blue-600">
                  {profile.mathematicsProfile.overallScore}%
                </span>
              </div>
              <p className="text-sm text-gray-600 capitalize">
                Nivel: {profile.mathematicsProfile.level}
              </p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{
                    width: `${profile.mathematicsProfile.overallScore}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Comunicación
                </h3>
                <span className="text-3xl font-bold text-indigo-600">
                  {profile.communicationProfile.overallScore}%
                </span>
              </div>
              <p className="text-sm text-gray-600 capitalize">
                Nivel: {profile.communicationProfile.level}
              </p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all"
                  style={{
                    width: `${profile.communicationProfile.overallScore}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de barras - Todas las competencias */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Desempeño por Competencia
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={competencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {competencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColorByScore(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Radar - Matemática */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Perfil Matemática
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={mathRadarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis stroke="#6b7280" />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Radar - Comunicación */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Perfil Comunicación
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={commRadarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis stroke="#6b7280" />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Fortalezas y Debilidades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Fortalezas */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-900">
                  Tus Fortalezas
                </h3>
              </div>
              <div className="space-y-3">
                {profile.strengths.length > 0 ? (
                  profile.strengths.map((strength, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                    >
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-gray-800 font-medium">
                        {strength}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Sigue practicando</p>
                )}
              </div>
            </div>

            {/* Debilidades */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-gray-900">
                  Áreas para Mejorar
                </h3>
              </div>
              <div className="space-y-3">
                {profile.weaknesses.length > 0 ? (
                  profile.weaknesses.map((weakness, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-800 font-medium">
                        {weakness}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Muy bien distribuido</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detalles por Competencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Análisis Detallado
          </h2>

          {/* Matemática */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              📊 Matemática
            </h3>
            <div className="space-y-4">
              {profile.mathematicsProfile.competencies.map((comp) => (
                <div key={comp.competency}>
                  <button
                    onClick={() =>
                      setExpandedCompetency(
                        expandedCompetency === comp.competency
                          ? null
                          : comp.competency
                      )
                    }
                    className="w-full text-left p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all border border-blue-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {comp.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {comp.questionsCorrect}/{comp.questionsTotal} correctas
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {comp.score}%
                        </div>
                        <p className="text-sm text-gray-600 capitalize">
                          {comp.level}
                        </p>
                      </div>
                    </div>
                  </button>

                  {expandedCompetency === comp.competency && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-blue-50 border-l-4 border-blue-600"
                    >
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-700 mb-2">
                          Recomendaciones:
                        </p>
                        <ul className="space-y-2">
                          {comp.recommendations.map((rec, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-700 flex gap-2"
                            >
                              <span className="text-blue-600">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Comunicación */}
          <div>
            <h3 className="text-lg font-bold text-indigo-900 mb-4">
              💬 Comunicación
            </h3>
            <div className="space-y-4">
              {profile.communicationProfile.competencies.map((comp) => (
                <div key={comp.competency}>
                  <button
                    onClick={() =>
                      setExpandedCompetency(
                        expandedCompetency === comp.competency
                          ? null
                          : comp.competency
                      )
                    }
                    className="w-full text-left p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all border border-indigo-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {comp.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {comp.questionsCorrect}/{comp.questionsTotal} correctas
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600">
                          {comp.score}%
                        </div>
                        <p className="text-sm text-gray-600 capitalize">
                          {comp.level}
                        </p>
                      </div>
                    </div>
                  </button>

                  {expandedCompetency === comp.competency && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-indigo-50 border-l-4 border-indigo-600"
                    >
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-700 mb-2">
                          Recomendaciones:
                        </p>
                        <ul className="space-y-2">
                          {comp.recommendations.map((rec, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-700 flex gap-2"
                            >
                              <span className="text-indigo-600">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Información Adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-gray-900">Estilo de Aprendizaje</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 capitalize">
              {profile.learningStyle}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-gray-900">Ritmo Sugerido</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 capitalize">
              {profile.suggestedPace}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
              <h3 className="font-bold text-gray-900">Rutas Creadas</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {profile.personalizedPath.length}
            </p>
          </div>
        </motion.div>

        {/* Botón Continuar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={onContinue}
            className="inline-block px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full hover:shadow-xl transition-all"
          >
            Ver Mi Ruta de Aprendizaje
          </button>
        </motion.div>
      </div>
    </div>
  );
}
