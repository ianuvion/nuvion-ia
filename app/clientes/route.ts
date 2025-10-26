import { NextResponse } from 'next/server';

type Cliente = {
  id: number;
  nombre: string;
  email: string;
};

// Por ahora devolvemos datos de prueba desde el servidor.
// Luego podemos cambiar esto por datos reales (BD, planilla, etc).
const CLIENTES: Cliente[] = [
  { id: 1, nombre: 'Acme Corp',  email: 'ventas@acme.com' },
  { id: 2, nombre: 'Globex LLC', email: 'contacto@globex.com' },
  { id: 3, nombre: 'Initech SA', email: 'hola@initech.com' },
];

export async function GET() {
  return NextResponse.json({ ok: true, data: CLIENTES });
}
