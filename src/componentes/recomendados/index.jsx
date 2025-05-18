import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';
import './style.css';

function Recomendados() {
  const { data, leyendo, leidos, porLeer, loading, error } = useContext(AppContext);
  const [recomendados, setRecomendados] = useState([]);
  const navigate = useNavigate();

  const generarRecomendados = () => {
    const librosDisponibles = data.filter(book =>
      !leyendo.some(b => b.id === book.id) &&
      !leidos.some(b => b.id === book.id) &&
      !porLeer.some(b => b.id === book.id)
    );

    let nuevosRecomendados = [];
    while (nuevosRecomendados.length < 4 && librosDisponibles.length > 0) {
      const index = Math.floor(Math.random() * librosDisponibles.length);
      nuevosRecomendados.push(librosDisponibles[index]);
      librosDisponibles.splice(index, 1); // Evitar duplicados
    }
    setRecomendados(nuevosRecomendados);
  };

  if (loading) return <p>Cargando recomendaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="c-aleatorio c-lista">
      {recomendados.length > 0 ? (
        recomendados.map((book, index) => (
          <div
            className="c-lista-pokemon c-un_aleatorio"
            key={index}
            onClick={() => navigate(`/libro/${book.id}`)}
          >
            <p>{book.id}</p>
            <img
              src={book.formats?.["image/jpeg"] || "https://via.placeholder.com/150"}
              alt={`Portada ${book.title}`}
              width="60"
              height="60"
              loading="lazy"
            />
            <p>{book.title}</p>
          </div>
        ))
      ) : (
        <p>Presiona "Generar" para ver recomendaciones.</p>
      )}
      <button onClick={generarRecomendados}>Generar</button>
    </section>
  );
}

export default Recomendados;