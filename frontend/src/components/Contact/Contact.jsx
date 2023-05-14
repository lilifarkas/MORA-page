import React, {useEffect, useState} from 'react';
import './Contact.css';
import bgImg from "./Névtelen terv (20).png";
import emailjs from 'emailjs-com';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        let timer;
        if (success) {
            timer = setTimeout(() => {
                setSuccess('');
            }, 10000);
        }
        return () => clearTimeout(timer);
    }, [success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError('Please fill all input fields');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
        } else {
            console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            // Send email
            emailjs.send(
                'service_m8bql7c',
                'template_gf5b8yl',
                { from_name: name, from_email: email, message: message },
                '_OPM3OGf4upRH17EZ'
            )
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setError('');
                    setSuccess('Thank you for your message! We will contact you as soon as possible!');
                }, function(error) {
                    console.log('FAILED...', error);
                    setError('Failed to send email. Please try again later.');
                });
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
                        {success && <div className="success" style={{color: '#ffffff'}}>{success}</div>}
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