// 👇 Indica que este endpoint se ejecuta en Node.js (no Edge)
export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// 🔧 Configuración del cliente S3
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// 🧩 Endpoint POST para subir archivos
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 📁 Nombre del archivo dentro del bucket
    const key = `uploads/${Date.now()}_${file.name}`;

    // 📤 Subida a S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // 🌐 URL pública del archivo subido
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME!}.s3.${process.env.AWS_REGION!}.amazonaws.com/${key}`;

    return NextResponse.json({
      message: "✅ Archivo subido correctamente",
      url: fileUrl,
    });
  } catch (error) {
    console.error("❌ Error al subir el archivo:", error);
    return NextResponse.json({ error: "Error al subir el archivo a S3" }, { status: 500 });
  }
}
