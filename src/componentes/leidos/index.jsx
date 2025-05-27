import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";
import './style.css';

function Leidos() {
  const { leidos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {leidos.length === 0 ? (
        <p>No has leído ningún libro.</p>
      ) : (
        <section className='c-lista'>
          {leidos.map((book, index) => (
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

export default Leidos;