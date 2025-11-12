import React, { useState } from "react";
import Book from "./Book";
import booksData from "./booksData";

const BOOKS_PER_PAGE = 9;

const BookList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(BOOKS_PER_PAGE);

  // фильтруем книги по поиску
  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  // книги для карусели — просто первые 9 книг без дублирования
  const carouselBooks = booksData.slice(0, 9);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + BOOKS_PER_PAGE);
  };

  return (
    <>
      {/* Поиск */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search books..."
          className="border p-2 rounded w-full mb-4"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(BOOKS_PER_PAGE); // сброс при новом поиске
          }}
        />
      </div>

      {/* Карусель */}
      <main className="p-4">
        <h2 className="text-2xl mb-4">Featured</h2>
        <div className="w-full overflow-hidden relative">
          <div className="flex animate-scroll-right">
            {carouselBooks.map((book, index) => (
              <div key={index} className="mx-4 shrink-0">
                <Book title={book.title} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Рекомендации */}
      <section id="books" className="m-6 p-4 border-t-2 border-gray-300">
        <h2 className="text-2xl mb-4">Recommendations</h2>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {visibleBooks.map((book, index) => (
            <div
              key={book.title}
              className={`${index >= visibleCount ? "hidden" : "block"}`}
            >
              <Book title={book.title} />
            </div>
          ))}
        </div>

        {visibleCount < filteredBooks.length && (
          <div className="flex justify-center">
            <button
              onClick={handleShowMore}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Show more
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default BookList;
