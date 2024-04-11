import { useState, useEffect } from 'react';
import axios from 'axios';
import supabase from '../../../supabaseClient';
import Sidebar from '../../../components/UI/Dashboard/Sidebar/Sidebar';
import './DashboardRequestGet.css';

function ArchivoPDF({ idArchivo }) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const obtenerRutaDesdeDB = async () => {
            const { data, error } = await supabase
                .from('enfermeritas')
                .select('ruta')
                .eq('id', idArchivo);

            if (error) {
                console.error('Error al obtener la ruta del archivo:', error);
            } else {
                const rutaArchivo = data[0].ruta;
                const url = await obtenerURLArchivo(rutaArchivo);
                setUrl(url);
            }
        };

        obtenerRutaDesdeDB();
    }, [idArchivo]);

    return url ? <iframe src={url} width="100%" height="500px"></iframe> : null;
}

function DashboardSolicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [filtroPuesto, setFiltroPuesto] = useState('');

    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
        window.location.href = '/login';
    }

    useEffect(() => {
        const obtenerSolicitudes = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/solicitudGet', { id_usuario: user.id_usuario });
                setSolicitudes(response.data);
            } catch (error) {
                console.error('Error al obtener las solicitudes de empleo:', error);
                if (error.response && error.response.data.error === 'Invalid JWT' && error.response.data.message === 'jwt expired') {
                    try {
                        const { error: refreshError } = await supabase.auth.refreshSession();
                        if (refreshError) {
                            console.error('Error al refrescar la sesión:', refreshError);
                        } else {
                            // Intenta obtener las solicitudes de nuevo después de refrescar la sesión
                            obtenerSolicitudes();
                        }
                    } catch (error) {
                        console.error('Error al refrescar la sesión:', error);
                    }
                }
            }
        };

        obtenerSolicitudes();
    }, []);

    const solicitudesFiltradas = solicitudes.filter(solicitud => filtroPuesto === '' || solicitud.puesto === filtroPuesto);

    return (
        <>
            <Sidebar />
            <div className="solicitudes_container">
                <h2>Solicitudes de Empleo</h2>
                <select value={filtroPuesto} onChange={e => setFiltroPuesto(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="cuidador">Cuidador</option>
                    <option value="enfermero">Enfermero</option>
                </select>
                {solicitudesFiltradas.map((solicitud, index) => (
                    <div key={index}>
                        <h3>{solicitud.nombre}</h3>
                        <p>{solicitud.puesto}</p>
                        <p>{solicitud.correo_electronico}</p>
                        <p>{solicitud.apellido_materno}</p>
                        <p>{solicitud.apellido_paterno}</p>
                        <p>{solicitud.domicilio}</p>
                        <p>{solicitud.genero}</p>
                        <p>{solicitud.fecha_nacimiento}</p>
                        <p>{solicitud.rfc}</p>
                        <p>{solicitud.salario_hora}</p>
                        <h4>Documentos:</h4>
                        <ArchivoPDF idArchivo={solicitud.idIne} />
                        <ArchivoPDF idArchivo={solicitud.idCurp} />
                        {/* Añade aquí más documentos si los necesitas */}
                    </div>
                ))}
            </div>
        </>
    );
}

export default DashboardSolicitudes;