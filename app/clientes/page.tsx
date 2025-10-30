export const dynamic = 'force-dynamic';
export const revalidate = 0;
'use client';

import { useMemo, useState } from 'react';

type Cliente = {
  id: number;
  nombre: string;
  email: string;
};

export default function Page() {
  // Datos de prueba (luego los cambiamos por reales)
  const data: Cliente[] = [
    { id: 1, nombre: 'Acme Corp',   email: 'ventas@acme.com' },
    { id: 2, nombre: 'Globex LLC',  email: 'contacto@globex.com' },
    { id: 3, nombre: 'Initech SA',  email: 'hola@initech.com' },
  ];

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(c =>
      c.nombre.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [query, data]);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Clientes</h1>

      <div style={{ marginBottom: 12 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar cliente…"
          style={{
            width: 320,
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #444',
            background: '#111',
            color: '#eee',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: 500,
          }}
        >
          <thead>
            <tr style={{ textAlign: 'left', background: '#0b0b0b' }}>
              <th style={{ padding: 12, borderBottom: '1px solid #222' }}>ID</th>
              <th style={{ padding: 12, borderBottom: '1px solid #222' }}>Nombre</th>
              <th style={{ padding: 12, borderBottom: '1px solid #222' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td style={{ padding: 12, borderBottom: '1px solid #222' }}>{c.id}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #222' }}>{c.nombre}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #222' }}>{c.email}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: 16, opacity: 0.7 }}>
                  Sin resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
