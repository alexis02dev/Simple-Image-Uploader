"use client";
import React from "react";
import Image from "next/image";
import { useDarkModeStore } from "@/store/darkModeStore";
import { downloadImage } from "@/lib/api/downloadImage";
import { copyToClipboard } from "@/lib/utils/copyToClipboard";
import { toast } from "sonner";

interface ImageResultProps {
  image: { public_id: string; filename: string; url: string };
}

const ImageResult = ({ image }: ImageResultProps) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  const handleDownload = async () => {
    try {
      await downloadImage(image.public_id);
      toast.success("Descarga completada correctamente.");
    } catch (err: unknown) {
      toast.error((err as Error).message || "Error al descargar la imagen.");
    }
  };

  const handleShare = async () => {
    try {
      await copyToClipboard(image.url);
      toast.success("URL copiada al portapapeles.");
    } catch {
      toast.error("No se pudo copiar la URL.");
    }
  };

  return (
    <div className="mt-20 mx-auto w-full max-w-2xl px-3.5 md:px-0">
      {/* Imagen subida */}
      <div
        className={`rounded-lg p-2  ${
          isDarkMode ? "bg-gray-dark" : "bg-white  shadow-bottom "
        }`}
      >
        <div
          className={`w-full h-96 relative rounded-lg overflow-hidden bg-gray-100`}
        >
          <Image
            src={image.url}
            alt={image.filename}
            fill
            className="w-full h-full object-fit rounded-lg"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 justify-center pt-6">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-2 bg-blue text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {" "}
          <Image src="Link.svg" alt="Share" width={20} height={20} />
          <span>Share</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-2 bg-blue text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {" "}
          <Image src="download.svg" alt="Download" width={20} height={20} />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default ImageResult;
