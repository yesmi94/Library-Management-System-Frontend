import React, { useEffect, useState } from "react";
import { BorrowedBookDetailsCard, type Book } from "../../components/layout/books/borrowedBookDetailsCard";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "../common/navbar";

const BorrowedBooksDisplayPage: React.FC = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleReturning = async (borrowingId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5014/api/library/${borrowingId}/returnings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to return the book.");
    }

    setBorrowedBooks(prev => prev.filter(b => b.borrowingId !== borrowingId));
    toast.success(result.message, {
      icon: <CheckCircle className="text-green-500" />
    });
    
    } catch (error: any) {
      console.error("Error occurred:", error.message);
      toast.error(error.message, {
        icon: <CheckCircle className="text-red-500" />,
    });
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5014/api/library/borrowedbooks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to display the borrowed books");

       
        const result = await res.json();
        console.log(result.data);
        setBorrowedBooks(result.data);
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
      <h2 className="text-3xl font-bold mb-6 text-center pt-6">Your Borrowed Books</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-6 pl-6 pr-6">
        {borrowedBooks.map((book) => (
          <BorrowedBookDetailsCard key={book.id} book={book} onReturn={handleReturning}/>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooksDisplayPage;