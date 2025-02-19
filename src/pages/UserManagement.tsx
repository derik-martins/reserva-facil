import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { User, Mail, Trash2, Shield, UserPlus, Edit } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';
import { useAuth } from '../lib/AuthContext';
import { Navigate } from 'react-router-dom';
import { UserModal } from '../components/UserModal';

interface Profile {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  created_at: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, navigate } = useAuth();
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Profile | undefined>();

  useEffect(() => {
    checkAdminStatus();
    loadUsers();
  }, []);

  async function checkAdminStatus() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Erro ao verificar status de admin:', error);
        setCurrentUserIsAdmin(false);
        navigate('/dashboard');
        return;
      }

      const isAdmin = data?.is_admin || false;
      setCurrentUserIsAdmin(isAdmin);

      if (!isAdmin) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro ao verificar status de admin:', error);
      setCurrentUserIsAdmin(false);
      navigate('/dashboard');
    }
  }

  async function loadUsers() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar usuários:', error);
        throw error;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar usuários.');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteUser(userId: string) {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      // Primeiro deletar o perfil
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      // Depois deletar o usuário da autenticação
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);

      if (authError) throw authError;
      
      toast.success('Usuário excluído com sucesso!');
      loadUsers();
    } catch (error) {
      toast.error('Erro ao excluir usuário.');
    }
  }

  async function toggleAdmin(userId: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);

      if (error) throw error;
      
      toast.success('Status de administrador atualizado com sucesso!');
      loadUsers();
    } catch (error) {
      toast.error('Erro ao atualizar status de administrador.');
    }
  }

  const handleEditUser = (user: Profile) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A]">Gerenciamento de Usuários</h1>
          <p className="text-gray-600 mt-2">
            Gerencie todos os usuários do sistema
          </p>
        </div>
        <Button onClick={handleAddUser}>
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Cadastro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {profile.name || 'Sem nome'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {profile.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      profile.is_admin 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {profile.is_admin ? 'Administrador' : 'Usuário'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEditUser(profile)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={profile.is_admin ? "warning" : "primary"}
                        size="sm"
                        onClick={() => toggleAdmin(profile.id, profile.is_admin)}
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteUser(profile.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(undefined);
        }}
        onSuccess={loadUsers}
        editingUser={editingUser}
      />
    </div>
  );
} 