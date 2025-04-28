import { useState } from 'react' 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css' 
import Favoritos from './componentes/favoritos'
import Guardados from './componentes/guardados'
import Leidos from './componentes/leidos';
import Leyendo from './componentes/leyendo';
import Libros from './componentes/libros';
import Lista from './componentes/lista';
import Menu from './componentes/menu';
import Usuarios from './componentes/usuarios';


function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        {/* Define each route with a unique path */}
        <Route path="/" element={<Lista />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/guardados" element={<Guardados />} />
        <Route path="/leidos" element={<Leidos />} />
        <Route path="/leyendo" element={<Leyendo />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/libros/:name" element={<Libros />} />
      </Routes>
    </Router>
  );
}

export default App;
