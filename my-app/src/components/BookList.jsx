import React from "react";
import BookCard from "./BookCard.jsx";

const BookList = () => {
  const books = Array(9).fill(null);

  return (
    <>
      <main className="p-4">
        <h2 className="text-2xl mb-4">Books</h2>
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll-right w-max">
            {[...books, ...books].map((_, i) => (
              <div key={i} className="px-2">
                <BookCard />
              </div>
            ))}
          </div>
        </div>
      </main>

      <section id="books" className="m-6 p-4 border-t-2 border-gray-300">
        <h2 className="text-2xl mb-4">Recommendations</h2>
        <div className="flex gap-2 justify-center mt-4">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
        <div className="flex gap-2 justify-center mt-4">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </section>
    </>
  );
};

export default BookList;
