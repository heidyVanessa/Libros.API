import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

function Registro() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        correo: '',
        password: '',
        fechaNacimiento: '',
        telefono: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const handleRegistro = async (e) => {
        e.preventDefault();
        const { data, error: errorAuth } = await supabase.auth.signUp({
            email: formulario.correo,
            password: formulario.password,
        });
        if (errorAuth) {
            setError(errorAuth.message);
            return;
        }
        const uid = data.user.id;
        const { error: errorInsert } = await supabase.from('usuario').insert([
            {
                id: uid,
                nombre: formulario.nombre,
                correo: formulario.correo,
                fecha_nacimiento: formulario.fechaNacimiento,
                telefono: formulario.telefono,
                roll: 'usuario',
            },
        ]);
        if (errorInsert) {
            setError('Usuario creado pero error en tabla usuarios: ' + errorInsert.message);
        } else {
            navigate('/login');
        }
    };

    return (
        <section className="registro-container">
            <h2>Registro</h2>
            <form onSubmit={handleRegistro}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formulario.correo}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formulario.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="fechaNacimiento"
                    value={formulario.fechaNacimiento}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formulario.telefono}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Registrarse</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h3>Ya tengo cuenta</h3>
            <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
        </section>
    );
}

export default Registro;