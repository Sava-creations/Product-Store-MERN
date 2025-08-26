import React, { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  const handleToggleMode = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");            //document.documentElement → this points to the <html> tag of your whole page.
  };                                                              //.classList.toggle("dark") → adds or removes the class dark on the <html> element.

  return (
    <nav className="w-full bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* LEFT: Product Store */}
        <span className="text-2xl font-bold text-blue-700 dark:text-blue-400 whitespace-nowrap">
          Product Store
        </span>

        {/* RIGHT: Create Button + Mode Button */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition whitespace-nowrap"
            onClick={() => (window.location.href = "/create")}
          >
            <FaRegPlusSquare size={18} />
            <span>Create</span>
          </button>
          <button
            onClick={handleToggleMode}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-yellow-600 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDark ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
