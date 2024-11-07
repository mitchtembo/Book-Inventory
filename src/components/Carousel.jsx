import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bookCovers = [
  "https://m.media-amazon.com/images/I/51TLHTNDDuL._SY445_SX342_.jpg",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800&h=400",
  "https://m.media-amazon.com/images/I/51O0GdqXdxL._SY445_SX342_.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bookCovers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bookCovers.length);

  const prevSlide = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + bookCovers.length) % bookCovers.length
    );
  return (
    <div className="relative w-full h-[400px] overflow-hidden  rounded-xl">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {bookCovers.map((cover, index) => (
          <img
            key={index}
            src={cover}
            alt={`Book Cover: ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70  transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      {/* whats this for  */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {bookCovers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
