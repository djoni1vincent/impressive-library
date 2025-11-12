import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import Footer from './components/Footer';
import './App.css';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-black">
        <p className="text-xl">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <BookList />
      <Footer />
    </div>
  );
}

export default App;
