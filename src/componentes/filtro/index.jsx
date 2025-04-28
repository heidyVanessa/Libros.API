import React, { useState, useEffect } from 'react';

function Filtro({ onTipoChange }) {
  const categorias = [
    "All",
    "Ficción", "Cuentos", "Historia", "Aventuras", "Ciencia", "Religión",
    "Filosofía", "Biografía", "Poesía", "Teatro", "Amor", "Misterio",
    "Fantástico", "Educación", "Mitología"
  ];

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch the books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://gutendex.com/books/?languages=es');
        const data = await response.json();
        setBooks(data.results); // Assuming the results are in the 'results' field
        setFilteredBooks(data.results); // Initially, display all books
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Handle category change
  const handleCategoryChange = (categoria) => {
    onTipoChange(categoria); // Notify parent about the category change
    
    if (categoria === "All") {
      setFilteredBooks(books); // Show all books if "All" is selected
    } else {
      const filtered = books.filter((book) => {
        return book.subjects && book.subjects.includes(categoria);
      });
      setFilteredBooks(filtered); // Filter books based on category
    }
  };

  return (
    <div className="c-filtro">
      {categorias.map((unaCategoria, index) => (
        <button className='' key={index} onClick={() => handleCategoryChange(unaCategoria)}>
          {unaCategoria}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
