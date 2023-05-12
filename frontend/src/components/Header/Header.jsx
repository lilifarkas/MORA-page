import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { Link } from "react-scroll";

function Header(){
    
    
    return (
        
        <div>
            <header className="main">
                <div className="container-fluid p-4 text-center bg-light">
                    <div className="row">
                        <div className="">
                            <h1 className="">Prevention and Rehabilitation Center</h1>
                            <a className="btn btn-primary" href="#" role="button">
                                <Link
                                    activeClass="active"
                                    to="appointment"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={200}
                                    className="nav-link ctaButton"
                                >
                                    Book appointment
                                </Link>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;