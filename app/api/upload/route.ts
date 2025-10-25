import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `uploads/${Date.now()}_${file.name}`,
      Body: buffer,
      ContentType: file.type,
    };

    const result = await s3.upload(uploadParams).promise();

    return NextResponse.json({
      message: "Archivo subido correctamente",
      url: result.Location,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 });
  }
}
