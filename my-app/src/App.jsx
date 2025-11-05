import React from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <BookList />
      <Footer />
    </div>
  );
}

export default App;