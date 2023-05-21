import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import pic from "./1660149889759865_page-0001-removebg-preview.png"
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

function NavBar(){
    
    return(
        <header id="home">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img
                            src={pic}
                            alt="Logo"
                        />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link
                                    activeClass="active"
                                    to="home"
                                    smooth={true}
                                    offset={-70}
                                    duration={200}
                                    className="nav-link"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    activeClass="active"
                                    to="about"
                                    smooth={true}
                                    offset={-70}
                                    duration={200}
                                    className="nav-link"
                                >
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    activeClass="active"
                                    to="appointment"
                                    smooth={true}
                                    offset={-70}
                                    duration={200}
                                    className="nav-link"
                                >
                                    Book appointment
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    activeClass="active"
                                    to="contact"
                                    smooth={true}
                                    offset={-70}
                                    duration={200}
                                    className="nav-link"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    activeClass="active"
                                    to="/register"
                                    smooth={true}
                                    offset={-70}
                                    duration={200}
                                    className="nav-link"
                                >
                                    Register
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;