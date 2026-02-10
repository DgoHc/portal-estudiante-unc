import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

export function LoginForm() {
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [roleValue, setRoleValue] = React.useState('student');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const quickLogin = async (demoCode: string, demoPassword: string, demoRole: string) => {
    setError('');
    setIsLoading(true);
    try {
      const success = await login(demoCode, demoPassword, demoRole as UserRole);
      if (success) {
        if (demoRole === 'teacher') {
          navigate('/teacher');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Error al iniciar sesión.');
      }
    } catch (err) {
      setError('Error al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const trimmedCode = code.trim();
      const trimmedPassword = password.trim();
      
      console.log('Submitting with:', { code: trimmedCode, password: trimmedPassword, roleValue });
      
      const success = await login(trimmedCode, trimmedPassword, roleValue as UserRole);
      if (success) {
        if (roleValue === 'teacher') {
          navigate('/teacher');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Credenciales inválidas. Por favor verifica tu usuario y contraseña.');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión - Zadkiel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Colegio Angelitos de Dios
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {/* Role Selection */}
          <div className="flex gap-4 justify-center">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="student"
                checked={roleValue === 'student'}
                onChange={(e) => setRoleValue(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Estudiante</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={roleValue === 'teacher'}
                onChange={(e) => setRoleValue(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Profesor</span>
            </label>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="code" className="sr-only">
                {roleValue === 'student' ? 'Código de estudiante' : 'Código de profesor'}
              </label>
              <input
                id="code"
                name="code"
                type="text"
                autoComplete="username"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={roleValue === 'student' ? 'Ej: 202015001' : 'Ej: PROF001'}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          {/* Credentials Help */}
          <div className="text-xs text-gray-500 space-y-1">
            {roleValue === 'student' ? (
              <>
                <p><strong>Demo Estudiante:</strong></p>
                <p>Código: 202015001</p>
                <p>Contraseña: password</p>
              </>
            ) : (
              <>
                <p><strong>Demo Profesor:</strong></p>
                <p>Código: PROF001</p>
                <p>Contraseña: profesor123</p>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Cargando...' : 'Ingresar'}
            </button>
          </div>

          {/* Demo Buttons - Hidden but accessible */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center mb-2">Acceso Rápido (Demo)</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => quickLogin('202015001', 'password', 'student')}
                disabled={isLoading}
                className="flex-1 text-xs py-1 px-2 rounded text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors disabled:opacity-50"
              >
                📚 Estudiante
              </button>
              <button
                type="button"
                onClick={() => quickLogin('PROF001', 'profesor123', 'teacher')}
                disabled={isLoading}
                className="flex-1 text-xs py-1 px-2 rounded text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors disabled:opacity-50"
              >
                👨‍🏫 Profesor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}