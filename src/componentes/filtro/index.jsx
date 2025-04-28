import React from 'react';

function Filtro({ onTipoChange }) {
  const categorias = [
    "All",
    "Ficción", "Cuentos", "Historia", "Aventuras", "Ciencia", "Religión",
    "Filosofía", "Biografía", "Poesía", "Teatro", "Amor", "Misterio",
    "Fantástico", "Educación", "Mitología"
  ];

  const handleCategoryChange = (categoria) => {
    onTipoChange(categoria); // Avisamos al padre (Lista.jsx)
  };

  return (
    <div className="c-filtro">
      {categorias.map((unaCategoria, index) => (
        <button
          className=""
          key={index}
          onClick={() => handleCategoryChange(unaCategoria)}
        >
          {unaCategoria}
        </button>
      ))}
    </div>
  );
}

export default Filtro
