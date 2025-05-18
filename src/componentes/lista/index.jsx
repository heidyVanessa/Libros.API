import { useState, useContext } from 'react';
import Filtro from '../filtro';
import { useNavigate } from "react-router-dom";
import './style.css';
import { AppContext } from '../../contexto/contexto';

function Lista() {
  const { data, setTipoSeleccionado } = useContext(AppContext);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

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
            onClick={() => navigate(`/libro/${book.id}`)}
            key={index}
          >
            <img
              src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"}
              alt={`Portada ${book.title}`}
              width="auto"
              height="60"
              loading="lazy"
            />
            <p>{book.title}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista;