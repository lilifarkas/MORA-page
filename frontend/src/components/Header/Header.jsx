import './Header.css';
import {NavLink} from "react-router-dom";
import ButtonAnimation from '../Animation/ButtonAmination';

function Header(){
    
    return (
        
        <div>
            <header className="main">
                <div className="container-fluid p-4 text-center bg-light">
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="">Prevention and Rehabilitation Center</h1>
                            <div className="cta-container">
                                <ButtonAnimation>
                                    <NavLink
                                        to="/booking"
                                        spy={true.toString()}
                                        smooth={true.toString()}
                                        offset={-70}
                                        duration={200}
                                        className="nav-link ctaButton"
                                    >
                                        Book appointment
                                    </NavLink>
                                </ButtonAnimation>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;