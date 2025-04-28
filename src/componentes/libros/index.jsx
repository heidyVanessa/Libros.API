import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"; 
import './style.css';

function Libros() {
  const { id } = useParams(); // Cambiado de 'name' a 'id'
  const [dataBook, setDataBook] = useState(null);

  useEffect(() => {
    if (!id) {
      console.warn("El parámetro 'id' está vacío.");
      setDataBook(null);
      return;
    }

    fetch(`https://gutendex.com/books/${id}`) // Buscamos directamente por ID
      .then(response => response.json())
      .then(responseData => {
        setDataBook(responseData);
      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
        setDataBook(null);
      });
  }, [id]);

  if (!dataBook) return <p>Cargando...</p>;

  return (
    <div className="libro">
      <img 
        src={dataBook?.formats?.["image/jpeg"] || "https://via.placeholder.com/150"} 
        alt={dataBook?.title || "Imagen no disponible"} 
        width="200" 
      />

      <p><strong>Título:</strong> {dataBook?.title || "No disponible"}</p>

      {dataBook?.authors && dataBook.authors.length > 0 && (
        <p><strong>Autor:</strong> {dataBook.authors[0]?.name || "No disponible"}</p>
      )}

      <p><strong>Idioma(s):</strong> {dataBook?.languages?.join(", ") || "No disponible"}</p>

      <p><strong>Descargar:</strong> 
        <a 
          href={dataBook?.formats?.["application/epub+zip"] || dataBook?.formats?.["text/html"] || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Descargar libro
        </a>
      </p>

      {dataBook?.subjects && dataBook.subjects.length > 0 && (
        <p><strong>Temas:</strong> {dataBook.subjects.join(", ")}</p>
      )}
    </div>
  );
}

export default Libros
