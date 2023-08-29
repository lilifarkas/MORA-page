import React, { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import './AdminRegistration.css'
import URL from "../../Constants/ConstantUrl";
import {useNavigate} from "react-router-dom";

const AdminRegistrationModal = ({ isOpen, onRequestClose }) => {
    const [formData, setFormData] = useState({
        "name": "",
        "email": "",
        "phoneNumber": "",
        "password": "",
        "confirmPassword": ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${URL}register-admin`,{
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
            "name": '',
            "email": '',
            "phoneNumber": '',
            "password": '',
            "confirmPassword": ''
        });

        if(response.ok) {
            alert("Admin Successfully Registered")
            navigate('/adminsPage');
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
                <h2 className="register-admin-title">Register New Admin</h2>
                <form onSubmit={handleSubmit} className="form-admin">
                    <div className="form-group-admin">
                        <label htmlFor="nameInput">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter name"
                            style={{textAlign: 'center'}}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="form-group-admin">
                        <label htmlFor="emailInput">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            style={{textAlign: 'center'}}
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="form-group-admin">
                        <label htmlFor="emailInput">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter phone number"
                            style={{textAlign: 'center'}}
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        />
                    </div>
                    <div className="form-group-admin">
                        <label htmlFor="emailInput">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            placeholder="Enter password"
                            style={{textAlign: 'center'}}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <div className="form-group-admin">
                        <label htmlFor="emailInput">Password again</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Enter password again"
                            style={{textAlign: 'center'}}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="mt-4 register-admin-button d-flex justify-content-center align-items-center" disabled={!formData.confirmPassword}>
                            Register Admin
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AdminRegistrationModal;