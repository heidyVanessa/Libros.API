import { useState, useEffect } from 'react';
import Filtro from '../filtro';
import { useNavigate } from "react-router-dom";
import './style.css';

function Lista() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      let res;
      if (tipoSeleccionado === 'All') {
        res = await fetch('https://gutendex.com/books/?languages=es');
      } else {
        res = await fetch(`https://gutendex.com/books/?languages=es&topic=${tipoSeleccionado}`);
      }
      const json = await res.json();
      setData(json.results);
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  // Filter books based on search input
  let resultados = data;
  
  if (busqueda.length >= 2) {
    resultados = data.filter(book =>
      book.title.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar Libro"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
      <Filtro onTipoChange={handleTipoChange} />

      <section className="c-lista">
        {resultados.map((book, index) => (
          <div
            className="c-lista-pokemon"
            onClick={() => navigate(`/libro/${encodeURIComponent(book.id)}`)}
            key={index}
          >
            <img
              src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"}
              alt={`Portada de ${book.title}`}
              width="auto"
              height="100"
              loading="lazy"
            />
            <p>{book.title}</p>
            {book.authors && book.authors.length > 0 && (
              <p className="autor">Autor: {book.authors[0].name}</p>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista