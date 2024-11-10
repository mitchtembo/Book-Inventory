import React from "react";
import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import BookCard from "../components/BookCard";
import supabase from "../superbaseClient";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      let { data, error } = await supabase.from("books").select("*");
      try {
        if (error) {
          console.log(error);
        } else {
          setBooks(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Carousel />
      <section className="mt-16">
        <h2 className="text-center mb-4 text-2xl font-bold text-gray-800">
          Featured Books{" "}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <>
              <BookCard key={book.id} book={book} />
            </>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
