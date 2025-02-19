import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Reservation } from '../types';
import { Button } from '../components/Button';

export function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, []);

  async function loadReservations() {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          *,
          resource:resources(*),
          user:profiles(*)
        `)
        .order('start_time', { ascending: true });

      if (error) throw error;

      setReservations(data || []);
    } catch (error) {
      toast.error('Erro ao carregar reservas.');
    } finally {
      setIsLoading(false);
    }
  }

  function getStatusColor(status: Reservation['status']) {
    switch (status) {
      case 'confirmed':
        return 'bg-[#7ED321] text-white';
      case 'pending':
        return 'bg-[#F8E71C] text-black';
      case 'cancelled':
        return 'bg-[#D0021B] text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#4A4A4A]">Carregando reservas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#4A4A4A]">Minhas Reservas</h1>
        <Button>Nova Reserva</Button>
      </div>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#4A4A4A] mb-1">
                  {reservation.resource.name}
                </h2>
                <p className="text-sm text-[#4A4A4A]">
                  {format(new Date(reservation.start_time), "dd 'de' MMMM', às' HH:mm", { locale: ptBR })}
                  {' - '}
                  {format(new Date(reservation.end_time), "HH:mm", { locale: ptBR })}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                {reservation.status === 'confirmed' && 'Confirmada'}
                {reservation.status === 'pending' && 'Pendente'}
                {reservation.status === 'cancelled' && 'Cancelada'}
              </span>
            </div>

            <div className="flex justify-end gap-2">
              {reservation.status === 'pending' && (
                <>
                  <Button variant="danger">Cancelar</Button>
                  <Button>Confirmar</Button>
                </>
              )}
              {reservation.status === 'confirmed' && (
                <Button variant="danger">Cancelar</Button>
              )}
            </div>
          </div>
        ))}

        {reservations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-[#4A4A4A]">Nenhuma reserva encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}