import supabase from './supabaseClient';

const seedBooks = async () => {
  const bookData = [
    {
      genre: "Classic",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description:
        "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional town of West Egg on Long Island in the summer of 1922.",
      coverUrl: null,
    },
    {
      genre: "Science Fiction",
      title: "Dune",
      author: "Frank Herbert",
      description:
        "Dune is a 1965 science fiction novel by American author Frank Herbert. It is a prequel to the Frank Herbert novel Dune (1965) and a sequel to Children of Dune (1976).",
      coverUrl: null,
    },
    {
      genre: "Classic",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverUrl:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    },
    {
      genre: "Dystopian",
      title: "1984",
      author: "George Orwell",
      coverUrl:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
    },
  ];

  for (const book of bookData) {
    const { error } = await supabase.from("books").insert(book);
    if (error) {
      console.error("Error inserting book:", error.message);
    } else {
      console.log("Book added successfully:", book.title);
    }
  }
  console.log("Seeding completed!");
};

// Run the seed function
seedBooks()
  .then(() => console.log("Seeding finished successfully."))
  .catch((err) => console.error("Error during seeding:", err))
  .finally(() => process.exit());
