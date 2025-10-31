"use client";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import { uploadImage } from "@/lib/api/uploadImage";
import { useDarkModeStore } from "@/store/darkModeStore";
import { useState } from "react";
import UploadProgress from "./UploadProgress";
import ImageResult from "./ImageResult";
import { fileSchema } from "@/validations/imageSchemaZod";

export const UploadContent = () => {
  const [imageResult, setImageResult] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  const handleUpload = async (file: File) => {
    setError("");
    setImageResult(null);
    setLoading(true);

    try {
      const result = fileSchema.safeParse({
        originalname: file.name,
        mimetype: file.type,
        size: file.size,
      });

      if (!result.success) {
        const message = result.error.issues.map((i) => i.message).join(" ");
        setError(message);
        return;
      }
      const data = await uploadImage(file);
      setImageResult(data.image);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error al subir la imagen."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-darkest" : "bg-gray-light"
      } flex min-h-screen flex-col items-center`}
    >
      <Header />
      <ImageUploader onUpload={handleUpload} />
      {error && (
        <div className="mt-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>
      )}
      {loading && <UploadProgress />}
      {imageResult && (
        <div className="mt-6">
          <ImageResult image={imageResult} />
        </div>
      )}
    </main>
  );
};
export default UploadContent;
