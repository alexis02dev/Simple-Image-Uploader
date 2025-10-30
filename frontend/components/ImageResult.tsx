"use client";
import React from "react";
import Image from "next/image";
import { useDarkModeStore } from "@/store/darkModeStore";

interface ImageResultProps {
  imageUrl?: string;
  fileName?: string;
  onRemove?: () => void;
}

const ImageResult = ({
  imageUrl = "/professional.png",
  fileName = "university.png",
  onRemove = () => {},
}: ImageResultProps) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  const handleShare = () => {
    // Compartir la imagen
    if (navigator.share) {
      navigator.share({
        title: "Imagen subida",
        text: fileName,
        url: imageUrl,
      });
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(imageUrl);
      alert("Enlace copiado al portapapeles");
    }
  };

  const handleDownload = () => {
    // Descargar la imagen
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
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
            src={imageUrl}
            alt={fileName}
            fill
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 justify-center pt-4">
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
