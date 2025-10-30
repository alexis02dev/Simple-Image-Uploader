"use client";
import React from "react";
import { useDarkModeStore } from "@/store/darkModeStore";

const UploadProgress = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  return (
    <div
      className={`mt-6 w-[calc(100%-theme(spacing.8))] p-10 rounded-lg md:max-w-2xl mx-auto ${
        isDarkMode ? "bg-gray-dark" : "bg-white"
      } `}
    >
      <div className="mb-2">
        <p
          className={`text-sm font-bold text-center ${
            isDarkMode ? "text-white" : "text-gray-700"
          }`}
        >
          Uploading <span className="font-light">, please wait...</span>
        </p>
      </div>
      <div
        className={`w-full h-1 rounded-full overflow-hidden relative ${
          isDarkMode ? "bg-gray-500" : "bg-gray-200"
        }`}
      >
        <div
          className="h-full bg-blue-600 rounded-full absolute"
          style={{
            width: "10%",
            animation: "slideRight 3s ease-in-out infinite",
          }}
        ></div>
      </div>
      <style>{`
        @keyframes slideRight {
          0% {
            left: 0;
          }
          100% {
            left: calc(100% - 30px);
          }
        }
      `}</style>
    </div>
  );
};

export default UploadProgress;
