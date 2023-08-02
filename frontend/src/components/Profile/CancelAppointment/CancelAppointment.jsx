import React, {useCallback, useEffect, useState} from "react";
import bgImg from "../../../images/Névtelen terv (28).png";
import {NavLink} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import useFetchUser from "../../../hooks/useFetchUser";
import useFetchDates from '../../../hooks/UseFetchDates';
import './CancelAppointment.css'
import Modal from "react-modal";
import URL from "../../../Constants/ConstantUrl";

function CancelAppointment( ) {
    const [showModal, setShowModal] = useState(false);
    const [refetch, setRefetch] = useState(false); 
    const { user, loading, error, refetchUser } = useFetchUser(refetch);
    const dates = useFetchDates();
    const [selectedBookingDate, setSelectedBookingDate] = useState(null);
    
    const handleDeleteBooking = async () => {
        const foundBooking = dates.find(booking => booking.bookedTime === selectedBookingDate);
        
        if (selectedBookingDate) {
            const response = await fetch(`${URL}dates/delete/${foundBooking.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                alert(errorResponse)
                console.log(errorResponse);
                return
            }

            setRefetch(true);
            alert("Cancelled successfully!");
            setShowModal(false);
        }
    }

    const handleCancel = () => {
        setShowModal(false);
        console.log(selectedBookingDate)
    }

    return (
        <div className="main1" id="contact">
            <div className="main2">
                <img src={bgImg} alt="doctor" />
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <NavLink
                        to="/profile"
                        className="back"
                    >
                        <FiArrowLeft className="back-icon" />
                        Back
                    </NavLink>
                    <h1>Cancel Appointment</h1>
                    <div>
                        {user && <>
                            <div className="d-flex flex-column align-items-center">
                                <div>
                                    <h1>Booked dates:</h1>
                                </div>
                                <div>
                                    <ul className="no-bullets d-flex flex-column gap-3">
                                        {user.bookedDates.map((booking, index) => (
                                            <li key={index} className="text-white">
                                                {new Date(booking.bookedTime).toLocaleDateString()}{' '}
                                                {new Date(booking.bookedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                <button
                                                    onClick={() => {
                                                        setSelectedBookingDate(booking.bookedTime);
                                                        setShowModal(true);
                                                    }}
                                                    className="btn btn-cancel">
                                                    Cancel
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Modal
                                    isOpen={showModal}
                                    onRequestClose={() => setShowModal(false)}
                                    contentLabel="Cancel an appointment Modal"
                                    className="modal"
                                    appElement={document.getElementById('root') || undefined}
                                    style={{overlay: {zIndex: 3}}}
                                >
                                    <h2 className="titles">Are you sure you want to cancel the appointment on {new Date(selectedBookingDate).toLocaleDateString()}?</h2>
                                    <div className="d-flex flex-row gap-5 mt-3">
                                        <button className="btn btn-primary" onClick={handleDeleteBooking}>YES</button>
                                        <button className="btn btn-primary" onClick={handleCancel}>NO</button>
                                    </div>
                                </Modal>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CancelAppointment;