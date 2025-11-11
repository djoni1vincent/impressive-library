import React from 'react';
import books from './booksData';


const Header = () => {
  return (
    <>

    <header className="bg-white text-dark p-6 text-center">
      <h1 className="text-xl">Impressive Library</h1>
    </header>
    <nav className="bg-gray-100 text-dark p-3">
            <div className="container mx-auto flex justify-center items-center">
                <div className="px-10">
                    <a href="./index.html" className="mr-4 hover:underline">Home</a>
                    <a href="#books" className="mr-4 hover:underline">My Books</a>
                    <a href="#about" className="hover:underline">About</a>

                    
                </div>
            </div>
        </nav>
       </>
  );
};

export default Header;