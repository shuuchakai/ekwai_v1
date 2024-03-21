import { Link } from 'react-router-dom';

import Logo from '../../assets/images/Logo.png';

import './Header.css';

function Header() {
    return (
        <header className="header_container">
            <nav className="header_containerContent">
                <Link to="/" className="header_containerContent_left">
                    <img className="header_containerContent_leftLogo_image" src={Logo} alt="Logo" />
                    <div className="header_containerContent_leftLogo_text">
                        <p className="header_containerContent_leftLogo_textTop">Enfermeritas</p>
                        <p className="header_containerContent_leftLogo_textBottom">Kawaii</p>
                    </div>
                </Link>
                <div className="header_containerContent_right">
                    <nav className="header_containerContent_rightLinks">
                        <Link to="/about" className="header_containerContent_rightLinksLink">Nosotros</Link>
                        <Link to="/contact" className="header_containerContent_rightLinksLink">Contacto</Link>
                    </nav>
                    <Link className="header_containerContent_rightButton">Iniciar Sesión</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header