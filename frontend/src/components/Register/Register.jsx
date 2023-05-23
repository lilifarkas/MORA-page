import React, {useEffect, useState} from 'react';
import './Register.css';
import bgImg from "./Névtelen terv (25).png";
import {NavLink} from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';

function Register() {
    const[registerForm, setRegisterForm] = useState({
        "name": "",
        "role": "",
        "email": "",
        "phoneNumber": "",
        "password": "",
        "confirmPassword": ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('https://localhost:7230/register',{
            method: 'POST',
            headers: {
                // 'Authorization' : `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerForm)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            // const errorMessage = errorResponse.errorMessages[0];
            alert(errorResponse)
            console.log(errorResponse);
            return
        }

        setRegisterForm({
            "name": '',
            "role": '',
            "email": '',
            "phoneNumber": '',
            "password": '',
            "confirmPassword": ''
        });

        if(response.ok) alert("User Successfully Registered")
        setTimeout(() => {

        }, 1000);
    };

    return (
        <div className="main1" id="contact">
            <div className="hero2">
                <img src={bgImg} alt="doctor" />
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <NavLink
                        to="/"
                        className="back"
                    >
                        <FiArrowLeft className="back-icon" />
                        Back
                    </NavLink>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                                style={{textAlign: 'center'}}
                                value={registerForm.name}
                                onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                style={{textAlign: 'center'}}
                                value={registerForm.email}
                                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                style={{textAlign: 'center'}}
                                value={registerForm.phoneNumber}
                                onChange={(e) => setRegisterForm({...registerForm, phoneNumber: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                placeholder="Enter the password"
                                style={{textAlign: 'center'}}
                                value={registerForm.password}
                                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Password again</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Enter the password again"
                                style={{textAlign: 'center'}}
                                value={registerForm.confirmPassword}
                                onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Register;