import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";
import './style.css';

function PorLeer() {
  const { porLeer } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {porLeer.length === 0 ? (
        <p>No tienes libros por leer.</p>
      ) : (
        <section className='c-lista'>
          {porLeer.map((book, index) => (
            <div 
              className='c-lista-pokemon'
              onClick={() => navigate(`/libro/${book.id}`)}
              key={index}
            >
              <img 
                src={`https://gutendex.com/books/${book.id}/cover.jpg` || "https://via.placeholder.com/150"} 
                alt={`Portada ${book.title}`} 
                width='auto' 
                height='60' 
                loading='lazy'
              />
              <p>{book.title}</p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default PorLeer;