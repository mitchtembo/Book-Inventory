import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { Book, Search } from "lucide-react";
import supabase from "../superbaseClient";
import useBooks from "../Hooks/useBooks";
const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from("books").select("*");
      if (error) {
        console.log(error);
      } else {
        setBooks(data);
      }
    };
    fetchBooks();
  }, []);

  // const { books, loading, error } = useBooks;

  const filterBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Collection</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search books..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* show filtered Books or a fallback */}

      {searchTerm && filterBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No books found matching your search</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filterBooks.length > 0
              ? filterBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))
              : books.map((book) => <BookCard key={book.id} book={book} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
