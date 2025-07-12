import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from './features/auth/LoginPage.tsx';
import RegisterPage from './features/auth/RegisterPage.tsx';
import BooksDisplayPage from './features/books/BooksDisplayPage.tsx';
import BorrowedBooksDisplayPage from './features/books/BorrowedBooksPage.tsx';
import { Toaster } from 'sonner';
import PersonsDisplayPage from './features/people/PersonsDisplayPage.tsx';
import HomePage from './features/common/homePage.tsx';
import AddBookPage from './features/books/AddBookPage.tsx';
import ProfilePage from './features/people/ProfilePage.tsx';

function App() {

  return (
    <>
  
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books" element={<BooksDisplayPage />} />
        <Route path="/borrowedbooks" element={<BorrowedBooksDisplayPage />} />
        <Route path="/persons" element={<PersonsDisplayPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/newbook" element={<AddBookPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        
        {/* Add protected routes after login */}
      </Routes>
    </Router>
    <Toaster position="top-right" />
    </>
  )
}

export default App
