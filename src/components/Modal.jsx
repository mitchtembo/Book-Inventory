import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, book, onSave, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    coverurl: "",
    genre: "",
  });

  useEffect(() => {
    // Set form data based on whether we're editing an existing book or adding a new one
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        description: book.description || "",
        coverurl: book.coverurl || "",
        genre: book.genre || "",
      });
    } else {
      setFormData({
        title: "",
        author: "",
        description: "",
        coverurl: "",
        genre: "",
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (book) {
      onSave({ ...formData, id: book.id }); // Update existing book
    } else {
      onAdd(formData); // Add new book
    }
    onClose();
  };

  if (!isOpen) return null; // Do not render modal if it’s closed

  return (
    <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {book ? "Edit Book" : "Add New Book"}
        </h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Cover URL</label>
            <input
              type="text"
              name="coverurl"
              value={formData.coverurl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              {book ? "Save Changes" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
