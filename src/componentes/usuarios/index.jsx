import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

export default function Usuario() {
    const [usuario, setUsuario] = useState(null);
    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        fecha_nacimiento: '',
        telefono: '',
        roll: '',
    });
    const [nuevaUrl, setNuevaUrl] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUsuario() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('usuario')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                if (data) {
                    setUsuario(data);
                    setForm(data);
                    fetchImagenes(user.id);
                }
            }
        }
        fetchUsuario();
    }, []);

    const fetchImagenes = async (usuarioid) => {
        const { data, error } = await supabase
            .from('multimedia')
            .select('*')
            .eq('usuarioid', usuarioid);
        if (data) setImagenes(data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        const { error } = await supabase
            .from('usuario')
            .update(form)
            .eq('id', usuario.id);
        if (error) {
            alert('Error al actualizar');
        } else {
            alert('Datos actualizados');
        }
    };

    const handleAgregarUrl = async () => {
        if (!nuevaUrl.trim()) return;
        const { error } = await supabase
            .from('multimedia')
            .insert({ url: nuevaUrl, usuarioid: usuario.id });
        if (error) {
            alert('Error al agregar la imagen');
        } else {
            setNuevaUrl('');
            fetchImagenes(usuario.id);
        }
    };

    const handleEliminarImagen = async (id) => {
        const { error } = await supabase
            .from('multimedia')
            .delete()
            .eq('id', id);
        if (!error) {
            setImagenes(imagenes.filter((img) => img.id !== id));
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (!usuario) return <p>Cargando...</p>;

    return (
        <div className="usuario-container">
            <h2>Perfil de Usuario</h2>
            <label>
                Nombre:
                <input name="nombre" value={form.nombre} onChange={handleChange} />
            </label>
            <label>
                Correo:
                <input name="correo" value={form.correo} onChange={handleChange} />
            </label>
            <label>
                Fecha de nacimiento:
                <input
                    type="date"
                    name="fecha_nacimiento"
                    value={form.fecha_nacimiento}
                    onChange={handleChange}
                />
            </label>
            <label>
                Teléfono:
                <input name="telefono" value={form.telefono} onChange={handleChange} />
            </label>
            <label>
                Rol:
                <input name="roll" value={form.roll} onChange={handleChange} disabled />
            </label>
            <button onClick={handleUpdate}>Guardar cambios</button>
            <hr />
            <h3>Agregar imagen</h3>
            <input
                type="text"
                placeholder="URL de la imagen"
                value={nuevaUrl}
                onChange={(e) => setNuevaUrl(e.target.value)}
            />
            <button onClick={handleAgregarUrl}>Agregar</button>
            <h3>Imágenes guardadas</h3>
            <ul>
                {imagenes.map((img) => (
                    <li key={img.id}>
                        <img src={img.url} alt="Imagen" width="150" />
                        <button onClick={() => handleEliminarImagen(img.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <hr />
            <h3>Cerrar Sesión</h3>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}