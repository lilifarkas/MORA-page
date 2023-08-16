import './Profile.css'
import bgImg from "../../images/Névtelen terv (28).png";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import useFetchUser from '../../hooks/useFetchUser';
import Modal from 'react-modal';
import URL from '../../Constants/ConstantUrl';

function Profile(){
    const { user, loading } = useFetchUser();
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
        await fetch(`${URL}users/delete/${user.id}`, {
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

    if (loading) {
        return <div>Loading...</div>;
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
                            <button className="logout">
                                <FiArrowLeft />
                            </button>
                        </NavLink>
                    </div>
                    <h1 className="mt-2">Profile</h1>
                    <div className="d-flex flex-row main3 justify-content-center gap-5 mt-1">
                        <div>
                            {user && <>
                                <h1>Name: {user.name}</h1>
                                <h1>Email: {user.email}</h1>
                                <h1>Phone Number: {user.phone}</h1>
                                <h1>Booked dates: </h1>
                                <ul className="no-bullets">
                                    {user.bookedDates.map((booking, index) => (
                                        <li key={index} className="text-white">
                                            {new Date(booking.bookedTime).toLocaleDateString()}{' '}
                                            {new Date(booking.bookedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </li>
                                    ))}
                                </ul>
                            </>}
                        </div>
                        <div className="buttons d-flex flex-column gap-3">
                            <button className="btn btn-primary profile-buttons" onClick={handleEditProfile}>EDIT PROFILE</button>
                            <button className="btn btn-primary profile-buttons" onClick={() => setShowModal(true)}>DELETE PROFILE</button>
                            <button className="btn btn-primary profile-buttons" onClick={handleChangePassword}>CHANGE PASSWORD</button>
                            <a href="/booking" className="btn btn-primary profile-buttons">
                                BOOK APPOINTMENT
                            </a>
                            <a
                                href={user.bookedDates.length > 0 ? "/cancel" : "#"}
                                className={`btn btn-primary profile-buttons ${user.bookedDates.length === 0 ? 'disabled-cancel' : ''}`}
                            >
                                CANCEL APPOINTMENT
                            </a>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Delete Profile Modal"
                className="modal-profile"
                appElement={document.getElementById('root') || undefined}
                style={{overlay: {zIndex: 3}}}
            >
                <h2 className="titles">Are you sure you want to delete your profile?</h2>
                <div className="d-flex flex-row gap-5 mt-3">
                    <button className="btn btn-primary" onClick={deleteUser}>YES</button>
                    <button className="btn btn-primary" onClick={handleCancel}>NO</button>
                </div>
            </Modal>

        </div>
    );
}


export default Profile;