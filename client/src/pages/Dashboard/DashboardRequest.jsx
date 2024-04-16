import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from '../../components/UI/Dashboard/Sidebar/Sidebar';
import validationSchema from './schemas/request.schema';

import Logo from '../../assets/images/Logo.png';

import './DashboardRequest.css';

function DashboardRequest() {
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [formValues, setFormValues] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        genero: '',
        puesto: '',
        correo_electronico: '',
        rfc: '',
        domicilio: '',
        fecha_nacimiento: null,
        salario_hora: '',
        telefonos: phoneNumbers,//ahorita lo dejamos así
        experiencias_previas: '',
        detalles_ultimo_trabajo: ''
    });
    const [error, setError] = useState({});
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        navigate('/login');
    }

    const handlePhoneNumberChange = (index, event) => {
        const newPhoneNumbers = [...phoneNumbers];
        newPhoneNumbers[index] = event.target.value || '';
        setPhoneNumbers(newPhoneNumbers);
        setFormValues({ ...formValues, telefonos: newPhoneNumbers });
    }

    const addPhoneNumber = () => {
        if (phoneNumbers.length < 5) {
            setPhoneNumbers([...phoneNumbers, '']);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleNext = () => {
        setStep(step + 1);
    }


    return (
        <div className="request_main">
            <div className="request_mainSidebar">
                <Sidebar />
            </div>
            <div className="request_mainContent">
                <div className="request_mainContent_card">
                    {step === 1 && (
                        <>
                            <div className="request_mainContent_cardLogo">
                                <img className="request_mainContent_cardLogo_image" src={Logo} alt="Logo" />
                                <p className="request_mainContent_cardLogo_text">Datos Personales</p>
                            </div>
                            <form className="request_mainContent_cardLogo_form" onSubmit={handleNext}>
                                <div className="request_mainContent_cardLogo_formLeft">
                                    <div className="request_mainContent_cardLogo_formLeft_inputContainer">
                                        <label className="request_mainContent_cardLogo_formLeft_inputContainer_label">Nombre</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formValues.nombre}
                                            className="request_mainContent_cardLogo_formLeft_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, nombre: e.target.value }))}
                                        />
                                        {error.nombre && <p className="request_mainContent_cardLogo_formLeft_inputContainer_error">{error.nombre}</p>}
                                    </div>
                                    <div className="request_mainContent_cardLogo_formLeft_inputContainer">
                                        <label className="request_mainContent_cardLogo_formLeft_inputContainer_label">Apellido Materno</label>
                                        <input
                                            type="text"
                                            name="apellido_materno"
                                            value={formValues.apellido_paterno}
                                            className="request_mainContent_cardLogo_formLeft_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, apellido_paterno: e.target.value }))}
                                        />
                                        {error.apellido_paterno && <p className="request_mainContent_cardLogo_formLeft_inputContainer_error">{error.apellido_paterno}</p>}
                                    </div>
                                    <div className="request_mainContent_cardLogo_formLeft_inputContainer">
                                        <label className="request_mainContent_cardLogo_formLeft_inputContainer_label">Puesto</label>
                                        <select
                                            name="puesto"
                                            value={formValues.puesto}
                                            className="request_mainContent_cardLogo_formLeft_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, puesto: e.target.value }))}
                                        >
                                            <option value="">Selecciona un puesto</option>
                                            <option value="enfermero">Enfermero</option>
                                            <option value="cuidador">Cuidador</option>
                                        </select>
                                        {error.puesto && <p className="request_mainContent_cardLogo_formLeft_inputContainer_error">{error.puesto}</p>}
                                    </div>
                                    <div className="request_mainContent_cardLogo_formLeft_inputContainer">
                                        <label className="request_mainContent_cardLogo_formLeft_inputContainer_label">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            name="correo_electronico"
                                            value={formValues.correo_electronico}
                                            className="request_mainContent_cardLogo_formLeft_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, correo_electronico: e.target.value }))}
                                        />
                                        {error.correo_electronico && <p className="request_mainContent_cardLogo_formLeft_inputContainer_error">{error.correo_electronico}</p>}
                                    </div>
                                    <div className="request_mainContent_cardLogo_formLeft_inputContainer_phone">
                                        <label className="request_mainContent_cardLogo_formLeft_inputContainer_label">Números Telefónicos</label>
                                        {phoneNumbers.map((phoneNumber, index) => (
                                            <div key={index} className="request_mainContent_cardLogo_formLeft_inputContainer_phoneNumber">
                                                <input
                                                    type="text"
                                                    name="teléfonos"
                                                    value={phoneNumber}
                                                    className="request_mainContent_cardLogo_formLeft_inputContainer_phoneNumber_input"
                                                    onChange={((e) => handlePhoneNumberChange(index, e))}
                                                />
                                                {error.telefonos && error.telefonos[index] && <p className="request_mainContent_cardLogo_formLeft_inputContainer_error">{error.telefonos[index]}</p>}
                                            </div>
                                        ))}
                                        <button type="button" className="request_mainContent_cardLogo_formLeft_inputContainer_phoneNumber_button" onClick={addPhoneNumber}>Agregar número</button>
                                    </div>
                                </div>
                                <div className="request_mainContent_cardLogo_formRight">
                                    <div className="request_mainContent_cardLogo_formRight_inputContainer">
                                        <label className="request_mainContent_cardLogo_formRight_inputContainer_label">Apellido Paterno</label>
                                        <input
                                            type="text"
                                            name="apellido_paterno"
                                            value={formValues.apellido_materno}
                                            className="request_mainContent_cardLogo_formRight_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, apellido_materno: e.target.value }))}
                                        />
                                        {error.apellido_materno && <p className="request_mainContent_cardLogo_formRight_inputContainer_error">{error.apellido_materno}</p>}
                                    </div>
                                    <div className="request_mainContent_cardLogo_formRight_inputContainer">
                                        <label className="request_mainContent_cardLogo_formRight_inputContainer_label">Género</label>
                                        <select
                                            name="genero"
                                            value={formValues.genero}
                                            className="request_mainContent_cardLogo_formRight_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, genero: e.target.value }))}
                                        >
                                            <option value="">Selecciona un género</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">Femenino</option>
                                        </select>
                                        {error.genero && <p className="request_mainContent_cardLogo_formRight_inputContainer_error">{error.genero}</p>}
                                    </div>
                                    <div className="request_mainContent_cardLogo_formRight_inputContainer">
                                        <label className="request_mainContent_cardLogo_formRight_inputContainer_label">RFC</label>
                                        <input
                                            type="text"
                                            name="rfc"
                                            value={formValues.rfc}
                                            className="request_mainContent_cardLogo_formRight_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, rfc: e.target.value }))}
                                        />
                                        {error.rfc && <p className="request_mainContent_cardLogo_formRight_inputContainer_error">{error.rfc}</p>}
                                    </div>
                                    <div className="request_mainContent_cardLogo_formRight_inputContainer">
                                        <label className="request_mainContent_cardLogo_formRight_inputContainer_label">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            name="fecha_nacimiento"
                                            value={formValues.fecha_nacimiento}
                                            className="request_mainContent_cardLogo_formRight_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, fecha_nacimiento: e.target.value }))}
                                        />
                                        {error.fecha_nacimiento && <p className="request_mainContent_cardLogo_formRight_inputContainer_error">{error.fecha_nacimiento}</p>}
                                    </div>
                                    <div className="request_mainContent_cardLogo_formRight_inputContainer">
                                        <label className="request_mainContent_cardLogo_formRight_inputContainer_label">Domicilio</label>
                                        <input
                                            type="text"
                                            name="domicilio"
                                            value={formValues.domicilio}
                                            className="request_mainContent_cardLogo_formRight_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, domicilio: e.target.value }))}
                                        />
                                        {error.domicilio && <p className="request_mainContent_cardLogo_formRight_inputContainer_error">{error.domicilio}</p>}
                                    </div>
                                    {/* sueldo */}
                                    <div className="request_mainContent_cardLogo_formRight_inputContainer">
                                        <label className="request_mainContent_cardLogo_formRight_inputContainer_label">Salario por hora</label>
                                        <input
                                            type="number"
                                            name="salario_hora"
                                            value={formValues.salario_hora}
                                            className="request_mainContent_cardLogo_formRight_inputContainer_input"
                                            onChange={((e) => setFormValues({ ...formValues, salario_hora: e.target.value }))}
                                        />
                                        {error.salario_hora && <p className="request_mainContent_cardLogo_formRight_inputContainer_error">{error.salario_hora}</p>}
                                    </div>
                                </div>
                                <button type="submit" className="request_mainContent_cardLogo_buttons_button">Siguiente</button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashboardRequest