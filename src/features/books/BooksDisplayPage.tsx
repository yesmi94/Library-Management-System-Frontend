// components/books/BooksDisplayPage.tsx
import React, { useEffect, useState } from "react";
import { BookDetailsCard, type Book } from "../../components/layout/books/bookDetailsCard";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "../common/navbar";

const BooksDisplayPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const handleBorrowing = async (bookId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5014/api/library/${bookId}/borrowings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to borrow the book.");
    }

    setBooks(prev => prev.filter(b => b.id !== b.id));
    toast(result.message);

    setTimeout(() => {
      window.location.reload();
      }, 3000);

    } catch (error: any) {
      console.error("Borrow error:", error.message);
      toast("Error borrowing the book: " + error.message);
    }
  }

  const handleDeleting = async (bookId: string) => {
    const token = localStorage.getItem("token");
    try{
      const response = await fetch(`http://localhost:5014/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete the book.");
      }

      toast(result.message);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    catch (error: any) {
      console.error("Delete error:", error.message);
      toast("Error deleting the book: " + error.message);
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5014/api/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch books");

       
        const result = await res.json();
        console.log(result.data);
        setBooks(result.data);
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        <Loader2 className="animate-spin mr-2" />
        Loading books...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        <AlertCircle className="mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="relative z-50">
        <Navbar />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center pt-6">Available Books</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-6 pl-10 pr-10">
        {books.map((book) => (
          <BookDetailsCard 
          key={book.id} 
          book={book} 
          onBorrow={handleBorrowing}
          onDelete={handleDeleting}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksDisplayPage;
