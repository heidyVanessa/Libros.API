import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="menu-header">
      <button className="hamburger-button" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`c-menu ${isOpen ? 'visible' : 'hidden'}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Lista</Link>
        <Link to="/leidos" onClick={() => setIsOpen(false)}>Leídos</Link>
        <Link to="/leyendo" onClick={() => setIsOpen(false)}>Leyendo</Link>
        <Link to="/por-leer" onClick={() => setIsOpen(false)}>Por Leer</Link>
        <Link to="/favoritos" onClick={() => setIsOpen(false)}>Favoritos</Link>
        <Link to="/recomendados" onClick={() => setIsOpen(false)}>Recomendados</Link>
        <Link to="/usuarios" onClick={() => setIsOpen(false)}>Usuarios</Link>
      </nav>
    </header>
  );
}

export default Menu;
