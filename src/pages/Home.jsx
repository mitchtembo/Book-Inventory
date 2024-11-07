import React from "react";
import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Harry Potter",
      author: "J.K. Rowling",
      price: 100,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg",
    },
    {
      id: 2,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 15,
      image: "https://images-na.ssl-images-amazon.com/images/I/81O3I1YtYmL.jpg",
    },
    {
      id: 3,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      price: 20,
      image: "https://images-na.ssl-images-amazon.com/images/I/81O3I1YtYmL.jpg",
    },
    {
      id: 4,
      title: "A history of Zimbabwe",
      author: "Alois S Mlambo",
      price: 15,
      image:
        "https://m.media-amazon.com/images/I/51O0GdqXdxL._SY445_SX342_.jpg",
    },
    {
      id: 5,
      title: "Nervous Conditions",
      author: "Tsitsi Ndangaremga",
      price: 10,
      image: "https://m.media-amazon.com/images/I/81EsVUKPKbL._SY522_.jpg",
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Carousel />
      <section className="mt-16">
        <h2>Featured Books </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
