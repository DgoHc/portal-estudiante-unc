import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  login: (code: string, password: string) => boolean;
  logout: () => void;
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
  const [student, setStudent] = useState<Student | null>(mockStudent);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (code: string, password: string): boolean => {
    if (code === '202015001' && password === 'password') {
      setStudent(mockStudent);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setStudent(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ student, isAuthenticated, login, logout }}>
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