import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import pic from "./1660149889759865_page-0001-removebg-preview.png"


function NavBar(){


    return(
        <div>
            <nav className="navbar navbar-expand-lg custom-bg-color">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={pic} alt="Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#">Book apointment</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;