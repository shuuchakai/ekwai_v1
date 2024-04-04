import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import Enfermeros from '../../assets/images/Inicio_enfermeras.svg';

import './Home.css';

function Home() {
    return (
        <>
            <Header />
            <main className="home_container">
                <section className="home_container_firstSectionContainer">
                    <div className="home_container_firstSectionContainer_left">
                        <div className="home_container_firstSectionContainer_leftIntroductionContainer">
                            <p className="home_container_firstSectionContainer_leftIntroductionContainer_title">El espacio dedicado a quienes cuidan con el corazón</p>
                            <p className="home_container_firstSectionContainer_leftIntroductionContainer_text">Contrata a un cuidador para que cuide de las personas que más te importan</p>
                            <div className="home_container_firstSectionContainer_leftIntroductionContainer_linkContainer">
                                <p className="home_container_firstSectionContainer_leftIntroductionContainer_linkContainer_text">¿Quiéres cuidar de tus amados?</p>
                                <Link className="home_container_firstSectionContainer_leftIntroductionContainer_linkContainer_link">
                                    Crear una cuenta ya
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="home_container_firstSectionContainer_right">
                        <img src={Enfermeros} alt="Enfermeros" />
                    </div>
                </section>
                <section className="home_container_secondSectionContainer">
                    <div className="home_container_secondSectionContainer_cardsContainer">
                        <div className="home_container_secondSectionContainer_cardsContainer_card">
                            <p className="home_container_secondSectionContainer_cardsContainer_cardTitle">¿Qué hacemos?</p>
                            <p className="home_container_secondSectionContainer_cardsContainer_cardText">Facilitar el acceso a servicios de enfermería o cuidados de alta calidad en la CDMX, conectando de manera eficiente a pacientes con profesionales de la salud calificados.</p>
                        </div>
                        <div className="home_container_secondSectionContainer_cardsContainer_cardMiddle">
                            <p className="home_container_secondSectionContainer_cardsContainer_cardTitleMiddle">¿A qué aspiramos?</p>
                            <p className="home_container_secondSectionContainer_cardsContainer_cardText">Aspiramos a posicionar un servicio para solicitar servicios de enfermería y cuidado, con visibilidad de las necesidades y datos del cliente.</p>
                        </div>
                        <div className="home_container_secondSectionContainer_cardsContainer_card">
                            <p className="home_container_secondSectionContainer_cardsContainer_cardTitle">¿Qué planeamos?</p>
                            <p className="home_container_secondSectionContainer_cardsContainer_cardText">Expandir a Miguel Hidalgo, Coyoacán y Alvaro Obregon en 3 años. Ser reconocidos por una excelente atención al cliente y la calidad de sus trabajadores</p>
                        </div>
                    </div>
                </section>
                <section className="home_container_thirdSectionContainer">
                    <p className="home_container_thirdSectionContainer_title">Valores</p>
                    <div className="home_container_thirdSectionContainer_cardsContainer">
                        <div className="home_container_thirdSectionContainer_cardsContainer_card">
                            <p className="home_container_thirdSectionContainer_cardsContainer_cardIcon">1</p>
                            <p className="home_container_thirdSectionContainer_cardsContainer_cardTitle">Ética y Profesionalismo</p>
                            <p className="home_container_thirdSectionContainer_cardsContainer_cardText">Actuamos con integridad y respeto en todo momento, priorizando el bienestar del paciente y manteniendo los más altos estándares de ética y profesionalismo.</p>
                        </div>
                        <div className="home_container_thirdSectionContainer_cardsContainer_card">
                            <p className="home_container_thirdSectionContainer_cardsContainer_cardIcon">2</p>
                            <p className="home_container_thirdSectionContainer_cardsContainer_cardTitle">Compromiso con el paciente</p>
                            <p className="home_container_thirdSectionContainer_cardsContainer_cardText">Nos dedicamos a proporcionar una atención centrada en el paciente, escuchando sus necesidades y brindando un ambiente de confianza y apoyo.</p>
                        </div>
                        <div className="home_container_thirdSectionContainer_cardsContainer_card">
                            <p className="home_container_thirdSectionContainer_cardsContainer_cardIcon">3</p>
                            <p className="home_container_thirdSectionContainer_cardsContainer_cardTitle">Calidad y Seguridad</p>
                            <p className="home_container_thirdSectionContainer_cardsContainer_cardText">Nos esforzamos por ofrecer servicios de salud de calidad superior, utilizando prácticas basadas en evidencia y priorizando la seguridad en cada aspecto de nuestra operación.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home