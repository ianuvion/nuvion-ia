// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const runtime = 'nodejs'; // usar Node, no Edge

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Falta el campo "file"' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const body = Buffer.from(arrayBuffer);

    const key = `logos/${Date.now()}-${file.name}`.replace(/\s+/g, '_');

    // Nota: Sin ACL. Si el bucket tiene "Bucket owner enforced", ACL no está permitido.
    const cmd = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      Body: body,
      ContentType: file.type || 'application/octet-stream',
    });

    await s3.send(cmd);

    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return NextResponse.json({ ok: true, url });
  } catch (err: any) {
    console.error('UPLOAD ERROR:', err); // miralo en Vercel → Runtime Logs
    return NextResponse.json(
      { error: 'upload_error', message: err?.message || 'Error desconocido' },
      { status: 500 }
    );
  }
}
