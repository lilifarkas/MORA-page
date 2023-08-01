import './Header.css';
import {NavLink} from "react-router-dom";
import ButtonAnimation from '../Animation/ButtonAmination';

function Header(){
    
    return (
        
        <div>
            <header className="main">
                <div className="container-fluid p-4 text-center bg-light">
                    <div className="row">
                        <div className="">
                            <h1 className="">Prevention and Rehabilitation Center</h1>
                            
                            <a className="btn btn-cta" href="#" role="button">
                                <ButtonAnimation>
                                    <NavLink
                                        activeClass="active"
                                        to="/booking"
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={200}
                                        className="nav-link ctaButton"
                                    >
                                            Book appointment
                                    </NavLink>
                                </ButtonAnimation>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;