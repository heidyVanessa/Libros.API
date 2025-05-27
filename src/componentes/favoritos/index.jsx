import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Favoritos() {
    const { favoritos, setFavoritos } = useContext(AppContext); 
    const navigate = useNavigate();

    return (
        <>
            {favoritos.length === 0 ? (
                <p>No hay libros favoritos aún.</p> 
            ) : (
                <div className='c-lista'>
                    {favoritos.map((libro, index) => ( 
                        <div
                            className='c-lista-pokemon'
                            onClick={() => navigate(`/libro/${libro.id}`)} 
                            key={index} 
                        >
                            <img
                                src={libro.formats?.['image/jpeg'] || 'https://via.placeholder.com/150'} 
                                alt={`Libro ${libro.title}`} 
                                width='auto'
                                height='60'
                                loading='lazy'
                            />
                            <p>{libro.title}</p> // Título del libro en lugar de nombre del Pokémon
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Favoritos;