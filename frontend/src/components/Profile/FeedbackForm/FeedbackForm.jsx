import React, { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import '../../AdminsPage/AdminRegistration.css'
import URL from "../../../Constants/ConstantUrl";
import {useNavigate} from "react-router-dom";
import './FeedbackForm.css'

const FeedbackRegistrationModal = ({ isOpen, onRequestClose, user }) => {
    const [formData, setFormData] = useState({
        "userId": user.id,
        "comment": "",
        "rating": ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${URL}feedbacks/registerFeedback`,{
            method: 'POST',
            headers: {
                // 'Authorization' : `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            // const errorMessage = errorResponse.errorMessages[0];
            alert(errorResponse)
            console.log(errorResponse);
            return
        }

        setFormData({
            "userId": user.id,
            "comment": "",
            "rating": ""
        });

        if(response.ok) {
            alert("Thank you for your feedback!")
            navigate('/profile');
        }
        setTimeout(() => {

        }, 1000);

        onRequestClose();
        window.location.reload();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="modal-overlay"
            appElement={document.getElementById('root') || undefined}
        >
            <div className="admin-main-container">
                <button type="button" onClick={onRequestClose} className="align-self-start">
                    <FiX />
                </button>
                <h2 className="register-admin-title">Feedback</h2>
                <form onSubmit={handleSubmit} className="form-admin">
                    <div className="form-group-admin">
                        <label htmlFor="nameInput">Leave a feedback</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your feedback"
                            style={{textAlign: 'center'}}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, comment: e.target.value})}
                        />
                    </div>
                    <div className="form-group-admin">
                        <label htmlFor="emailInput">Rate our service</label>
                        <div className="rating-scale">
                            {Array.from({ length: 10 }, (_, index) => (
                                <label key={index} className={`rating-label ${formData.rating === (index + 1).toString() ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={index + 1}
                                        checked={formData.rating === (index + 1).toString()}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                    />
                                    {index + 1}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="mt-4 register-admin-button d-flex justify-content-center align-items-center" disabled={!formData.comment}>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default FeedbackRegistrationModal;