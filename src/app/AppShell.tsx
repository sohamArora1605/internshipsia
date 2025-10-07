import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUser';
import { toggleTheme } from './theme';
import { getQueueLength } from '../core/offline';
import { Button } from '../features/shared/Button';
import { Badge } from '../features/shared/Badge';
import { ProfileSetup } from '../features/student/ProfileSetup';
import { ChatBubble } from '../features/shared/ChatBubble';
import { 
  Menu, X, Sun, Moon, Bell, User, LogOut, 
  BookOpen, Users, Building2, Settings,
  GraduationCap, UserCheck, Briefcase, Shield, Award, FileText
} from 'lucide-react';

export function AppShell() {
  const { user, logout, loadUser } = useUserStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [queueLength, setQueueLength] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileSetupLoaded, setProfileSetupLoaded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('prashi:token')) {
      loadUser();
    }
    
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    const updateQueueLength = () => setQueueLength(getQueueLength());
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    const interval = setInterval(updateQueueLength, 1000);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(interval);
    };
  }, [loadUser]);

  useEffect(() => {
    if (user && user.role === 'student' && !user.profileComplete && !profileSetupLoaded) {
      setShowProfileSetup(true);
      setProfileSetupLoaded(true);
    }
  }, [user, profileSetupLoaded]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setIsDark(newTheme === 'dark');
  };

  const getNavItems = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'student':
        return [
          { to: '/dashboard', icon: GraduationCap, label: 'Dashboard' },
          { to: '/s/browse', icon: BookOpen, label: 'Browse Internships' },
          { to: '/s/applications', icon: Briefcase, label: 'Applications' },
          { to: '/s/logbook', icon: BookOpen, label: 'Logbook' },
          { to: '/s/reports', icon: BookOpen, label: 'Reports' },
          { to: '/s/certificates', icon: Shield, label: 'Certificates' },
          { to: '/s/learning', icon: BookOpen, label: 'Learning Center' },
          { to: '/s/habits', icon: Award, label: 'Habit Tracker' },
          { to: '/s/pods', icon: Users, label: 'Study Pods' },
          { to: '/s/notes', icon: FileText, label: 'My Notes' },

        ];
      case 'faculty':
        return [
          { to: '/dashboard', icon: UserCheck, label: 'Dashboard' },
          { to: '/f/mentees', icon: Users, label: 'Mentees' },
          { to: '/f/approvals', icon: UserCheck, label: 'Approvals' },
          { to: '/f/credits', icon: Shield, label: 'Credits' },
        ];
      case 'industry':
        return [
          { to: '/dashboard', icon: Building2, label: 'Dashboard' },
          { to: '/i/postings', icon: Briefcase, label: 'Postings' },
          { to: '/i/applicants', icon: Users, label: 'Applicants' },
        ];
      case 'admin':
        return [
          { to: '/dashboard', icon: Settings, label: 'Dashboard' },
          { to: '/a/colleges', icon: GraduationCap, label: 'Colleges' },
          { to: '/a/companies', icon: Building2, label: 'Companies' },
          { to: '/a/directory', icon: BookOpen, label: 'Directory' },
          { to: '/a/verification', icon: Shield, label: 'Verification' },
          { to: '/a/settings', icon: Settings, label: 'Settings' },
        ];
      default:
        return [];
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/dashboard" className="text-xl font-bold text-brand-600">
              Prashikshan
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Online/Offline Status */}
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isOnline ? 'Online' : 'Offline'}
              </span>
              {queueLength > 0 && (
                <Badge variant="warning">{queueLength} queued</Badge>
              )}
            </div>

            <Button variant="ghost" size="sm" onClick={handleThemeToggle}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-2">
              <Link to="/profile" className="relative">
                <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white font-medium text-sm hover:bg-brand-700 transition-colors">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {!user.profileComplete && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </Link>
              <div className="text-sm">
                <div className="font-medium">{user.name}</div>
                <div className="text-gray-500 capitalize">{user.role}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-200 ease-in-out`}>
          <nav className="p-4 space-y-2 mt-16 lg:mt-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Chat Bubble */}
        <ChatBubble />
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Profile Setup Modal */}
      {user?.role === 'student' && (
        <ProfileSetup 
          isOpen={showProfileSetup} 
          onClose={() => {
            setShowProfileSetup(false);
            setProfileSetupLoaded(true);
          }} 
        />
      )}
    </div>
  );
}