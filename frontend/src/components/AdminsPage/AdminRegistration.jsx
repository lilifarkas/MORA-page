import React, { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import './AdminRegistration.css'

const AdminRegistrationModal = ({ isOpen, onRequestClose }) => {
    const [formData, setFormData] = useState({
        "name": "",
        "email": "",
        "phoneNumber": "",
        "password": "",
        "confirmPassword": ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="admin-main-container">
                <button type="button" onClick={onRequestClose}>
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
                            placeholder="Enter your name"
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
                            placeholder="Enter your email"
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
                            placeholder="Enter your phone number"
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
                            placeholder="Enter the password"
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
                            placeholder="Enter the password again"
                            style={{textAlign: 'center'}}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-primary mt-4" disabled={!formData.confirmPassword}>
                            Register Admin
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AdminRegistrationModal;