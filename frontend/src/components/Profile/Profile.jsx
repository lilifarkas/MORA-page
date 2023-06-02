import './Profile.css'
import bgImg from "../../images/Névtelen terv (28).png";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import useFetchUser from '../../hooks/useFetchUser';
import Modal from 'react-modal';

function Profile(){
    const user = useFetchUser();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    
    const handleEditProfile = async (e) => {
        e.preventDefault();
        navigate("/edit");
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        navigate("/change-password");
    };

    const deleteUser = async (e) => {
        e.preventDefault();
        await fetch(`https://localhost:7230/users/delete/${user.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'

        });
        
        setShowModal(false);
        navigate("/");
    }

    const handleCancel = () => {
        setShowModal(false);
    }


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
                    <h1>Profile</h1>
                    <div className="d-flex flex-row main3 justify-content-center align-items-center gap-5">
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
                            <button className="btn btn-primary profile-buttons" onClick={() => setShowModal(true)}>DELETE PROFILE</button>
                            <button className="btn btn-primary profile-buttons" onClick={handleChangePassword}>CHANGE PASSWORD</button>
                            <button className="btn btn-primary profile-buttons">BOOK APPPOINTMENT</button>
                        </div>
                    </div>

                    <Modal
                        isOpen={showModal}
                        onRequestClose={() => setShowModal(false)}
                        contentLabel="Delete Profile Modal"
                        className="modalDelete"
                    >
                        <h2 className="titles">Are you sure you want to delete your profile?</h2>
                        <div className="d-flex flex-row gap-5 mt-3">
                            <button className="btn btn-primary" onClick={deleteUser}>YES</button>
                            <button className="btn btn-primary" onClick={handleCancel}>NO</button>
                        </div>
                    </Modal>
                    
                </div>
            </div>
        </div>
    );
}


export default Profile;