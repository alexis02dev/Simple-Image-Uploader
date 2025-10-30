"use client";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useDarkModeStore } from "@/store/darkModeStore";

const ImageUploader = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <div className="mt-30 w-full max-w-2xl mx-auto px-3.5 md:px-10">
      <div
        className={`rounded-lg p-2 ${
          isDragActive ? "bg-blue-500" : isDarkMode ? "bg-gray" : "bg-white"
        }`}
      >
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg px-3.5 py-20 md:p-20 text-center cursor-pointer transition ${
            isDragActive
              ? "border-blue-500 bg-blue-500"
              : isDarkMode
              ? "border-gray-400 bg-gray hover:border-gray-500"
              : "border-gray-300 bg-white hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <div className="">
            <Image
              src="exit.svg"
              alt="Upload"
              width={30}
              height={30}
              className="mx-auto mb-4"
            />
            <p
              className={`font-semibold ${
                isDragActive
                  ? "text-white"
                  : isDarkMode
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Drag & drop a file or{" "}
              <span
                className={`font-medium ${
                  isDragActive
                    ? "text-yellow-200"
                    : isDarkMode
                    ? "text-blue-400"
                    : "text-blue-600"
                }`}
              >
                browse files
              </span>
            </p>
            <p
              className={`text-sm font-light mt-2 ${
                isDragActive
                  ? "text-white"
                  : isDarkMode
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              JPG, PNG or GIF - Max file size 2MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
