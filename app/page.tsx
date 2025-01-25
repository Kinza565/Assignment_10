"use client";

import React, { useEffect, useState } from "react";
interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

const Page = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    available: true,
  });

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const addBook = async () => {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    const addedBook = await response.json();
    setBooks([...books, addedBook]);
  };

  // Delete Book
  const deleteBook = async (id: number) => {
    const response = await fetch("/api/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    }
  };

  return (
    <div className="p-8 bg-slate-500 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-black">Book Management</h1>

      {/* Book List Section */}
      <div className="max-w-5xl mx-auto">
        {books.length === 0 ? (
          <p className="text-center text-lg text-gray-700">No books available</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <li
                key={book.id}
                className="flex flex-col justify-between bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-gray-600 mt-2">Author: {book.author}</p>
                </div>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="mt-4 py-2 px-4 text-white bg-gray-400 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Book Form Section */}
      <div className="mt-16 max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Book</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-"
          />

          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Available:</label>
            <input
              type="checkbox"
              checked={newBook.available}
              onChange={(e) =>
                setNewBook({ ...newBook, available: e.target.checked })
              }
              className="h-5 w-5 text-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={addBook}
          className="mt-6 w-full py-3 text-white bg-slate-900 rounded-lg hover:bg-slate-700 transition-colors"
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default Page;
