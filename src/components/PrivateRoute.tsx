import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function PrivateRoute({ children, requireAdmin = false }: PrivateRouteProps) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && requireAdmin) {
      checkAdminStatus();
    } else {
      setIsLoading(false);
    }
  }, [user, requireAdmin]);

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
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
} 