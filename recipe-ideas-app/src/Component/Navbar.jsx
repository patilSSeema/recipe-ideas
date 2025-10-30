import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const linkClasses = (path) =>
    `relative px-2 py-1 transition duration-300 ${
      pathname === path
        ? "font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0"
        : "hover:text-yellow-200 hover:scale-105"
    }`;

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <img
    src="/logo.png"
    alt="App Logo"
    className="w-30 h-12 rounded-full object-cover"
  />
        </Link>

        <div className="flex gap-6 text-lg">
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link to="/category" className={linkClasses("/category")}>
            Categories
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
