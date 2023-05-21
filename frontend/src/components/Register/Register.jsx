import React, {useEffect, useState} from 'react';
import './Register.css';
import bgImg from "./Névtelen terv (25).png";

function Register() {
    const[registerForm, setRegisterForm] = useState({
        "name": "",
        "email": "",
        "phoneNumber": "",
        "password": "",
        "confirmPassword": ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/',{
            method: 'POST',
            // headers: {
            //     'Authorization' : `Bearer ${localStorage.getItem("token")}`,
            //     'Content-Type': 'application/json'
            // },
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
            "firstName": '',
            "lastName": '',
            "email": '',
            "username": '',
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
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nameInput"
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
                                id="emailInput"
                                placeholder="Enter your email"
                                style={{textAlign: 'center'}}
                                value={registerForm.email}
                                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Phone Number</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                placeholder="Enter your phone number"
                                style={{textAlign: 'center'}}
                                value={registerForm.phoneNumber}
                                onChange={(e) => setRegisterForm({...registerForm, phoneNumber: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Password</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                placeholder="Enter the password"
                                style={{textAlign: 'center'}}
                                value={registerForm.password}
                                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Password again</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
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