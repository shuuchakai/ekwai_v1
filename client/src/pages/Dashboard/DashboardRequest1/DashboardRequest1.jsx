import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

import supabase from '../../../supabaseClient';

import Sidebar from '../../../components/UI/Dashboard/Sidebar/Sidebar';

import Logo from '../../../assets/images/Logo.png';

import './DashboardRequest.css';

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    apellido_paterno: Yup.string().required('El apellido paterno es requerido'),
    apellido_materno: Yup.string().required('El apellido materno es requerido'),
    genero: Yup.string().required('El género es requerido'),
    puesto: Yup.string().required('El tipo de usuario es requerido'),
    correo_electronico: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
    rfc: Yup.string().max(13, 'El RFC no puede tener más de 13 caracteres').required('El RFC es requerido'),
    domicilio: Yup.string().required('La dirección es requerida'),
    fecha_nacimiento: Yup.date().required('La fecha de nacimiento es requerida').nullable(),
    salario_hora: Yup.number().required('El salario_hora es requerido'),
    phoneNumbers: Yup.array().of(Yup.string().required('El número de teléfono es requerido')),
    experiencias_previas: Yup.string(),
    detalles_ultimo_trabajo: Yup.string()
});

function DashboardRequest() {
    const [error, setError] = useState({});
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [step, setStep] = useState(1);
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [razonSalida, setRazonSalida] = useState('');
    const [nombreJefe, setNombreJefe] = useState('');
    const [puesto, setPuesto] = useState('');
    const [formValues, setFormValues] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        genero: '',
        puesto: '',
        correo_electronico: '',
        rfc: '',
        domicilio: '',
        fecha_nacimiento: '',
        salario_hora: '',
        telefonos: phoneNumbers,
        experiencias_previas: '',
        detalles_ultimo_trabajo: '',
    });

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
        window.location.href = '/login';
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handlePhoneNumberChange = (index, event) => {
        const newPhoneNumbers = [...phoneNumbers];
        newPhoneNumbers[index] = event.target.value || ' ';
        setPhoneNumbers(newPhoneNumbers);
        setFormValues({ ...formValues, telefonos: newPhoneNumbers });
    };

    const addPhoneNumber = () => {
        if (phoneNumbers.length < 5) {
            setPhoneNumbers([...phoneNumbers, '']);
        }
    };

    const handleFIleUpload = async (event, fieldName) => {
        try {
            const file = event.target.files[0];
            if (file.size > 1048576) {
                console.log('El archivo es muy grande.');
                return;
            }

            if (file.type !== 'application/pdf') {
                console.log('Solo se aceptan pdfs');
                return;
            }

            const timestamp = new Date().getTime();
            const uniqueFileName = `${timestamp}-${file.name}`;

            const filePath = `${fieldName}/${uniqueFileName}`;

            let { error: uploadError } = await supabase.storage.from('enfermeritas').upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

            if (uploadError) {
                throw new Error('Error al subir el archivo: ' + uploadError.message);
            }

            // Guarda la ruta del archivo en lugar de la URL firmada
            setFormValues({ ...formValues, [fieldName]: filePath });
        } catch (error) {
            console.error(error);
        }
    };

    console.log(user.id_usuario);

    const handleSumbit = async (event) => {
        event.preventDefault();

        const detalles_ultimo_trabajo = `${nombreEmpresa}, ${razonSalida}, ${nombreJefe}, ${puesto}`;
        const newFormValues = { ...formValues, detalles_ultimo_trabajo };

        try {
            await validationSchema.validate(newFormValues, { abortEarly: false });

            setError({});
            console.log('Validation successful, advancing to next step');
            console.log('Form Values:', newFormValues);

            if (step === 3) {
                const response = await axios.post('http://localhost:5000/api/solicitud', { ...newFormValues, id_usuario: user.id_usuario });

                console.log('Response Data:', response.data);
                navigate('/dashboard/solicitudes');
            } else {
                setStep(step + 1);
            }
        } catch (err) {
            console.log('Validation error:', err, newFormValues);
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach((error) => {
                    errorMessages[error.path] = error.message;
                    console.log(`Error on field ${error.path}: ${error.message}`);
                });

                setError(errorMessages);
            };
        };
    };

    return (
        <>
            <Sidebar />
            <div className="request_container">
                <div className="request">
                    <div className="request_top">
                        <img className="request_topLogo" src={Logo} alt="logo" />
                        <p className="request_topTitle">Registro</p>
                    </div>
                    {step === 1 && (
                        <form className="request_middle" onSubmit={handleSumbit}>
                            <div className="request_middleContainer">
                                <div className="request_middleLeft">
                                    <div className="request_middleLeft_inputContainer">
                                        <label className="request_middleLeft_label">Nombre</label>
                                        <input
                                            className="request_middleLeft_input"
                                            type="text"
                                            value={formValues.nombre}
                                            onChange={((event) => setFormValues({ ...formValues, nombre: event.target.value }))}
                                        />
                                        {error.nombre && <p className="request_middleLeft_error">{error.nombre}</p>}
                                    </div>
                                    <div className="request_middleLeft_inputContainer">
                                        <label className="request_middleLeft_label">Apellido Materno</label>
                                        <input
                                            className="request_middleLeft_input"
                                            type="text"
                                            value={formValues.apellido_materno}
                                            onChange={(event) => setFormValues({ ...formValues, apellido_materno: event.target.value })}
                                        />
                                        {error.apellido_materno && <p className="request_middleLeft_error">{error.apellido_materno}</p>}
                                    </div>
                                    <div className="request_middleLeft_inputContainer">
                                        <label className="request_middleLeft_label">Tipo de usuario</label>
                                        <select
                                            className="request_middleLeft_input"
                                            value={formValues.puesto}
                                            onChange={(event) => setFormValues({ ...formValues, puesto: event.target.value })}
                                        >
                                            <option className="request_middleLeft_option" value="">Selecciona una opción</option>
                                            <option className="request_middleLeft_option" value="cuidador">Cuidador</option>
                                            <option className="request_middleLeft_option" value="enfermero">Enfermero</option>
                                        </select>
                                        {error.puesto && <p className="request_middleLeft_error">{error.puesto}</p>}
                                    </div>
                                    <div className="request_middleLeft_inputContainer">
                                        <label className="request_middleLeft_label">Correo Electrónico</label>
                                        <input
                                            className="request_middleLeft_input"
                                            type="email"
                                            value={formValues.correo_electronico}
                                            onChange={((event) => setFormValues({ ...formValues, correo_electronico: event.target.value }))}
                                        />
                                        {error.correo_electronico && <p className="request_middleLeft_error">{error.correo_electronico}</p>}
                                    </div>
                                    <div className="request_middleLeft_inputContainer">
                                        <label className="request_middleLeft_label">RFC</label>
                                        <input
                                            className="request_middleLeft_input"
                                            type="text"
                                            value={formValues.rfc}
                                            onChange={(event) => setFormValues({ ...formValues, rfc: event.target.value })}
                                        />
                                        {error.rfc && <p className="request_middleLeft_error">{error.rfc}</p>}
                                    </div>
                                </div>
                                <div className="request_middleRight">
                                    <div className="request_middleRight_inputContainer">
                                        <label className="request_middleRight_label">Apellido Paterno</label>
                                        <input
                                            className="request_middleRight_input"
                                            type="text"
                                            value={formValues.apellido_paterno}
                                            onChange={(event) => setFormValues({ ...formValues, apellido_paterno: event.target.value })}
                                        />
                                        {error.apellido_paterno && <p className="request_middleLeft_error">{error.apellido_paterno}</p>}
                                    </div>
                                    <div className="request_middleRight_inputContainer">
                                        <label className="request_middleRight_label">Género</label>
                                        <select
                                            className="request_middleRight_input"
                                            value={formValues.genero}
                                            onChange={(event) => setFormValues({ ...formValues, genero: event.target.value })}
                                        >
                                            <option className="request_middleRight_option" value="">Selecciona una opción</option>
                                            <option className="request_middleRight_option" value="masculino">Masculino</option>
                                            <option className="request_middleRight_option" value="femenino">Femenino</option>
                                        </select>
                                        {error.genero && <p className="request_middleLeft_error">{error.genero}</p>}
                                    </div>
                                    <div className="request_middleRight_inputContainer">
                                        <label className="request_middleRight_label">Dirección</label>
                                        <input
                                            className="request_middleRight_input"
                                            type="text"
                                            value={formValues.domicilio}
                                            onChange={(event) => setFormValues({ ...formValues, domicilio: event.target.value })}
                                        />
                                        {error.domicilio && <p className="request_middleLeft_error">{error.domicilio}</p>}
                                    </div>
                                    <div className="request_middleRight_inputContainer">
                                        <label className="request_middleRight_label">Fecha de Nacimiento</label>
                                        <input
                                            className="request_middleRight_input"
                                            type="date"
                                            value={formValues.fecha_nacimiento}
                                            onChange={(event) => setFormValues({ ...formValues, fecha_nacimiento: event.target.value })}
                                        />
                                        {error.fecha_nacimiento && <p className="request_middleLeft_error">{error.fecha_nacimiento}</p>}
                                    </div>
                                    <div className="request_middleRight_inputContainer">
                                        <label className="request_middleRight_label">Números Teléfonicos</label>
                                        {phoneNumbers.map((phoneNumber, index) => (
                                            <div key={index}>
                                                <label className="request_middleRight_label">Número de teléfono {index + 1}</label>
                                                <input
                                                    className="request_middleRight_input"
                                                    type="text"
                                                    value={phoneNumber}
                                                    onChange={(event) => handlePhoneNumberChange(index, event)}
                                                />
                                                {error.phoneNumbers && <p className="request_middleLeft_error">{error.phoneNumbers}</p>}
                                            </div>
                                        ))}
                                        <button className="request_middle_button" type="button" onClick={addPhoneNumber}>Añadir número</button>
                                    </div>
                                    <div className="request_middleRight_inputContainer">
                                        <label className="request_middleRight_label">Salario por hora</label>
                                        <input
                                            className="request_middleRight_input"
                                            type="number"
                                            value={formValues.salario_hora}
                                            onChange={(event) => setFormValues({ ...formValues, salario_hora: event.target.value })}
                                        />
                                        {error.salario_hora && <p className="request_middleLeft_error">{error.salario_hora}</p>}
                                    </div>
                                </div>
                            </div>
                            <button className="request_middle_button" type="submit">Siguiente</button>
                        </form>
                    )}
                    {step === 2 && (
                        <form className="request_middle" onSubmit={handleSumbit}>
                            <div className="request_middleContainer">
                                <div className="request_middleLeft">
                                    <div className="request_middleLeft_inputContainer">
                                        <label className="request_middleLeft_label">Experiencias Previas</label>
                                        <textarea
                                            className="request_middleLeft_inputArea"
                                            value={formValues.experiencias_previas}
                                            onChange={(event) => setFormValues({ ...formValues, experiencias_previas: event.target.value })}
                                        />
                                        {error.experiencias_previas && <p className="request_middleLeft_error">{error.experiencias_previas}</p>}
                                    </div>
                                    <div className="request_middleLeft_lastJob">
                                        <div className="request_middleLeft_lastJob_left">
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">Nombre de la empresa</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="text"
                                                    value={nombreEmpresa}
                                                    onChange={(event) => setNombreEmpresa(event.target.value)}
                                                />
                                                {error.detalles_ultimo_trabajo && <p className="request_middleLeft_error">{error.detalles_ultimo_trabajo}</p>}
                                            </div>
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">¿Por qué ya no trabaja ahí?</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="text"
                                                    value={razonSalida}
                                                    onChange={(event) => setRazonSalida(event.target.value)}
                                                />
                                                {error.detalles_ultimo_trabajo && <p className="request_middleLeft_error">{error.detalles_ultimo_trabajo}</p>}
                                            </div>
                                        </div>
                                        <div className="request_middleLeft_lastJob_right">
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">Nombre de su anterior jefe</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="text"
                                                    value={nombreJefe}
                                                    onChange={(event) => setNombreJefe(event.target.value)}
                                                />
                                                {error.detalles_ultimo_trabajo && <p className="request_middleLeft_error">{error.detalles_ultimo_trabajo}</p>}
                                            </div>
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">Puesto</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="text"
                                                    value={puesto}
                                                    onChange={(event) => setPuesto(event.target.value)}
                                                />
                                                {error.detalles_ultimo_trabajo && <p className="request_middleLeft_error">{error.detalles_ultimo_trabajo}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="request_middle_buttonContainer">
                                <button className="request_middle_button" onClick={handleBack}>Regresar</button>
                                <button className="request_middle_button" type="submit">Siguiente</button>
                            </div>
                        </form>
                    )}
                    {step === 3 && (
                        <form onSubmit={handleSumbit} className="request_middle">
                            <div className="request_middleContainer">
                                <div className="request_middleLeft">
                                    <div className="request_middleLeft_files">
                                        <div className="request_middleLeft_filesLeft">
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">INE</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(event) => handleFIleUpload(event, 'ine')}
                                                />
                                            </div>
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">CURP</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(event) => handleFIleUpload(event, 'curp')}
                                                />
                                            </div>
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">Título técnico</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(event) => handleFIleUpload(event, 'titulo_tecnico')}
                                                />
                                            </div>
                                        </div>
                                        <div className="request_middleLeft_filesRight">
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">Acta de nacimiento</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(event) => handleFIleUpload(event, 'acta_nacimiento')}
                                                />
                                            </div>
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">Referencias Personales</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(event) => handleFIleUpload(event, 'referencias_personales')}
                                                />
                                            </div>
                                            <div className="request_middleLeft_inputContainer">
                                                <label className="request_middleLeft_label">Título profesional</label>
                                                <input
                                                    className="request_middleLeft_input"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(event) => handleFIleUpload(event, 'titulo_profesional')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="request_middle_buttonContainer">
                                <button className="request_middle_button" onClick={handleBack}>Regresar</button>
                                <button className="request_middle_button" type="submit">Terminar Solicitud</button>
                            </div>
                        </form>
                    )}
                    <div className="request_bottom"></div>
                </div>
            </div >
        </>
    )
}

export default DashboardRequest