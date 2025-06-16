import React from "react";
import { FaShoppingCart, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";

const Header: React.FC = () => {
  const [cartCount] = React.useState(2);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-blue-600 tracking-wide select-none">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            TechStore
          </span>
        </div>
        {/* Search */}
        <form className="flex-1 max-w-lg mx-6 hidden md:block">
          <input
            type="text"
            placeholder="Tìm kiếm laptop, CPU, RAM, hãng..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </form>
        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <div className="relative group cursor-pointer">
            <FaShoppingCart
              size={24}
              className="text-gray-700 group-hover:text-blue-600 transition"
            />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
              {cartCount}
            </span>
          </div>
          {/* User */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
            <FaUserCircle size={24} />
            <span className="font-medium text-sm hidden sm:inline">
              Đăng nhập
            </span>
          </div>
          {/* Dark/Light mode */}
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="ml-2 p-2 rounded-full hover:bg-blue-50 transition"
            aria-label="Toggle dark mode"
            type="button"
          >
            {darkMode ? (
              <FaSun size={20} className="text-yellow-500" />
            ) : (
              <FaMoon size={20} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>
      {/* Responsive search on mobile */}
      <div className="block md:hidden px-4 pb-2">
        <input
          type="text"
          placeholder="Tìm kiếm laptop, CPU, RAM, hãng..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
      </div>
    </header>
  );
};

export default Header;