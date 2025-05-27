import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';
import { supabase } from "./supabase";
import './App.css';

import Lista from './componentes/lista';
import Libros from './componentes/libros';
import Favoritos from './componentes/favoritos';
import Leyendo from './componentes/leyendo';
import Leidos from './componentes/leidos';
import PorLeer from './componentes/porleer';
import Recomendados from './componentes/recomendados';
import Usuarios from './componentes/usuarios';
import Menu from './componentes/menu';
import Login from './componentes/login';
import Registro from './componentes/registro';
import Administrador from './componentes/administrador';

function App() {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function verificarSesion() {
            const { data: { session } } = await supabase.auth.getSession();
            setUsuario(session?.user || null);
            setCargando(false);
        }

        verificarSesion();

        // Escucha cambios en la sesión
        supabase.auth.onAuthStateChange((_event, session) => {
            setUsuario(session?.user || null);
        });
    }, []);

    if (cargando) return <p>Cargando...</p>;

    return (
        <AppProvider>
            <Router>
                {usuario && <Menu />}
                <Routes>
                    <Route path="/" element={usuario ? <Lista /> : <Navigate to="/login" />} />
                    <Route path="/leidos" element={usuario ? <Leidos /> : <Navigate to="/login" />} />
                    <Route path="/leyendo" element={usuario ? <Leyendo /> : <Navigate to="/login" />} />
                    <Route path="/por-leer" element={usuario ? <PorLeer /> : <Navigate to="/login" />} />
                    <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
                    <Route path="/recomendados" element={usuario ? <Recomendados /> : <Navigate to="/login" />} />
                    <Route path="/usuarios" element={usuario ? <Usuarios /> : <Navigate to="/login" />} />
                    <Route path="/libro/:id" element={usuario ? <Libros /> : <Navigate to="/login" />} />
                    <Route path="/administrador" element={<Administrador/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;