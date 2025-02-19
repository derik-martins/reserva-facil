import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Box, Clock, Users } from 'lucide-react';
import { Button } from '../components/Button';

export function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
          Bem-vindo ao ReservaFácil
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sistema simples e eficiente para gerenciamento de reservas de recursos e espaços
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="card p-8 group">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-blue-50 text-[#4A90E2] group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-[#4A4A4A]">Minhas Reservas</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Visualize e gerencie todas as suas reservas em um só lugar, com status em tempo real.
          </p>
          <Link to="/reservations">
            <Button fullWidth>Ver Minhas Reservas</Button>
          </Link>
        </div>

        <div className="card p-8 group">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-blue-50 text-[#4A90E2] group-hover:scale-110 transition-transform">
              <Box className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-[#4A4A4A]">Recursos</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Explore os recursos disponíveis para reserva, com detalhes e disponibilidade.
          </p>
          <Link to="/resources">
            <Button fullWidth>Ver Recursos</Button>
          </Link>
        </div>

        <div className="card p-8 group md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-blue-50 text-[#4A90E2] group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-[#4A4A4A]">Agendamento</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Faça reservas de forma rápida e simples, escolhendo o melhor horário.
          </p>
          <Link to="/resources">
            <Button fullWidth>Fazer Reserva</Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8">Por que usar o ReservaFácil?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#4A90E2]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Agendamento Simples</h3>
            <p className="text-gray-600">Reserve recursos em poucos cliques</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#4A90E2]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Gestão Eficiente</h3>
            <p className="text-gray-600">Acompanhe todas as suas reservas</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#4A90E2]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Colaborativo</h3>
            <p className="text-gray-600">Compartilhe recursos facilmente</p>
          </div>
        </div>
      </div>
    </div>
  );
}