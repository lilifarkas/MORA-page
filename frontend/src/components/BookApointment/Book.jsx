import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Book.css'
import bgImg from "../../images/Névtelen terv (23).png";
import bookingImg from "../../images/Névtelen terv (35).png";
import { NavLink } from "react-router-dom";
import useFetchUser from '../../hooks/useFetchUser';

function Book(){
    const user = useFetchUser();

    return(
        <div id="appointment">
            <div className="hero mb-0">
                <img src={bgImg} alt="doctor" />
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <h1>Book appointment</h1>
                </div>
            </div>
            <div className="main-booking-text d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column w-50 mt-5 mb-5 gap-5">
                    <div className="booking-text text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div className="booking-text text-center">
                        Vitae ultricies leo integer malesuada nunc vel.
                        Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc.
                        In nibh mauris cursus mattis molestie a iaculis at erat.
                        Accumsan in nisl nisi scelerisque eu ultrices vitae.
                    </div>
                </div>
                <div>
                    <img src={bookingImg} alt="doctor with his family" className="booking-pic mt-5 mb-5"/>
                </div>
            </div>
            
            
            {!user && (
                <>
                    <div className="d-flex flex-column justify-content-center align-items-center gap-5 mb-5 mt-5">
                        <div>
                            <h3 className="text-to-book">To book an appointment please Sign in or Sign up!</h3>
                        </div>
                        <div className="d-flex flex-row gap-5 justify-content-center">
                            <NavLink className="button-text" to="/register">
                                <button className="btn btn-primary">
                                    SIGN UP
                                </button>
                            </NavLink>
                            <NavLink className="button-text" to="/login">
                                <button className="btn btn-primary">
                                    SIGN IN
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </>
            )}

            {user && (
                <>
                    <div className="d-flex flex-column justify-content-center align-items-center gap-5 mb-5 mt-5">
                        <div>
                            <h3 className="text-to-book">You can't change the appointment if it's in less than 24 hours!</h3>
                        </div>
                        <div className="d-flex flex-row gap-5 justify-content-center">
                            <NavLink className="button-text" to="/booking">
                                <button className="btn btn-primary">
                                    Appointments
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </>
            )}
            
        </div>
    )
}


export default Book;