import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import books from "./booksData";

const BookList = () => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const results = [];

      for (const title of books) {
        try {
          const res = await fetch(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(
              title
            )}&limit=1`
          );
          const data = await res.json();
          const doc = data.docs?.[0];

          results.push({
            title,
            author: doc?.author_name?.[0] || "",
            year: doc?.first_publish_year || "",
            snippet: doc?.first_sentence?.[0] || doc?.subtitle || "",
            coverUrl: doc?.cover_i
              ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
              : null,
          });
        } catch (e) {
          results.push({
            title,
            author: "",
            year: "",
            snippet: "",
            coverUrl: null,
          });
        }
      }

      setBookData(results);
    };

    fetchBooks();
  }, []);

  const carouselBooks = bookData.slice(0, 9);
  const recommendedBooks = bookData.slice(9, 19);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 text-center">Books</h2>

      <div className="flex gap-4 animate-scroll-right w-max border-b-3 py-4  ">
        {[...carouselBooks, ...carouselBooks].map((book, i) => (
          <div key={i} className="px-2">
            <BookCard {...book} />
          </div>
        ))}
      </div>

      {/* Рекомендации */}
      <h2 className="text-2xl mb-10 mt-10 text-center">Recommendations</h2>
      <div className="grid grid-cols-5 gap-4  justify-items-center">
        {recommendedBooks.map((book, i) => (
          <BookCard key={i} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
