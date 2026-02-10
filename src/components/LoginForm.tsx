import React, { useState } from 'react';
import { GraduationCap, User, Lock, Eye, EyeOff, Shield, BookOpen, Users, Award } from 'lucide-react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [roleValue, setRoleValue] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const trimmedCode = code.trim();
    const trimmedPassword = password.trim();
    const success = await login(trimmedCode, trimmedPassword, roleValue as UserRole);
    if (success) {
      if (roleValue === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Código o contraseña incorrectos');
    }
    setIsLoading(false);
  };

  const quickLogin = async (demoCode: string, demoPassword: string, demoRole: string) => {
    setError('');
    setIsLoading(true);
    const success = await login(demoCode, demoPassword, demoRole as UserRole);
    if (success) {
      if (demoRole === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Error en acceso rápido');
    }
    setIsLoading(false);
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Gestión Académica',
      description: 'Consulta notas, horarios y progreso'
    },
    {
      icon: Users,
      title: 'Comunidad Estudiantil',
      description: 'Conecta con compañeros y profesores'
    },
    {
      icon: Award,
      title: 'Certificaciones',
      description: 'Accede a documentos oficiales'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Features */}
        <div className="hidden lg:block text-gray-200">
          <div className="mb-8">
            <div className="w-24 h-24 bg-blue-700 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Portal Estudiante</h1>
            <p className="text-2xl text-blue-300 mb-2">Colegio Secundario</p>
            <p className="text-lg text-blue-400">Colegio Secundario</p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                  <feature.icon className="w-6 h-6 text-blue-200" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-blue-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-200">¿Por qué elegirnos?</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Plataforma moderna y fácil de usar</li>
              <li>• Información académica en tiempo real</li>
              <li>• Soporte técnico 24/7</li>
              <li>• Acceso desde cualquier dispositivo</li>
            </ul>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-20 h-20 bg-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Portal Estudiante</h1>
            <p className="text-blue-300">Colegio Secundario</p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">Iniciar Sesión</h2>
              <p className="text-gray-400">Accede a tu información académica</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  ¿Eres estudiante o profesor?
                </label>
                <div className="flex gap-3">
                  <label className="flex-1 flex items-center justify-center py-3 px-4 border-2 rounded-xl cursor-pointer transition-all"
                    style={{
                      borderColor: roleValue === 'student' ? '#2563eb' : '#374151',
                      backgroundColor: roleValue === 'student' ? 'rgba(37, 99, 235, 0.1)' : 'transparent'
                    }}>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={roleValue === 'student'}
                      onChange={(e) => setRoleValue(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-200">📚 Estudiante</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center py-3 px-4 border-2 rounded-xl cursor-pointer transition-all"
                    style={{
                      borderColor: roleValue === 'teacher' ? '#2563eb' : '#374151',
                      backgroundColor: roleValue === 'teacher' ? 'rgba(37, 99, 235, 0.1)' : 'transparent'
                    }}>
                    <input
                      type="radio"
                      name="role"
                      value="teacher"
                      checked={roleValue === 'teacher'}
                      onChange={(e) => setRoleValue(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-200">👨‍🏫 Profesor</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Código de Estudiante
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-gray-200 placeholder-gray-500"
                    placeholder="Ej: 202015001"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-gray-200 placeholder-gray-500"
                    placeholder="Tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-900 border border-red-700 rounded-xl p-4">
                  <p className="text-red-300 text-sm font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
                <h3 className="font-semibold text-blue-200 mb-3">Datos de prueba:</h3>
                <div className="space-y-2">
                  {roleValue === 'student' ? (
                    <>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Código:</span> 
                        <span className="font-mono bg-gray-600 px-2 py-1 rounded ml-2 text-gray-100">202015001</span>
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Contraseña:</span> 
                        <span className="font-mono bg-gray-600 px-2 py-1 rounded ml-2 text-gray-100">password</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Código:</span> 
                        <span className="font-mono bg-gray-600 px-2 py-1 rounded ml-2 text-gray-100">PROF001</span>
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Contraseña:</span> 
                        <span className="font-mono bg-gray-600 px-2 py-1 rounded ml-2 text-gray-100">profesor123</span>
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Login Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => quickLogin('202015001', 'password', 'student')}
                  disabled={isLoading}
                  className="text-xs py-2 px-2 rounded bg-gray-600 text-gray-200 hover:bg-gray-500 transition-all disabled:opacity-50"
                >
                  📚 Entrar como Estudiante
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin('PROF001', 'profesor123', 'teacher')}
                  disabled={isLoading}
                  className="text-xs py-2 px-2 rounded bg-gray-600 text-gray-200 hover:bg-gray-500 transition-all disabled:opacity-50"
                >
                  👨‍🏫 Entrar como Profesor
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-200 font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
              <div className="mt-3">
                <a href="/register" className="text-sm text-blue-400 hover:text-blue-200 font-medium transition-colors">
                  ¿No tienes cuenta? Regístrate
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              © 2026 Derechos Reservados Zahkiel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}