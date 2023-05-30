import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import pic from "./1660149889759865_page-0001-removebg-preview.png"
import { Link } from "react-scroll";
import {NavLink, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import { FiLogOut } from 'react-icons/fi';

function NavBar(){
    const [response, setResponse] = useState(false);
    const [name, setName] = useState("");
    const url = "https://localhost:7230/get-user";
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            const response = await fetch(url, {
                method : 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (response.ok) {
                const result = await response.json();
                setName(result.name.toString());
                return true;
            }else{
                const errorResponse = await response.json();
                alert(errorResponse)
                console.log(errorResponse);
                return false;
            }
        }

        getUser().then(result => {
            setResponse(result);
        }).catch(error => {
            console.error(error);
        });

        return;
    }, []);
    
    const handleLogout = async (e) => {
        e.preventDefault();

        const response = await fetch('https://localhost:7230/logout',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.errorMessages[0];
            alert(errorMessage);
            console.log(errorMessage);
            return;
        }

        if(response.ok){
            setResponse(false);
            alert("User logged out");
            navigate("/");
        }
        setTimeout(() => {

        }, 1000);
    };
    
    
    
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
                    {response && 
                        <>
                            <p className="name">
                                Hello {name}
                            </p>
                            <button className="logout" onClick={handleLogout}>
                                <FiLogOut />
                            </button>
                        </>
                        }
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
                                    <p className="nav-title">Home</p>
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
                                    <p className="nav-title">About</p>
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
                                    <p className="nav-title">Appointment</p>
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
                                    <p className="nav-title">Contact</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/login"
                                    offset={-70}
                                    duration={200}
                                    className="nav-link"
                                >
                                    Sign In
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/register"
                                    offset={-70}
                                    duration={200}
                                    className="nav-link"
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                            {response &&
                                <li className="nav-item">
                                    <NavLink
                                        to="/profile"
                                        offset={-70}
                                        duration={200}
                                        className="nav-link"
                                    >
                                        Profile
                                    </NavLink>
                                </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;