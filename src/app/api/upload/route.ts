import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_FORMATS = ["mp4", "mp3", "jpg", "jpeg", "png", "webp"];

export async function POST(req: NextRequest) {
  try {
    console.log("Content-Type:", req.headers.get("content-type"));
    const data = await req.formData();
    const file = data.get("file") as File;
    console.log("FormData keys:", [...data.keys()]);

    if (!file) {
      return NextResponse.json(
        { error: "No se envió ningún archivo" },
        { status: 400 },
      );
    }

    // ✅ Validar tamaño
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "El archivo supera el límite de 20MB" },
        { status: 400 },
      );
    }

    // ✅ Validar formato
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!fileExtension || !ALLOWED_FORMATS.includes(fileExtension)) {
      return NextResponse.json(
        { error: "Formato no permitido" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto", // importante para videos
            folder: "si-forever", // ✅ carpeta automática
            public_id: `${Date.now()}-${file.name.split(".")[0]}`, // nombre único
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    return NextResponse.json(uploadResponse);
  } catch (error) {
    console.error("Error subiendo archivo:", error);
    return NextResponse.json(
      { error: "Error al subir el archivo" },
      { status: 500 },
    );
  }
}
