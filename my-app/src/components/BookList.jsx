import React, { useState } from "react";
import Book from "./Book";
import booksData from "./booksData";

const BOOKS_PER_PAGE = 9;

const BookList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(BOOKS_PER_PAGE);

  // разделяем книги
  const carouselBooks = booksData.slice(0, 9);
  const otherBooks = booksData.slice(9);

  // фильтруем для поиска только из otherBooks
  const filteredBooks = otherBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleBooks = filteredBooks.slice(0, visibleCount);

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
        <h2 className="text-2xl mb-4"></h2>
        <div className="w-full overflow-hidden relative">
          <div className="flex animate-scroll-right">
            {carouselBooks.concat(carouselBooks).map((book, index) => (
              <div key={index} className="mx-4 shrink-0">
                <Book title={book.title} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <section id="books" className="m-6 p-4 border-t-2 border-gray-300">
        <h2 className="text-2xl mb-4">Recommendations</h2>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {visibleBooks.map((book, index) => (
            <Book key={index} title={book.title} />
          ))}
        </div>

        {visibleCount < filteredBooks.length && (
          <div className="text-center mt-4">
            <button
              onClick={handleShowMore}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Show More
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default BookList;
