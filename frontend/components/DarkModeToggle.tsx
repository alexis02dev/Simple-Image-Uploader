"use client";
import Image from "next/image";
import { useDarkModeStore } from "@/store/darkModeStore";

const DarkModeToggle = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  return (
    <div>
      <button
        onClick={toggleDarkMode}
        className={
          isDarkMode
            ? "bg-gray border border-gray-dark rounded-lg p-2"
            : "bg-white border border-gray-300 rounded-lg p-2"
        }
      >
        {isDarkMode ? (
          <Image src="/Sun_fill.svg" alt="Light Mode" width={25} height={25} />
        ) : (
          <Image src="/Moon_fill.svg" alt="Dark Mode" width={25} height={25} />
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
