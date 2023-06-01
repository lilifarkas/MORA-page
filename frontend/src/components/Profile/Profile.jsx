import './Profile.css'
import bgImg from "../../images/Névtelen terv (28).png";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import useFetchUser from '../../hooks/useFetchUser';
import useFetch from '../../hooks/useFetch';

function Profile(){
    const user = useFetchUser();
    const navigate = useNavigate();
    
    const handleEditProfile = async (e) => {
        e.preventDefault();
        
        navigate("/edit");
    };


    return (
        <div className="main3">
            <div className="main2">
                <img src={bgImg} alt="doctor" />
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <div className="back-button">
                        <NavLink
                            to="/"
                            className="back"
                        >
                            <FiArrowLeft className="back-icon" />
                            Back
                        </NavLink>
                    </div>
                    <div className="d-flex flex-row main3 justify-content-center align-items-center">
                        <div>
                            {user && <>
                                <h1>Name: {user.name}</h1>
                                <h1>Email: {user.email}</h1>
                                <h1>Phone Number: {user.phone}</h1>
                                <h1>Booked dates: {user.bookedDates}</h1>
                            </>}
                        </div>
                        <div className="buttons d-flex flex-column gap-3">
                            <button className="btn btn-primary profile-buttons" onClick={handleEditProfile}>EDIT PROFILE</button>
                            <button className="btn btn-primary profile-buttons">DELETE PROFILE</button>
                            <button className="btn btn-primary profile-buttons">CHANGE PASSWORD</button>
                            <button className="btn btn-primary profile-buttons">BOOK APPPOINTMENT</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}


export default Profile;