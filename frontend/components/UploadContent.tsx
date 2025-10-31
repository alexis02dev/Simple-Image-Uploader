"use client";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import { useDarkModeStore } from "@/store/darkModeStore";

export const UploadContent = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-darkest" : "bg-gray-light"
      } flex min-h-screen flex-col items-center`}
    >
      <Header />
      <ImageUploader />
    </main>
  );
};
export default UploadContent;
