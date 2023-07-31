import React, {useEffect, useState} from 'react';
import bgImg from "../../images/Névtelen terv (25).png";
import {NavLink, useNavigate} from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import URL from '../../Constants/ConstantUrl';

function LogIn() {
    const[LogInForm, setLogInForm] = useState({
        "username": "",
        "password": ""
    })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${URL}login`,{
            method: 'POST',
            headers: {
                // 'Authorization' : `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(LogInForm)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.errorMessages[0];
            alert(errorMessage)
            console.log(errorMessage);
            return;
        }

        setLogInForm({
            "username": '',
            "password": ''
        });

        if(response.ok){
            alert("User logged in")
            navigate("/")
        } 
        setTimeout(() => {

        }, 1000);
    };

    return (
        <div className="main1" id="contact">
            <div className="main2">
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
                    <h1>Log in</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                                style={{textAlign: 'center'}}
                                value={LogInForm.username}
                                onChange={(e) => setLogInForm({...LogInForm, username: e.target.value})}
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
                                value={LogInForm.password}
                                onChange={(e) => setLogInForm({...LogInForm, password: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Log in
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default LogIn;