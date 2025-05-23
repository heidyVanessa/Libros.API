function Filtro({ onTipoChange }) {
  const categorias = [
    "All",
    "Ficción", "Cuentos", "Historia", "Aventuras", "Ciencia", "Religión",
    "Filosofía", "Biografía", "Poesía", "Teatro", "Amor", "Misterio",
    "Fantástico", "Educación", "Mitología"
  ];

  return (
    <div className="c-filtro">
      {categorias.map((unaCategoria, index) => (
        <button
          className=""
          key={index}
          onClick={() => onTipoChange(unaCategoria)}
        >
          {unaCategoria}
        </button>
      ))}
    </div>
  );
}

export default Filtro;