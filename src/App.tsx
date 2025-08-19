import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import ChatWidget from './components/ChatWidget';
import { LoginForm } from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Sidebar from './components/Sidebar';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated, isReady } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile/:code" element={<ProfilePage />} />
          <Route
            path="/dashboard"
            element={
              !isReady ? null : isAuthenticated ? (
                <div className="relative z-10 flex flex-col">
                  <Header />
                  <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-grow ml-0 md:ml-64 px-4 py-8 md:px-6 lg:px-8">
                      <Dashboard />
                    </main>
                  </div>
                  <ChatWidget />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;