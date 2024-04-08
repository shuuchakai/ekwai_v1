import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

import './LoginCard.css';

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email().matches(/@(gmail|outlook)\.com$/, "El correo electrónico debe ser de gmail o outlook"),
        password: yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(30, "La contraseña no puede tener más de 30 caracteres")
            .matches(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
            .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
            .matches(/[0-9]/, "La contraseña debe tener al menos un número")
            .matches(/\W/, "La contraseña debe tener al menos un carácter especial"),
    });

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let hasErrors = false;

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

        if (hasErrors) return;

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                correo_electronico: email,
                contrasena: password
            });

            localStorage.setItem('user', JSON.stringify(response.data.usuario));

            toast(
                <div className="loginToast">
                    <p className="loginToast_title">Inicio de Sesión exitoso</p>
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

            setTimeout(()=> {
                navigate("/dashboard")
            }, 2000)

        } catch (error) {
            toast(
                <div className="loginToast">
                    <p className="loginToast_title">Error al iniciar sesión</p>
                    <p className="loginToast_subtitle">El inicio de sesión no pudo ser completado exitosamente.</p>
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
            console.log(error);
        }
    };

    return (
        <>
            <div className="login_card">
                <div className="login_cardTop">
                    <p className="login_cardTop_title">Inicio de Sesión</p>
                    <div className="login_cardTop_line"></div>
                </div>
                <div className="login_cardMiddle">
                    <form onSubmit={handleSubmit} className="login_cardMiddle_form">
                        <div className="login_cardMiddle_form_inputContainer">
                            <label className="login_cardMiddle_form_inputContainer_label">Correo Electrónico</label>
                            <input
                                className="login_cardMiddle_form_inputContainer_input"
                                type="email"
                                placeholder="pietro@gmail.com"
                                onChange={handleEmailChange}
                            />
                            {emailError && <p className="login_cardMiddle_form_inputContainer_error">{emailError}</p>}
                        </div>
                        <div className="login_cardMiddle_form_inputContainer">
                            <label className="login_cardMiddle_form_inputContainer_label">Contraseña</label>
                            <input
                                className="login_cardMiddle_form_inputContainer_input"
                                type="password"
                                placeholder="********"
                                onChange={handlePasswordChange}
                            />
                            {passwordError && <p className="login_cardMiddle_form_inputContainer_error">{passwordError}</p>}
                        </div>
                        <button type="submit" className="login_cardMiddle_formButton">Iniciar Sesión</button>
                    </form>
                </div>
                <div className="login_cardBottom">
                    <p className="login_cardBottom_text">¿No tienes una cuenta? <Link to="/signup" className="login_cardBottom_text_link">Regístrate</Link></p>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default LoginCard;