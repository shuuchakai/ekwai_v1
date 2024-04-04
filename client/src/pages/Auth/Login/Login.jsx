import { Link } from 'react-router-dom';

import LoginCard from '../../../components/UI/Cards/LoginCard/LoginCard';

import LoginImage from '../../../assets/images/loginimage.jpeg';
import Logo from '../../../assets/images/Logo.png';

import './Login.css';

function Login() {
    return (
        <>
            <div className="login">
                <div className="login_leftWrap">
                    <div className="login_left">
                        <img className="login_leftImage" src={LoginImage} alt="LoginImage" />
                    </div>
                </div>
                <div className="login_right">
                    <LoginCard />
                </div>
            </div>
            <Link to="/" className="login_logo">
                <img className="login_logo" src={Logo} alt="Logo" />
            </Link>
        </>
    )
}

export default Login;