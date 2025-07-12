import { AddBookForm } from "@/components/layout/books/addBookForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../common/navbar";

interface AddBookResponse {
  success: boolean;
  message: string;
  errors: string[] | null;
  data: any;
}

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [bookCategory, setCategory] = useState("");
  const [isAvailable] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleAddNewBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5014/api/books", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
    },
        body: JSON.stringify({ title, author, year, bookCategory }),
      });

      let result: AddBookResponse;

      try {
        result = await response.json();
        toast(result.message);
      } catch {
        throw new Error("Invalid response from server.");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add the new Book");
      }

      // Optional: store values locally
      localStorage.setItem("title", title);
      localStorage.setItem("author", author);
      localStorage.setItem("year", year);
      localStorage.setItem("category", bookCategory);

      // Navigate after success
      navigate("/books");
    } catch (err: any) {
      setError(err.message || "An error occurred. Registration unsuccessful.");
    }
  };

  return (
    <div className="relative z-50">
        <Navbar />

        <div className="pt-10">
          <AddBookForm
          title={title}
          author={author}
          year={year}
          bookCategory={bookCategory}
          onTitleChange={setTitle}
          onAuthorChange={setAuthor}
          onYearChange={setYear}
          onCategoryChange={handleCategorySelect}
          onSubmit={handleAddNewBook} 
          availability={isAvailable} 
          error={error}
        />
        </div>

        
    </div>
    
  );
}