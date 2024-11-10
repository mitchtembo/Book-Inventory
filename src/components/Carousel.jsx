import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import supabase from "../superbaseClient";

const Carousel = () => {
  const [bookCovers, setBookCovers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImageCovers = async () => {
      console.log("attempting to fetch image covers");
      try {
        let { data, error } = await supabase.from("books").select("coverurl");
        if (error) {
          console.error("Error fetching book covers:", error);
        } else {
          const covers = data.map((cover) => cover.coverurl);
          setBookCovers(covers);
          console.log("Carousel image covers", data);
        }
      } catch (error) {
        console.error("Error fetching book covers:", error);
      }
    };
    fetchImageCovers();
  }, []);

  useEffect(() => {
    if (bookCovers.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bookCovers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [bookCovers.length]);

  //console.log(bookCovers);

  // onClick functions

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bookCovers.length);

  const prevSlide = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + bookCovers.length) % bookCovers.length
    );
  return (
    <div className="relative w-full h-[250px] overflow-hidden  rounded-xl mt-10 ">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {bookCovers.map((cover, index) => (
          <img
            key={index}
            src={cover}
            alt={`Book Cover: ${index + 1}`}
            className="w-full h-full object-contain flex-shrink-0"
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
