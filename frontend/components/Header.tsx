"use client";
import React from "react";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkModeStore } from "@/store/darkModeStore";

const Header = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  return (
    <div
      className={`text-white p-6 border-b ${
        isDarkMode ? "border-b-gray-dark" : "border-b-gray-300"
      } w-full h-10 justify-between flex items-center`}
    >
      <Logo />
      <DarkModeToggle />
    </div>
  );
};

export default Header;
