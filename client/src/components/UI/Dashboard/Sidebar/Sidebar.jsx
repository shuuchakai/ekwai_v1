import { Link } from 'react-router-dom';

import Logo from '../../../../assets/images/Logo.png';
import HandShake from '../../../../assets/images/handshake.svg';
import Logout from '../../../../assets/images/logout.svg';

import './Sidebar.css';

function Sidebar() {
    return (
        <section className="sidebar_container">
            <div className="sidebar">
                <div className="sidebar_top">
                    <img src={Logo} alt="enfermerita" className="sidebar_topLogo" />
                    <p className="sidebar_topLogoText">Enfermeras <span>Kawaii</span></p>
                </div>
                <div className="sidebar_middle">
                    <Link to="/dashboard" className="sidebar_middleLink">
                        <img src={HandShake} alt="handshake" className="sidebar_middleLinkIcon" />
                        <p className="sidebar_middleLinkText">Agregar <span>empleado</span></p>
                    </Link>
                </div>
                <div className="sidebar_bottom">
                    <Link className="sidebar_bottomLink">
                        <p className="sidebar_bottomLinkText">Cerrar sesión</p>
                        <img src={Logout} alt="logout" className="sidebar_bottomLinkIcon" />
                    </Link>
                </div>
            </div>
        </section >
    )
}

export default Sidebar