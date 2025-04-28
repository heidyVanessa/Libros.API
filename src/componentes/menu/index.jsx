import { useState } from 'react'
import { Link } from 'react-router-dom';
import './style.css'

function Menu() {
  
  return (
    <nav className="c-menu">
          <Link to="/">Lista</Link>
          <Link to="/leidos">Leidos</Link>
          <Link to="/leyendo">Leyendo</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/guardados">Guardados</Link>
          <Link to="/usuarios">Usuarios</Link>
    </nav>
  )
}

export default Menu