import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, LogOut, Menu, X, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  async function checkAdminStatus() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setIsAdmin(data?.is_admin || false);
    } catch (error) {
      console.error('Erro ao verificar status de admin:', error);
      setIsAdmin(false);
    }
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/reservations', label: 'Minhas Reservas' },
    { path: '/resources', label: 'Recursos' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center text-xl font-bold text-blue-600"
            >
              Sistema de Reservas
            </Link>
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/dashboard"
                  className={`border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === '/dashboard' ? 'border-blue-500 text-blue-600' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/resources"
                  className={`border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === '/resources' ? 'border-blue-500 text-blue-600' : ''
                  }`}
                >
                  Recursos
                </Link>
                <Link
                  to="/reservations"
                  className={`border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === '/reservations' ? 'border-blue-500 text-blue-600' : ''
                  }`}
                >
                  Reservas
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/users"
                    className={`border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      location.pathname === '/admin/users' ? 'border-blue-500 text-blue-600' : ''
                    }`}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Usuários
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Registrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}