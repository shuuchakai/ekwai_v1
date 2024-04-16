import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "../../../components/UI/Dashboard/Sidebar/Sidebar";
import InputContainer from "../../../components/UI/InputContainer/InputContainer";
import SelectContainer from "../../../components/UI/SelectContainer/SelectContainer";
import PhoneNumberField from "../../../components/UI/PhoneNumberInput/PhoneNumberInput";

import validationSchema from '../schemas/request.schema';
import Logo from '../../../assets/images/Logo.png';

import './DashboardRequest.css';

function DashboardRequest() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [error, setError] = useState({});
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
        telefonos: phoneNumbers,
        experiencias_previas: '',
        detalles_ultimo_trabajo: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    const handlePhoneNumberChange = (index, event) => {
        const newPhoneNumbers = [...phoneNumbers];
        newPhoneNumbers[index] = event.target.value || '';
        setPhoneNumbers(newPhoneNumbers);
        setFormValues({ ...formValues, telefonos: newPhoneNumbers });
    };

    const addPhoneNumner = () => {
        if (phoneNumbers.length < 5) {
            setPhoneNumbers([...phoneNumbers, '']);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

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
                    console.log(`Error en: ${error.path}: ${error.message}`);
                });

                setError(errorMessages);
            };
        };
    };

    return (
        <div className="request_main">
            <div className="request_mainSidebar">
                <Sidebar />
            </div>
            <div className="request_mainContent">
                <div className="request_mainContent_card">
                    <div className="request_mainContent_cardForm">
                        <div className="request_mainContent_cardForm_logo">
                            <img src={Logo} alt="Logo" className="request_mainContent_card_logoImage" />
                            <p className="request_mainContent_cardForm_logoText">Datos Personales</p>
                        </div>
                        {step === 1 && (
                            <form onChange={handleSumbit} className="request_mainContent_cardForm_containerForm">
                                <div className="request_mainContent_cardForm_container">
                                    <div className="request_mainContent_cardForm_containerLeft">
                                        <InputContainer
                                            labelContent="Nombre"
                                            inputType="text"
                                            inputError={error.nombre}
                                            inputValue={formValues.nombre}
                                            inputOnChange={(event) => setFormValues({ ...formValues, nombre: event.target.value })}
                                        />
                                        <InputContainer
                                            labelContent="Apellido Materno"
                                            inputType="text"
                                            inputError={error.apellido_materno}
                                            inputValue={formValues.apellido_materno}
                                            inputOnChange={(event) => setFormValues({ ...formValues, apellido_materno: event.target.value })}
                                        />
                                        {/* puesto select */}
                                        <SelectContainer
                                            labelContent="Puesto"
                                            inputError={error.puesto}
                                            inputOnChange={(event) => setFormValues({ ...formValues, puesto: event.target.value })}
                                            inputValue={formValues.puesto}
                                            selectOptions={[
                                                { value: 'cuidador', label: 'Cuidador' },
                                                { value: 'enfermero', label: 'Enfermero' }
                                            ]}
                                        />
                                        <InputContainer
                                            labelContent="Correo Electrónico"
                                            inputType="email"
                                            inputError={error.correo_electronico}
                                            inputValue={formValues.correo_electronico}
                                            inputOnChange={(event) => setFormValues({ ...formValues, correo_electronico: event.target.value })}
                                        />
                                        <InputContainer
                                            labelContent="RFC"
                                            inputType="text"
                                            inputError={error.rfc}
                                            inputValue={formValues.rfc}
                                            inputOnChange={(event) => setFormValues({ ...formValues, rfc: event.target.value })}
                                        />
                                    </div>
                                    <div className="request_mainContent_cardForm_containerRight">
                                        <InputContainer
                                            labelContent="Apellido Paterno"
                                            inputType="text"
                                            inputError={error.apellido_paterno}
                                            inputValue={formValues.apellido_paterno}
                                            inputOnChange={(event) => setFormValues({ ...formValues, apellido_paterno: event.target.value })}
                                        />
                                        <SelectContainer
                                            labelContent="Género"
                                            inputError={error.genero}
                                            inputOnChange={(event) => setFormValues({ ...formValues, genero: event.target.value })}
                                            inputValue={formValues.genero}
                                            selectOptions={[
                                                { value: 'masculino', label: 'Masculino' },
                                                { value: 'femenino', label: 'Femenino' }
                                            ]}
                                        />
                                        <InputContainer
                                            labelContent="Domicilio"
                                            inputType="text"
                                            inputError={error.domicilio}
                                            inputValue={formValues.domicilio}
                                            inputOnChange={(event) => setFormValues({ ...formValues, domicilio: event.target.value })}
                                        />
                                        <InputContainer
                                            labelContent="Fecha de Nacimiento"
                                            inputType="date"
                                            inputError={error.fecha_nacimiento}
                                            inputValue={formValues.fecha_nacimiento}
                                            inputOnChange={(event) => setFormValues({ ...formValues, fecha_nacimiento: event.target.value })}
                                        />
                                        <InputContainer
                                            labelContent="Salario por Hora"
                                            inputType="text"
                                            inputError={error.salario_hora}
                                            inputValue={formValues.salario_hora}
                                            inputOnChange={(event) => setFormValues({ ...formValues, salario_hora: event.target.value })}
                                        />

                                        <PhoneNumberField
                                            phoneNumbers={phoneNumbers}
                                            handlePhoneNumberChange={handlePhoneNumberChange}
                                            error={error}
                                            addPhoneNumber={addPhoneNumner}
                                        />
                                    </div>
                                </div>
                                <div className="request_mainContent_cardForm_container_buttons">
                                    <button type="submit" className="request_mainContent_cardForm_container_button">Siguiente</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardRequest;