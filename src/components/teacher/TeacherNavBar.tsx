import { Home, Users, BookOpen, FileText, LogOut } from 'lucide-react';

interface TeacherNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export function TeacherNavBar({ activeTab, onTabChange, onLogout }: TeacherNavBarProps) {
  const tabs = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'students',
      name: 'Estudiantes',
      icon: Users,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'courses',
      name: 'Cursos',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'reports',
      name: 'Reportes',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ZA</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Zahkiel - Profesor</span>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-semibold text-sm">{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-semibold"
          >
            <LogOut size={20} />
            <span className="hidden md:inline">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
