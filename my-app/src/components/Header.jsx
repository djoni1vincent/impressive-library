import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-gray-900 text-white  p-6 text-center">
        <h1 className="text-xl font-bold">Impressive Library</h1>
      </header>

      <nav className="bg-gray-900 text-white p-3 br-10 shadow-xs shadow-gray-400 mb-4">
        <div className="container mx-auto flex justify-center items-center gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/library" className="hover:underline">
            My Books
          </Link>
       
          <a href="#about" className="hover:underline">
            About
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
