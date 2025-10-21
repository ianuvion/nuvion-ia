"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
} from "recharts";

const data = [
  { name: "Leads", value: 1200, fill: "#93c5fd" },
  { name: "Contactados", value: 800, fill: "#60a5fa" },
  { name: "Demos", value: 420, fill: "#3b82f6" },
  { name: "Cierres", value: 160, fill: "#1d4ed8" },
];

export default function SalesFunnel() {
  // Evita render en SSR/hidratación, y espera a que exista el DOM
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-gray-900">
          Embudo de ventas
        </h3>
      </div>

      {/* Contenedor con alto conocido para que ResponsiveContainer no reciba height=0 */}
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={data} isAnimationActive={false}>
              <LabelList position="right" fill="#111827" stroke="none" dataKey="name" />
              <LabelList position="inside" fill="#ffffff" stroke="none" dataKey="value" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
