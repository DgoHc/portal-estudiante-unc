import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiLogin } from '../api';
import { LearningProfile } from '../services/diagnosticEngine';
import { PersonalizedContentPlan } from '../services/contentRecommendation';

export type UserRole = 'student' | 'teacher';

interface Student {
  id: string;
  name: string;
  code: string;
  grade: string;
  mathLevel: 'básico' | 'intermedio' | 'avanzado';
  communicationLevel: 'básico' | 'intermedio' | 'avanzado';
  logicLevel: 'básico' | 'intermedio' | 'avanzado';
  verbalLevel: 'básico' | 'intermedio' | 'avanzado';
  spatialLevel: 'básico' | 'intermedio' | 'avanzado';
  assessmentCompleted: boolean;
  diagnosticProfile?: LearningProfile;
  contentPlan?: PersonalizedContentPlan;
  email: string;
  phone: string;
}

interface Teacher {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  department: string;
  courses: string[];
}

interface AuthContextType {
  student: Student | null;
  teacher: Teacher | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  login: (code: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  updateAssessment: (mathLevel: 'básico' | 'intermedio' | 'avanzado', commLevel: 'básico' | 'intermedio' | 'avanzado', logicLevel: 'básico' | 'intermedio' | 'avanzado', verbalLevel: 'básico' | 'intermedio' | 'avanzado', spatialLevel: 'básico' | 'intermedio' | 'avanzado') => void;
  updateDiagnosticProfile: (profile: LearningProfile, contentPlan: PersonalizedContentPlan) => void;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockStudent: Student = {
  id: '1',
  name: 'Juan Carlos Pérez López',
  code: '202015001',
  grade: '3ro de Secundaria',
  mathLevel: 'intermedio',
  communicationLevel: 'básico',
  logicLevel: 'intermedio',
  verbalLevel: 'básico',
  spatialLevel: 'avanzado',
  assessmentCompleted: false,
  email: '202015001@colegio.edu.pe',
  phone: '+51 976 123 456'
};

const mockTeacher: Teacher = {
  id: 'T001',
  name: 'Prof. Carlos Mendoza García',
  code: 'PROF001',
  email: 'carlos.mendoza@colegio.edu.pe',
  phone: '+51 987 654 321',
  department: 'Matemática y Ciencias',
  courses: ['3ro de Secundaria - Matemática A', '3ro de Secundaria - Matemática B']
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth');
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.isAuthenticated) {
          if (saved?.student) {
            setStudent(saved.student);
            setUserRole('student');
          } else if (saved?.teacher) {
            setTeacher(saved.teacher);
            setUserRole('teacher');
          }
          setIsAuthenticated(true);
        }
      }
    } catch {}
    setIsReady(true);
  }, []);

  const login = async (code: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      console.log('Login attempt:', { code, password, role });
      // ESTUDIANTE
      if (role === 'student') {
        // Validación demo
        console.log('Student validation:', { code: '202015001', password: 'password', match: code === '202015001' && password === 'password' });
        if (code === '202015001' && password === 'password') {
          console.log('Student login successful');
          setStudent(mockStudent);
          setTeacher(null);
          setUserRole('student');
          setIsAuthenticated(true);
          localStorage.setItem('auth', JSON.stringify({
            student: mockStudent,
            teacher: null,
            userRole: 'student',
            isAuthenticated: true
          }));
          return true;
        }
        // Intenta API como fallback
        try {
          const { student: apiStudent } = await apiLogin(code, password);
          const studentData: Student = {
            id: apiStudent.id,
            name: apiStudent.name,
            code: apiStudent.code,
            grade: apiStudent.career || '1ro de Secundaria',
            mathLevel: 'básico',
            communicationLevel: 'básico',
            logicLevel: 'básico',
            verbalLevel: 'básico',
            spatialLevel: 'básico',
            assessmentCompleted: false,
            email: apiStudent.email,
            phone: apiStudent.phone,
          };
          setStudent(studentData);
          setTeacher(null);
          setUserRole('student');
          setIsAuthenticated(true);
          localStorage.setItem('auth', JSON.stringify({
            student: studentData,
            teacher: null,
            userRole: 'student',
            isAuthenticated: true
          }));
          return true;
        } catch {
          return false;
        }
      }
      // PROFESOR
      else if (role === 'teacher') {
        if (code === 'PROF001' && password === 'profesor123') {
          setStudent(null);
          setTeacher(mockTeacher);
          setUserRole('teacher');
          setIsAuthenticated(true);
          localStorage.setItem('auth', JSON.stringify({
            student: null,
            teacher: mockTeacher,
            userRole: 'teacher',
            isAuthenticated: true
          }));
          return true;
        }
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
    return false;
  };

  const updateAssessment = (mathLevel: 'básico' | 'intermedio' | 'avanzado', commLevel: 'básico' | 'intermedio' | 'avanzado', logicLevel: 'básico' | 'intermedio' | 'avanzado', verbalLevel: 'básico' | 'intermedio' | 'avanzado', spatialLevel: 'básico' | 'intermedio' | 'avanzado') => {
    if (student) {
      const updatedStudent = { ...student, mathLevel, communicationLevel: commLevel, logicLevel, verbalLevel, spatialLevel, assessmentCompleted: true };
      setStudent(updatedStudent);
      try {
        localStorage.setItem('auth', JSON.stringify({
          student: updatedStudent,
          teacher: null,
          userRole: 'student',
          isAuthenticated: true
        }));
      } catch {}
    }
  };

  const updateDiagnosticProfile = (profile: LearningProfile, contentPlan: PersonalizedContentPlan) => {
    if (student) {
      const updatedStudent = {
        ...student,
        diagnosticProfile: profile,
        contentPlan: contentPlan,
        assessmentCompleted: true,
      };
      setStudent(updatedStudent);
      try {
        localStorage.setItem('auth', JSON.stringify({
          student: updatedStudent,
          teacher: null,
          userRole: 'student',
          isAuthenticated: true
        }));
      } catch {}
    }
  };

  const logout = () => {
    setStudent(null);
    setTeacher(null);
    setUserRole(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('auth');
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        teacher,
        userRole,
        isAuthenticated,
        login,
        logout,
        updateAssessment,
        updateDiagnosticProfile,
        isReady
      }}
    >
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