import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';
import axios from 'axios';

import Logo from '../../../assets/images/Logo.png';

import './VerifyEmail.css';

function VerifyEmail() {
    const [code, setCode] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/verify-email', { codigo: code });

            toast("El correo ha sido verificado de forma exitosa.", {
                style: {
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                    backgroundColor: '#FFF8FC',
                },
                duration: 3000,
                position: 'top-right'
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (error) {
            toast("El correo electrónico no pudo verificarse", {
                style: {
                    boxShadow: 'rgba(206, 50, 38, 0.4) 0px 0px 0px 2px, rgba(233, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
                    backgroundColor: '#FFF8FC',
                },
                duration: 3000,
                position: 'top-right'
            });
            console.log(error);
        }
    };

    return (
        <>
            <div className="verify">
                <p className="verify_title">Verificación de correo electrónico</p>
                <div className="verify_line"></div>
                <form className="verify_form" onSubmit={handleSubmit}>
                    <label className="verify_formLabel">Introduce el código enviado a tu correo electrónico:</label>
                    <input
                        className="verify_formInput"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                    <button className="verify_formButton" type="submit">Verificar correo electrónico</button>
                </form>
                {/* <p className="verify_text">¿No has recibido el correo electrónico? Haz clic <span className="verify_textLink">aquí</span> para reenviarlo.</p> */}
            </div>
            <Link to="/">
                <img className="verify_logo" src={Logo} alt="Logo" />
            </Link>
            <Toaster />
        </>
    );
};

export default VerifyEmail;