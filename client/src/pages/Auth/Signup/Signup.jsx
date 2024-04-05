import { Link } from "react-router-dom";

import SignupCard from "../../../components/UI/Cards/SignupCard/SignupCard";

import LoginImage from '../../../assets/images/loginimage.jpeg';
import Logo from '../../../assets/images/Logo.png';

function Signup() {
    return (
        <>
            <div className="login">
                <div className="login_leftWrap">
                    <div className="login_left">
                        <img src={LoginImage} alt="loginimage" className="login_leftImage" />
                    </div>
                </div>
                <div className="login_right">
                    <SignupCard />
                </div>
            </div>
            <Link to="/" className="login_logo">
                <img className="login_logo" src={Logo} alt="Logo" />
            </Link>
        </>
    )
}

export default Signup