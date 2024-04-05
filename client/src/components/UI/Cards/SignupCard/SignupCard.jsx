import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

import './SignupCard.css';

function SignupCard() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup.string().required("El nombre es requerido"),
        email: yup.string().email().matches(/@(gmail|outlook)\.com$/, "El correo electrónico debe ser de gmail o outlook"),
        password: yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(30, "La contraseña no puede tener más de 30 caracteres")
            .matches(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
            .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
            .matches(/[0-9]/, "La contraseña debe tener al menos un número")
            .matches(/\W/, "La contraseña debe tener al menos un carácter especial"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    });

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setUsernameError('');
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordError('');
    };

    const handleAcceptTermsChange = (event) => {
        setAcceptTerms(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let hasErrors = false;

        try {
            await schema.validateAt('username', { username });
        } catch (error) {
            setUsernameError(error.message);
            hasErrors = true;
        }

        try {
            await schema.validateAt('email', { email });
        } catch (error) {
            setEmailError(error.message);
            hasErrors = true;
        }

        try {
            await schema.validateAt('password', { password });
        } catch (error) {
            setPasswordError(error.message);
            hasErrors = true;
        }

        try {
            await schema.validateAt('confirmPassword', { confirmPassword, password });
        } catch (error) {
            setConfirmPasswordError(error.message);
            hasErrors = true;
        }

        if (!acceptTerms) {
            toast("Debes aceptar los términos y condiciones para registrarte.",
                {
                    style: {
                        boxShadow: 'rgba(206, 50, 38, 0.4) 0px 0px 0px 2px, rgba(233, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
                        backgroundColor: '#FFF8FC',
                    },
                    duration: 3000,
                    position: 'top-right'
                });
            hasErrors = true;
        }

        if (hasErrors) return;

        try {
            const response = await axios.post('http://localhost:5000/api/admin', {
                nombre: username,
                correo_electronico: email,
                contrasena: password
            });

            localStorage.setItem('token', response.data.token);

            toast(
                <div className="signupToast">
                    <p className="signupToast_title">Registro exitoso</p>
                </div>,
                {
                    style: {
                        boxShadow: 'rgba(24, 255, 44, 0.4) 0px 0px 0px 2px, rgba(24, 233, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
                        backgroundColor: '#FFF8FC',
                    },
                    duration: 3000,
                    position: 'top-right'
                }
            );

            navigate("/verify-email");
        } catch (error) {
            toast(
                <div className="signupToast">
                    <p className="signupToast_title">Error al registrarse</p>
                    <p className="signupToast_subtitle">El registro no pudo ser completado exitosamente.</p>
                </div>,
                {
                    style: {
                        boxShadow: 'rgba(206, 50, 38, 0.4) 0px 0px 0px 2px, rgba(233, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
                        backgroundColor: '#FFF8FC',
                    },
                    duration: 3000,
                    position: 'top-right'
                }
            );
        }
    };

    return (
        <>
            <div className="signup_card">
                <div className="login_cardTop">
                    <p className="login_cardTop_title">Registro</p>
                    <div className="login_cardTop_line"></div>
                </div>
                <div className="login_cardMiddle">
                    <form onSubmit={handleSubmit} className="login_cardMiddle_form">
                        <div className="login_cardMiddle_form_inputContainer">
                            <label className="login_cardMiddle_form_inputContainer_label">Nombre</label>
                            <input
                                className="login_cardMiddle_form_inputContainer_input"
                                type="text"
                                placeholder="Introduce tu nombre"
                                onChange={handleUsernameChange}
                            />
                            {usernameError && <p className="login_cardMiddle_form_inputContainer_error">{usernameError}</p>}
                        </div>
                        <div className="login_cardMiddle_form_inputContainer">
                            <label className="login_cardMiddle_form_inputContainer_label">Correo Electrónico</label>
                            <input
                                className="login_cardMiddle_form_inputContainer_input"
                                type="email"
                                placeholder="Introduce tu correo electrónico"
                                onChange={handleEmailChange}
                            />
                            {emailError && <p className="login_cardMiddle_form_inputContainer_error">{emailError}</p>}
                        </div>
                        <div className="login_cardMiddle_form_inputContainer">
                            <label className="login_cardMiddle_form_inputContainer_label">Contraseña</label>
                            <input
                                className="login_cardMiddle_form_inputContainer_input"
                                type="password"
                                placeholder="Introduce tu contraseña"
                                onChange={handlePasswordChange}
                            />
                            {passwordError && <p className="login_cardMiddle_form_inputContainer_error">{passwordError}</p>}
                        </div>
                        <div className="login_cardMiddle_form_inputContainer">
                            <label className="login_cardMiddle_form_inputContainer_label">Confirmar Contraseña</label>
                            <input
                                className="login_cardMiddle_form_inputContainer_input"
                                type="password"
                                placeholder="Repite tu contraseña"
                                onChange={handleConfirmPasswordChange}
                            />
                            {confirmPasswordError && <p className="login_cardMiddle_form_inputContainer_error">{confirmPasswordError}</p>}
                        </div>
                        <div className="signup_cardMiddle_form_checkboxContainer">
                            <input
                                className="signup_cardMiddle_form_checkboxContainer_checkbox"
                                type="checkbox"
                                onChange={handleAcceptTermsChange}
                            />
                            <label className="signup_cardMiddle_form_checkboxContainer_label">Acepto los términos y condiciones</label>
                        </div>
                        <button className="login_cardMiddle_formButton">Registrarse</button>
                    </form>
                </div>
                <div className="login_cardBottom">
                    <p className="login_cardBottom_text">¿Ya tienes una cuenta? </p><Link to="/login" className="login_cardBottom_text_link">Inicia Sesión</Link>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default SignupCard;