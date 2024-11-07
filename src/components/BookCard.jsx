import React from "react";

const BookCard = ({ book }) => {
  console.log(book);
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden  transition-transform hover:scale-105 duration-300 ease-in-out
    "
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.genre}</p>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
