import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";

// Простой кэш для уже загруженных книг
const bookCache = {};

const SkeletonBook = () => (
  <div className="h-60 w-48 border-2 border-gray-300 p-2 rounded-lg shadow-md bg-gray-200 animate-pulse" />
);

const NotFoundBook = () => (
  <div className="h-60 w-48 border-2 border-gray-300 p-2 rounded-lg shadow-md bg-white flex items-center justify-center">
    Book not found
  </div>
);

const Book = ({ title }) => {
  const [bookData, setBookData] = useState(bookCache[title] || null);
  const [loading, setLoading] = useState(!bookCache[title]);

  useEffect(() => {
    if (bookCache[title]) return; // Берём из кэша

    const fetchBookData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=1`
        );
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
          const book = data.docs[0];
          const bookInfo = {
            title: book.title,
            author: book.author_name ? book.author_name[0] : "Unknown",
            year: book.first_publish_year,
            snippet: book.first_sentence
              ? typeof book.first_sentence === "string"
                ? book.first_sentence
                : book.first_sentence.join(" ")
              : "",
            coverUrl: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : null,
          };
          bookCache[title] = bookInfo; // Сохраняем в кэш
          setBookData(bookInfo);
        } else {
          setBookData(null);
        }
      } catch (error) {
        console.error(error);
        setBookData(null);
      }
      setLoading(false);
    };

    fetchBookData();
  }, [title]);

  if (loading) return <SkeletonBook />;
  if (!bookData) return <NotFoundBook />;

  return <BookCard {...bookData} />;
};

export default Book;
