import React from "react";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <div className="bg-gray-darkest text-white p-4 shadow-md w-full h-10 justify-between flex items-center">
      <Logo />
      <DarkModeToggle />
    </div>
  );
};

export default Header;
