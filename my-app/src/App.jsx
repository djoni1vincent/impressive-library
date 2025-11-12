import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookPage from "./pages/BookPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookList from "./components/BookList";
import Library from "./pages/Library";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p className=" text-xl">Loading books...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
            <div className="bg-gray-900 text-white mx-auto px-50 w-full">
              <Header />  
              <BookList />
              <Footer />
             </div>
            </>
          }
        />
        <Route path="/book/:title" element={<BookPage />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  );
}

export default App;
