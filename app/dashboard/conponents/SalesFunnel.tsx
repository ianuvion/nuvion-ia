'use client';

import {
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const DATA = [
  { name: 'Leads', value: 1000 },
  { name: 'Contactados', value: 600 },
  { name: 'Calificados', value: 250 },
  { name: 'Ventas', value: 80 },
];

export default function SalesFunnel() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="mb-4 text-base font-semibold text-gray-900">
        Embudo de ventas
      </h3>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={DATA} isAnimationActive>
              <LabelList
                position="right"
                formatter={(value: number, entry: any) =>
                  ${entry.name}: ${value}
                }
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
create SalesFunnel component
