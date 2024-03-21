import { FaFacebookSquare, FaInstagram, FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/Logo.png';

import './Footer.css';

function Footer() {
    return (
        <footer className="footer_container">
            <nav className="footer_containerContent">
                <div className="footer_containerContent_left">
                    <div className="footer_containerContent_leftLinks">
                        <Link to="/about" className="footer_containerContent_leftLinksLink">Nosotros</Link>
                        <Link to="/contact" className="footer_containerContent_leftLinksLink">Contacto</Link>
                    </div>
                    <div className="footer_containerContent_leftLine"></div>
                    <div className="footer_containerContent_leftSocial">
                        <Link className="footer_containerContent_leftSocialLink">
                            <FaFacebookSquare className="footer_containerContent_leftSocialLink" />
                        </Link>
                        <Link className="footer_containerContent_leftSocialLink">
                            <FaInstagram className="footer_containerContent_leftSocialLink" />
                        </Link>
                        <Link className="footer_containerContent_leftSocialLink">
                            <FaGoogle className="footer_containerContent_leftSocialLink" />
                        </Link>
                    </div>
                </div>
                <div className="footer_containerContent_right">
                    <Link className="footer_containerContent_rightLogo">
                        <img className="footer_containerContent_rightLogo_image" src={Logo} alt="Logo" />
                        <div className="footer_containerContent_rightLogo_text">
                            <p className="footer_containerContent_rightLogo_textTop">Enfermeritas</p>
                            <p className="footer_containerContent_rightLogo_textBottom">Kawaii</p>
                        </div>
                    </Link>
                    <p className="footer_containerContent_rightText">© 2024 Enfermeritas Kawaii.</p>
                </div>
            </nav>
        </footer>
    )
}

export default Footer