import { Link } from 'react-router-dom'
import './style.css'

function Menu() {
  return (
    <nav className="c-menu">
      <Link to="/">Lista</Link>
      <Link to="/leidos">Leídos</Link>
      <Link to="/leyendo">Leyendo</Link>
      <Link to="/por-leer">Por Leer</Link>
      <Link to="/favoritos">Favoritos</Link>
      <Link to="/recomendados">Recomendados</Link>
      <Link to="/usuarios">Usuarios</Link>
    </nav>
  );
}

export default Menu;