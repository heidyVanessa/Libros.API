import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom"; 
import './style.css';
import { AppContext } from '../../contexto/contexto';

function Libros() {
  const { id } = useParams();
  const [dataBook, setDataBook] = useState(null);
  const [error, setError] = useState(null);
  const { 
    favoritos, setFavoritos, 
    leyendo, setLeyendo, 
    leidos, setLeidos, 
    porLeer, setPorLeer 
  } = useContext(AppContext);

  useEffect(() => {
    console.log("ID recibido:", id);
    if (!id) {
      setError("ID no proporcionado");
      return;
    }

    fetch(`https://gutendex.com/books/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo cargar el libro`);
        }
        return response.json();
      })
      .then(responseData => {
        setDataBook(responseData);
        setError(null);
      })
      .catch(error => {
        console.error("Error al cargar el libro:", error);
        setError(error.message);
        setDataBook(null);
      });
  }, [id]); 

  const toggleFavorito = () => {
    if (!dataBook) return;
    const esFavorito = favoritos.some(f => f.id === dataBook.id);
    if (esFavorito) {
      setFavoritos(favoritos.filter(f => f.id !== dataBook.id));
    } else {
      setFavoritos([...favoritos, { id: dataBook.id, title: dataBook.title }]);
    }
  };

  const toggleLeyendo = () => {
    if (!dataBook) return;
    const estaLeyendo = leyendo.some(b => b.id === dataBook.id);
    if (estaLeyendo) {
      setLeyendo(leyendo.filter(b => b.id !== dataBook.id));
    } else {
      setLeyendo([...leyendo, { id: dataBook.id, title: dataBook.title }]);
      setLeidos(leidos.filter(b => b.id !== dataBook.id));
      setPorLeer(porLeer.filter(b => b.id !== dataBook.id));
    }
  };

  const toggleLeidos = () => {
    if (!dataBook) return;
    const estaLeido = leidos.some(b => b.id === dataBook.id);
    if (estaLeido) {
      setLeidos(leidos.filter(b => b.id !== dataBook.id));
    } else {
      setLeidos([...leidos, { id: dataBook.id, title: dataBook.title }]);
      setLeyendo(leyendo.filter(b => b.id !== dataBook.id));
      setPorLeer(porLeer.filter(b => b.id !== dataBook.id));
    }
  };

  const togglePorLeer = () => {
    if (!dataBook) return;
    const estaPorLeer = porLeer.some(b => b.id === dataBook.id);
    if (estaPorLeer) {
      setPorLeer(porLeer.filter(b => b.id !== dataBook.id));
    } else {
      setPorLeer([...porLeer, { id: dataBook.id, title: dataBook.title }]);
      setLeyendo(leyendo.filter(b => b.id !== dataBook.id));
      setLeidos(leidos.filter(b => b.id !== dataBook.id));
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!dataBook || !dataBook.id) return <p>Cargando...</p>;

  const esFavorito = favoritos.some(f => f.id === dataBook.id);
  const estaLeyendo = leyendo.some(b => b.id === dataBook.id);
  const estaLeido = leidos.some(b => b.id === dataBook.id);
  const estaPorLeer = porLeer.some(b => b.id === dataBook.id);

  return (
    <div className="libro">
      <img 
        src={dataBook.formats?.["image/jpeg"] || "https://via.placeholder.com/150"} 
        alt={dataBook.title || "Sin título"} 
        width="200"
      />
      <p>{dataBook.title || "Sin título"}</p>
      {dataBook.authors && dataBook.authors.length > 0 && (
        <p>Autor: {dataBook.authors[0]?.name || "Desconocido"}</p>
      )}
      <p>Idioma(s): {dataBook.languages?.join(", ") || "No disponible"}</p>
      <p>
        <a 
          href={dataBook.formats?.["application/epub+zip"] || dataBook.formats?.["text/html"] || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Descargar
        </a>
      </p>
      {dataBook.subjects && dataBook.subjects.length > 0 && (
        <p>Temas: {dataBook.subjects.join(", ")}</p>
      )}
      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
      <button onClick={toggleLeyendo}>
        {estaLeyendo ? 'Quitar de Leyendo' : 'Leyendo'}
      </button>
      <button onClick={toggleLeidos}>
        {estaLeido ? 'Quitar de Leídos' : 'Leído'}
      </button>
      <button onClick={togglePorLeer}>
        {estaPorLeer ? 'Quitar de Por Leer' : 'Por Leer'}
      </button>
    </div>
  );
}

export default Libros;