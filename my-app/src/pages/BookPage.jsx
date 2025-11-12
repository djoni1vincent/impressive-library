// src/pages/BookPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookPage = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/books?title=${encodeURIComponent(title)}`
        );
        const data = await res.json();
        if (data.docs && data.docs.length > 0) {
          const b =
            data.docs.find(
              (b) =>
                b.title &&
                b.title.toLowerCase().trim() === title.toLowerCase().trim()
            ) || data.docs[0];

          const bookInfo = {
            title: b.title,
            author: b.author_name ? b.author_name[0] : "Unknown",
            year: b.first_publish_year,
            description:
              b.first_sentence && typeof b.first_sentence === "string"
                ? b.first_sentence
                : b.first_sentence
                ? b.first_sentence.join(" ")
                : "No description",
            coverUrl: b.cover_i
              ? `https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`
              : null,
          };
          setBook(bookInfo);
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error(err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [title]);

  if (loading) {
    return (
      <div className="bg-gray-900 flex items-center justify-center h-screen">
        <p className="text-white text-xl">Loading book...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="bg-gray-900 flex items-center justify-center h-screen">
        <p className="text-white text-xl">Book not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
        <h2 className="text-xl mb-4 text-gray-300">
          {book.author} • {book.year || "Unknown year"}
        </h2>
        {book.coverUrl && (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-64 mb-6 shadow-lg mx-auto rounded"
          />
        )}
        <p className="text-lg text-gray-200">{book.description}</p>
      </div>
    </div>
  );
};

export default BookPage;
