import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const [favoritos, setFavoritos] = useState(favoritosGuardados);

    const leyendoGuardados = JSON.parse(localStorage.getItem("leyendo")) || [];
    const leidosGuardados = JSON.parse(localStorage.getItem("leidos")) || [];
    const porLeerGuardados = JSON.parse(localStorage.getItem("porLeer")) || [];
    const [leyendo, setLeyendo] = useState(leyendoGuardados);
    const [leidos, setLeidos] = useState(leidosGuardados);
    const [porLeer, setPorLeer] = useState(porLeerGuardados);

    const [data, setData] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('All');

    useEffect(() => {
      const obtenerDatos = async () => {
        let res;
        if (tipoSeleccionado === 'All') {
          res = await fetch('https://gutendex.com/books/?languages=es');
        } else {
          res = await fetch(`https://gutendex.com/books/?languages=es&topic=${tipoSeleccionado}`);
        }
        const json = await res.json();
        setData(json.results);
      };

      obtenerDatos();
    }, [tipoSeleccionado]);

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    useEffect(() => {
        localStorage.setItem("leyendo", JSON.stringify(leyendo));
    }, [leyendo]);

    useEffect(() => {
        localStorage.setItem("leidos", JSON.stringify(leidos));
    }, [leidos]);

    useEffect(() => {
        localStorage.setItem("porLeer", JSON.stringify(porLeer));
    }, [porLeer]);

    return (
        <AppContext.Provider value={{ 
            favoritos, setFavoritos,
            leyendo, setLeyendo,
            leidos, setLeidos,
            porLeer, setPorLeer,
            data, setData, 
            tipoSeleccionado, setTipoSeleccionado
        }}>
            {children}
        </AppContext.Provider>
    );
}