import React, { useState } from 'react';
import './Contact.css';
import bgImg from "./Névtelen terv (20).png";

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError('Please fill all input fields');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
        } else {
            console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            // Send email using emailjs or a similar service
            setName('');
            setEmail('');
            setMessage('');
            setError('');
        }
    };

    return (
        <div className="main1" id="contact">
            <div className="hero2">
                <img src={bgImg} alt="doctor" />
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <h1>Contact us</h1>
                    <form onSubmit={handleSubmit}>
                        {error && <p className="error" style={{color: '#d70b0b'}}>{error}</p>}
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nameInput"
                                placeholder="Enter your name"
                                style={{textAlign: 'center'}}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="messageInput">Message</label>
                            <textarea
                                className="form-control"
                                id="messageInput"
                                rows="5"
                                placeholder="Enter your message"
                                style={{textAlign: 'center'}}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
    );
}

export default Contact;