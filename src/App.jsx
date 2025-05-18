import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexto/contexto'
import './App.css' 

import Lista from './componentes/lista'
import Libros from './componentes/libros'
import Favoritos from './componentes/favoritos'
import Leyendo from './componentes/leyendo'
import Leidos from './componentes/leidos'
import PorLeer from './componentes/porleer'
import Recomendados from './componentes/recomendados'
import Usuarios from './componentes/usuarios'
import Menu from './componentes/menu'


function App() {
  return (
    <AppProvider>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/libro/:id" element={<Libros />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/leyendo" element={<Leyendo />} />
          <Route path="/leidos" element={<Leidos />} />
          <Route path="/recomendados" element={<Recomendados />} />
          <Route path="/por-leer" element={<PorLeer />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;