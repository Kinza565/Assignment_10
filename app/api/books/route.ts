import { NextResponse } from "next/server";

// Initial book data
let books = [
  { id: 1, title: "Harry Potter", author: "J.K.Rowling", available: true },
];

// GET: Fetch all books
export async function GET() {
  try {
    console.log("Fetching books:", books);
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { status: "error", message: "Error fetching books" },
      { status: 500 }
    );
  }
}

// POST: Add a new book
export async function POST(request: Request) {
  try {
    const newBook = await request.json();
    const maxId = books.length > 0 ? Math.max(...books.map((book) => book.id)) : 0;
    const bookToAdd = { ...newBook, id: maxId + 1 };

    books.push(bookToAdd);
    console.log("Book added:", bookToAdd);
    return NextResponse.json(bookToAdd, { status: 201 });
  } catch (error) {
    console.error("Error adding book:", error);
    return NextResponse.json(
      { status: "error", message: "Error adding new book" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing book
export async function PUT(request: Request) {
  try {
    const { id, title, author, available } = await request.json();

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID is required" },
        { status: 400 }
      );
    }

    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      return NextResponse.json(
        { status: "error", message: "Book not found" },
        { status: 404 }
      );
    }

    books[bookIndex] = { id, title, author, available };
    console.log("Book updated:", books[bookIndex]);
    return NextResponse.json(books[bookIndex], { status: 200 });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { status: "error", message: "Error updating the book" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a book by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID is required" },
        { status: 400 }
      );
    }

    const initialLength = books.length;
    books = books.filter((b) => b.id !== id);

    if (books.length === initialLength) {
      return NextResponse.json(
        { status: "error", message: "Book not found" },
        { status: 404 }
      );
    }

    console.log("Book deleted. Remaining books:", books);
    return NextResponse.json(
      { status: "success", message: "Book deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { status: "error", message: "Error deleting the book" },
      { status: 500 }
    );
  }
}
