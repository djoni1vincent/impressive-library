// BookCard.jsx

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
