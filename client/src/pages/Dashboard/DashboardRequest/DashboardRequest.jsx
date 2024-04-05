import { useState } from 'react';
import * as Yup from 'yup';

import Sidebar from '../../../components/UI/Dashboard/Sidebar/Sidebar';

import Logo from '../../../assets/images/Logo.png';

import './DashboardRequest.css';

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    apellidoPaterno: Yup.string().required('El apellido paterno es requerido'),
    apellidoMaterno: Yup.string().required('El apellido materno es requerido'),
    genero: Yup.string().required('El género es requerido'),
    tipoUsuario: Yup.string().required('El tipo de usuario es requerido'),
    correoElectronico: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
    rfc: Yup.string().max(13, 'El RFC no puede tener más de 13 caracteres').required('El RFC es requerido'),
    direccion: Yup.string().required('La dirección es requerida'),
    fechaNacimiento: Yup.date().required('La fecha de nacimiento es requerida').nullable(),
    sueldo: Yup.number().required('El sueldo es requerido'),
    phoneNumbers: Yup.array().of(Yup.string().required('El número de teléfono es requerido')),
    availability: Yup.object().shape({
        lunes: Yup.object().shape({
            trabaja: Yup.boolean(),
            inicio: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de inicio es requerida'),
                otherwise: Yup.string().notRequired()
            }),
            fin: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de fin es requerida'),
                otherwise: Yup.string().notRequired()
            })
        }),
        martes: Yup.object().shape({
            trabaja: Yup.boolean(),
            inicio: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de inicio es requerida'),
                otherwise: Yup.string().notRequired()
            }),
            fin: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de fin es requerida'),
                otherwise: Yup.string().notRequired()
            }),
        }),
        miercoles: Yup.object().shape({
            trabaja: Yup.boolean(),
            inicio: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de inicio es requerida'),
                otherwise: Yup.string().notRequired()
            }),
            fin: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de fin es requerida'),
                otherwise: Yup.string().notRequired()
            }),
        }),
        jueves: Yup.object().shape({
            trabaja: Yup.boolean(),
            inicio: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de inicio es requerida'),
                otherwise: Yup.string().notRequired()
            }),
            fin: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de fin es requerida'),
                otherwise: Yup.string().notRequired()
            }),
        }),
        viernes: Yup.object().shape({
            trabaja: Yup.boolean(),
            inicio: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de inicio es requerida'),
                otherwise: Yup.string().notRequired()
            }),
            fin: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de fin es requerida'),
                otherwise: Yup.string().notRequired()
            }),
        }),
        sabado: Yup.object().shape({
            trabaja: Yup.boolean(),
            inicio: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de inicio es requerida'),
                otherwise: Yup.string().notRequired()
            }),
            fin: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de fin es requerida'),
                otherwise: Yup.string().notRequired()
            }),
        }),
        domingo: Yup.object().shape({
            trabaja: Yup.boolean(),
            inicio: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de inicio es requerida'),
                otherwise: Yup.string().notRequired()
            }),
            fin: Yup.string().when('trabaja', {
                is: true,
                then: Yup.string().required('La hora de fin es requerida'),
                otherwise: Yup.string().notRequired()
            }),
        })
    })
});

function DashboardRequest() {
    const [error, setError] = useState({});
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [availability, setAvailability] = useState({
        lunes: { trabaja: false, inicio: '', fin: '' },
        martes: { trabaja: false, inicio: '', fin: '' },
        miercoles: { trabaja: false, inicio: '', fin: '' },
        jueves: { trabaja: false, inicio: '', fin: '' },
        viernes: { trabaja: false, inicio: '', fin: '' },
        sabado: { trabaja: false, inicio: '', fin: '' },
        domingo: { trabaja: false, inicio: '', fin: '' },
    });

    const handleAvailabilityChange = (day, field, value) => {
        setAvailability({
            ...availability,
            [day]: {
                ...availability[day],
                [field]: value,
            },
        });
    };

    const handlePhoneNumberChange = (index, event) => {
        const newPhoneNumbers = [...phoneNumbers];
        newPhoneNumbers[index] = event.target.value;
        setPhoneNumbers(newPhoneNumbers);
    };

    const addPhoneNumber = () => {
        if (phoneNumbers.length < 5) {
            setPhoneNumbers([...phoneNumbers, '']);
        }
    };

    const handleSumbit = async (event) => {
        event.preventDefault();

        try {
            await validationSchema.validate({
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                genero: '',
                tipoUsuario: '',
                correoElectronico: '',
                rfc: '',
                direccion: '',
                fechaNacimiento: '',
                sueldo: '',
                phoneNumbers: phoneNumbers,
                availability: availability,
            }, { abortEarly: false });

            setError({});
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach((error) => {
                    errorMessages[error.path] = error.message;
                });

                setError(errorMessages);
            };
        };
    };

    return (
        <>
            <Sidebar />
            <div className="request">
                <div className="request_top">
                    <img className="request_topLogo" src={Logo} alt="logo" />
                    <p className="request_topTitle">Registro</p>
                </div>
                <form className="request_middle" onSubmit={handleSumbit}>
                    <div className="request_middleLeft">
                        <div className="request_middleLeft_inputContainer">
                            <label className="request_middleLeft_label">Nombre</label>
                            <input className="request_middleLeft_input" type="text" />
                            {error.nombre && <p className="request_middleLeft_error">{error.nombre}</p>}
                        </div>
                        <div className="request_middleLeft_inputContainer">
                            <label className="request_middleLeft_label">Apellido Materno</label>
                            <input className="request_middleLeft_input" type="text" />
                            {error.apellidoMaterno && <p className="request_middleLeft_error">{error.apellidoMaterno}</p>}
                        </div>
                        <div className="request_middleLeft_inputContainer">
                            <label className="request_middleLeft_label">Tipo de usuario</label>
                            <select className="request_middleLeft_input">
                                <option className="request_middleLeft_option" value="cuidador">Cuidador</option>
                                <option className="request_middleLeft_option" value="enfermero">Enfermero</option>
                            </select>
                            {error.tipoUsuario && <p className="request_middleLeft_error">{error.tipoUsuario}</p>}
                        </div>
                        <div className="request_middleLeft_inputContainer">
                            <label className="request_middleLeft_label">Correo Electrónico</label>
                            <input className="request_middleLeft_input" type="email" />
                            {error.correoElectronico && <p className="request_middleLeft_error">{error.correoElectronico}</p>}
                        </div>
                        <div className="request_middleLeft_inputContainer">
                            <label className="request_middleLeft_label">RFC</label>
                            <input className="request_middleLeft_input" type="text" />
                            {error.rfc && <p className="request_middleLeft_error">{error.rfc}</p>}
                        </div>
                        <div className="request_middleRight_inputContainer">
                            <label className="request_middleRight_label">Disponibilidad</label>
                            {Object.keys(availability).map((day) => (
                                <div key={day}>
                                    <label>{day}</label>
                                    <input
                                        type="checkbox"
                                        checked={availability[day].trabaja}
                                        onChange={(event) => handleAvailabilityChange(day, 'trabaja', event.target.checked)}
                                    />
                                    {error[day] && <p className="request_middleLeft_error">{error[day]}</p>}
                                    {availability[day].trabaja && (
                                        <>
                                            <input
                                                type="time"
                                                value={availability[day].inicio}
                                                onChange={(event) => handleAvailabilityChange(day, 'inicio', event.target.value)}
                                            />
                                            {error[`${day}.inicio`] && <p className="request_middleLeft_error">{error[`${day}.inicio`]}</p>}
                                            <input
                                                type="time"
                                                value={availability[day].fin}
                                                onChange={(event) => handleAvailabilityChange(day, 'fin', event.target.value)}
                                            />
                                            {error[`${day}.fin`] && <p className="request_middleLeft_error">{error[`${day}.fin`]}</p>}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="request_middleRight">
                        <div className="request_middleRight_inputContainer">
                            <label className="request_middleRight_label">Apellido Paterno</label>
                            <input className="request_middleRight_input" type="text" />
                            {error.apellidoPaterno && <p className="request_middleRight_error">{error.apellidoPaterno}</p>}
                        </div>
                        <div className="request_middleRight_inputContainer">
                            <label className="request_middleRight_label">Género</label>
                            <select className="request_middleRight_input">
                                <option className="request_middleRight_option" value="masculino">Masculino</option>
                                <option className="request_middleRight_option" value="femenino">Femenino</option>
                            </select>
                            {error.genero && <p className="request_middleRight_error">{error.genero}</p>}
                        </div>
                        <div className="request_middleRight_inputContainer">
                            <label className="request_middleRight_label">Dirección</label>
                            <input className="request_middleRight_input" type="text" />
                            {error.direccion && <p className="request_middleRight_error">{error.direccion}</p>}
                        </div>
                        <div className="request_middleRight_inputContainer">
                            <label className="request_middleRight_label">Fecha de Nacimiento</label>
                            <input className="request_middleRight_input" type="date" />
                            {error.fechaNacimiento && <p className="request_middleRight_error">{error.fechaNacimiento}</p>}
                        </div>
                        <div className="request_middleRight_inputContainer">
                            <label className="request_middleRight_label">Números Teléfonicos</label>
                            {phoneNumbers.map((phoneNumber, index) => (
                                <div key={index} className="request_middleRight_labelPhones">
                                    <input
                                        className="request_middleRight_input"
                                        type="number"
                                        value={phoneNumber}
                                        onChange={(event) => handlePhoneNumberChange(index, event)}
                                    />
                                    {error.phoneNumbers && <p className="request_middleRight_error">{error.phoneNumbers}</p>}
                                </div>
                            ))}
                            <button type="button" onClick={addPhoneNumber}>Añadir número</button>
                        </div>
                        <div className="request_middleRight_inputContainer">
                            <label className="request_middleRight_label">Sueldo</label>
                            <input className="request_middleRight_input" type="number" />
                            {error.sueldo && <p className="request_middleRight_error">{error.sueldo}</p>}
                        </div>
                    </div>
                    <button className="request_middle_button" type="submit">Enviar</button>
                </form>
                <div className="request_bottom"></div>
            </div>
        </>
    )
}

export default DashboardRequest