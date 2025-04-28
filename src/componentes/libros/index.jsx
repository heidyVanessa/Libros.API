import { useState, useEffect } from 'react'; 
import { useParams } from "react-router-dom"; 
import './style.css';

function Libros() {
  const { name } = useParams(); // 'name' will hold the book's id or title
  const [dataBook, setDataBook] = useState(null);

  useEffect(() => {
    fetch(`https://gutendex.com/books?search=${name}`)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.results && responseData.results.length > 0) {
          setDataBook(responseData.results[0]); // Use the first result
        } else {
          setDataBook(null); // No result found
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setDataBook(null); // Handle error gracefully
      });
  }, [name]); // Dependency on 'name' so it fetches when 'name' changes

  // Handle loading or no results
  if (!dataBook) return <p>Cargando o no encontrado...</p>;

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
    </div>
  );
}

export default Libros