// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const runtime = 'nodejs'; // necesitamos Node para AWS SDK

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    // recibiendo el archivo como binario crudo
    const fileName =
      req.headers.get('x-filename') ||
      `upload-${Date.now()}.bin`;
    const contentType =
      req.headers.get('content-type') || 'application/octet-stream';

    const arrayBuffer = await req.arrayBuffer();
    const body = Buffer.from(arrayBuffer);

    const key = `logos/${Date.now()}-${fileName}`.replace(/\s+/g, '_');

    // Nota: sin ACL (si el bucket tiene Bucket owner enforced, ACL no está permitido)
    const cmd = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await s3.send(cmd);

    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return NextResponse.json({ ok: true, url });
  } catch (err: any) {
    console.error('UPLOAD ERROR:', err);
    return NextResponse.json(
      { error: 'upload_error', message: err?.message || 'Error desconocido' },
      { status: 500 }
    );
  }
}
