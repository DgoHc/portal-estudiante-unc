import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiLogin } from '../api';

interface Student {
  id: string;
  name: string;
  code: string;
  career: string;
  semester: number;
  email: string;
  phone: string;
}

interface AuthContextType {
  student: Student | null;
  isAuthenticated: boolean;
  login: (code: string, password: string) => Promise<boolean>;
  logout: () => void;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockStudent: Student = {
  id: '1',
  name: 'Juan Carlos Pérez López',
  code: '202015001',
  career: 'Ingeniería de Sistemas',
  semester: 8,
  email: '202015001@unc.edu.pe',
  phone: '+51 976 123 456'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth');
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.student && saved?.isAuthenticated) {
          setStudent(saved.student);
          setIsAuthenticated(true);
        }
      }
    } catch {}
    setIsReady(true);
  }, []);

  const login = async (code: string, password: string): Promise<boolean> => {
    try {
      const { student } = await apiLogin(code, password);
      setStudent({
        id: student.id,
        name: student.name,
        code: student.code,
        career: student.career,
        semester: student.semester,
        email: student.email,
        phone: student.phone,
      });
      setIsAuthenticated(true);
      try { localStorage.setItem('auth', JSON.stringify({ student: {
        id: student.id,
        name: student.name,
        code: student.code,
        career: student.career,
        semester: student.semester,
        email: student.email,
        phone: student.phone,
      }, isAuthenticated: true })); } catch {}
      return true;
    } catch (_e) {
      // fallback: allow demo login with mock if matches demo credentials
      if (code === '202015001' && password === 'password') {
        setStudent(mockStudent);
        setIsAuthenticated(true);
        try { localStorage.setItem('auth', JSON.stringify({ student: mockStudent, isAuthenticated: true })); } catch {}
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setStudent(null);
    setIsAuthenticated(false);
    try { localStorage.removeItem('auth'); } catch {}
  };

  return (
    <AuthContext.Provider value={{ student, isAuthenticated, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}