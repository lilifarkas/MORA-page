import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { Link } from "react-scroll";
import {NavLink, useNavigate} from "react-router-dom";
function Header(){
    
    
    return (
        
        <div>
            <header className="main">
                <div className="container-fluid p-4 text-center bg-light">
                    <div className="row">
                        <div className="">
                            <h1 className="">Prevention and Rehabilitation Center</h1>
                            <a className="btn btn-primary" href="#" role="button">
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
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;