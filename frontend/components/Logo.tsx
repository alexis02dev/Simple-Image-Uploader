"use client";
import Image from "next/image";
import { useDarkModeStore } from "@/store/darkModeStore";

const Logo = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  return (
    <div>
      <Image
        src={isDarkMode ? "/logo-light.svg" : "/logo-dark.svg"}
        alt="Logo"
        width={130}
        height={130}
      />
    </div>
  );
};

export default Logo;
