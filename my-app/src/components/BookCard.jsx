// BookCard.jsx
import React, { useEffect, useState } from "react";

/*
  BookCard принимает:
    - title (string) — название книги (обязательно)
  Что делает внутри:
    - на mount делает fetch к Open Library: search.json?title=...
    - берёт первый результат (docs[0]) и из него получает:
        * cover_i -> строит URL обложки
        * author_name[0]
        * first_publish_year
        * snippet (если есть)
    - рендерит картинку + подпись
*/

const BookCard = ({ title, author, year, snippet, coverUrl }) => {
  return (
    <div className="h-60 w-48 border-2 border-gray-300 p-2 rounded-lg shadow-md bg-white">
      <img
        src={coverUrl || "/placeholder-book.png"}
        alt={title}
        className="h-40 w-full object-cover rounded-md mb-2"
      />
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-gray-600">{author} {year ? `• ${year}` : ""}</p>
      {snippet && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{snippet}</p>}
    </div>
  );
};


export default BookCard;
