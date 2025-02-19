import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Box, Users, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Resource } from '../types';
import { Button } from '../components/Button';

export function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'room' | 'equipment'>('all');

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setResources(data || []);
    } catch (error) {
      toast.error('Erro ao carregar recursos.');
    } finally {
      setIsLoading(false);
    }
  }

  const filteredResources = resources.filter(
    (resource) => filter === 'all' || resource.type === filter
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#4A4A4A]">
            Recursos Disponíveis
          </h1>
          <p className="text-gray-600 mt-2">
            Encontre e reserve os recursos que você precisa
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex rounded-lg border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[#4A90E2] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('room')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'room'
                  ? 'bg-[#4A90E2] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Salas
            </button>
            <button
              onClick={() => setFilter('equipment')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'equipment'
                  ? 'bg-[#4A90E2] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Equipamentos
            </button>
          </div>
          <Button>Novo Recurso</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="card overflow-hidden group">
            <div className="aspect-video bg-blue-50 flex items-center justify-center">
              {resource.type === 'room' ? (
                <Users className="w-12 h-12 text-[#4A90E2] opacity-50" />
              ) : (
                <Box className="w-12 h-12 text-[#4A90E2] opacity-50" />
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#4A4A4A] mb-2">
                    {resource.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {resource.description}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#4A90E2]">
                  {resource.type === 'room' ? 'Sala' : 'Equipamento'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                <span>Disponível agora</span>
              </div>
              <Button fullWidth>Reservar</Button>
            </div>
          </div>
        ))}

        {filteredResources.length === 0 && (
          <div className="col-span-full text-center py-12 card">
            <Box className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum recurso disponível.</p>
          </div>
        )}
      </div>
    </div>
  );
}