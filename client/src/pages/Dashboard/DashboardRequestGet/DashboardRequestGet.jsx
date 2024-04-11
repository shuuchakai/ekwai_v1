import { useState, useEffect } from 'react';
import axios from 'axios';

import supabase from '../../../supabaseClient';
import Sidebar from '../../../components/UI/Dashboard/Sidebar/Sidebar';

import './DashboardRequestGet.css';

function ArchivoPDF({ rutaArchivo }) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const obtenerURLArchivo = async () => {
            const { data, error } = await supabase.storage.from('enfermeritas').createSignedUrl(rutaArchivo, 60);

            if (error) {
                console.error('Error al obtener la URL del archivo:', error);
            } else {
                setUrl(data.signedUrl);
            }
        };

        obtenerURLArchivo();
    }, [rutaArchivo]);

    return url ? <iframe src={url} width="300px" height="300px"></iframe> : null;
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
                console.log(response)
                setSolicitudes(response.data);
            } catch (error) {
                console.error('Error al obtener las solicitudes de empleo:', error);
                if (error.response && error.response.data.error === 'Invalid JWT' && error.response.data.message === 'jwt expired') {
                    try {
                        const { error: refreshError } = await supabase.auth.refreshSession();
                        if (refreshError) {
                            console.error('Error al refrescar la sesión:', refreshError);
                        } else {
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
            <div className="solicitudes">
                <div className="solicitudes_container">
                    <p className="solicitud_containerTitle">Solicitudes de Empleo</p>
                    <select value={filtroPuesto} onChange={e => setFiltroPuesto(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="cuidador">Cuidador</option>
                        <option value="enfermero">Enfermero</option>
                    </select>
                    {solicitudesFiltradas.map((solicitud, index) => (
                        <div className="solicitud_containerData" key={index}>
                            <div className="solicitud_containerData_top">
                                <div className="solicitud_containerData_left">
                                    <p>{solicitud.nombre}</p>
                                    <p>{solicitud.puesto}</p>
                                    <p>{solicitud.correo_electronico}</p>
                                    <p>{solicitud.apellido_materno}</p>
                                    <p>{solicitud.apellido_paterno}</p>
                                </div>
                                <div className="solicitud_containerData_right">
                                    <p>{solicitud.domicilio}</p>
                                    <p>{solicitud.genero}</p>
                                    <p>{solicitud.fecha_nacimiento}</p>
                                    <p>{solicitud.rfc}</p>
                                    <p>{solicitud.salario_hora}</p>
                                    {solicitud.telefonos.map((telefono, index) => (
                                        <p key={index}>{telefono.telefono}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="solicitud_containerData_docs">
                                <h4>Documentos:</h4>
                                <ArchivoPDF rutaArchivo={solicitud.ine} />
                                <ArchivoPDF rutaArchivo={solicitud.acta_nacimiento} />
                                <ArchivoPDF rutaArchivo={solicitud.referencias_personales} />
                                <ArchivoPDF rutaArchivo={solicitud.titulo_tecnico} />
                                <ArchivoPDF rutaArchivo={solicitud.titulo_profesional} />
                                <ArchivoPDF rutaArchivo={solicitud.curp} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DashboardSolicitudes;