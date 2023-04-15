import React, { useState } from 'react';
import './Contact.css';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        // Send email using emailjs or a similar service
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="main">
            <h1>Contact</h1>
            <form onSubmit={handleSubmit}>
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
    );
}

export default Contact;