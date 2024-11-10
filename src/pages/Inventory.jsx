import React, { useState, useEffect } from "react";
import supabase from "../superbaseClient";
import BookCard from "../components/BookCard";
import Modal from "../components/Modal";

const Inventory = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Delete book locally and update supabase
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) {
        console.log("Error deleting book:", error.message);
        alert("Error deleting book");
      } else {
        setBooks(books.filter((book) => book.id !== id));
      }
    }
  };

  // Edit book
  const handleEdit = async (book) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  // Save book updates
  const handleSave = async (updatedBook) => {
    const { error } = await supabase
      .from("books")
      .update(updatedBook)
      .eq("id", updatedBook.id);
    if (error) {
      console.log("Error updating book:", error.message);
    } else {
      setBooks(
        books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      );
      setIsModalOpen(false);
    }
  };

  // Add new book
  const handleAdd = async (newBook) => {
    console.log("Attempting to add book.");
    const { data, error } = await supabase.from("books").insert(newBook);
    if (error) {
      console.log("Error adding book:", error.message);
    } else {
      setBooks([...books, data[0]]);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Inventory</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setCurrentBook(null); // Clear currentBook for adding a new book
            setIsModalOpen(true);
          }}
        >
          Add Book
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <div key={book.id} className="relative">
              <BookCard book={book} />
              <div className="flex absolute space-x-2 mt-2 bottom-2 right-2">
                <button onClick={() => handleEdit(book)}>✏️</button>
                <button onClick={() => handleDelete(book.id)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={currentBook}
        onSave={handleSave}
        onAdd={handleAdd} // Passing handleAdd function for adding books
      />
    </div>
  );
};

export default Inventory;
