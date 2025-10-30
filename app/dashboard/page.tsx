export const dynamic = 'force-dynamic';
export const revalidate = 0;
'use client';

import React from 'react';

export default function DashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Dashboard General</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Clientes Activos" value="24" color="bg-emerald-700/30" />
        <Card title="Embudos en Marcha" value="12" color="bg-indigo-700/30" />
        <Card title="Ventas Cerradas" value="87" color="bg-blue-700/30" />
        <Card title="Tasa de Conversión" value="12.4%" color="bg-purple-700/30" />
      </div>

      <div className="rounded-lg border border-[#233043] bg-[#0f1729] p-6">
        <h2 className="text-xl font-medium mb-4">Resumen General</h2>
        <p className="text-gray-300 leading-relaxed">
          Bienvenido al panel principal de <strong>Nuvion IA</strong>.  
          Desde aquí vas a poder ver de un vistazo tus resultados, rendimiento de embudos,  
          métricas de conversión y los avances de cada cliente o campaña.
        </p>
        <p className="mt-3 text-gray-400">
          Próximamente vas a tener integración con tus datos reales de ventas,  
          WhatsApp Business API y reportes automáticos.
        </p>
      </div>
    </main>
  );
}

function Card({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className={`rounded-xl p-5 border border-[#233043] ${color}`}>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-semibold">{value}</h3>
    </div>
  );
}
