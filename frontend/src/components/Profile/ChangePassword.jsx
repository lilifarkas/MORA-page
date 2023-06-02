import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import useFetchUser from "../../hooks/useFetchUser";
import {FiArrowLeft} from "react-icons/fi";
import bgImg from "../../images/Névtelen terv (28).png";

function ChangePass( ) {
    const fetchUser = useFetchUser();
    const [user, setUser] = useState("");
    const [change, setChange] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = fetchUser;
                setUser(userData);
            } catch (error) {
                // Handle error scenarios
            }
        };

        fetchData();
    }, [fetchUser]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setChange(true);
        await fetch(`https://localhost:7230/users/update/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        console.log(user);

        console.log(change);
    };

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
                    <h1>Change Password</h1>
                    {change && <>
                        <div>Profile updated!</div>
                    </>}
                    {!change && <>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="titles mt-2">Password: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="old-password"
                                    onChange={(e) => setUser({...user, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="titles mt-2">New password: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="new-password"
                                    onChange={(e) => setUser({...user, password: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="titles mt-2">New password again: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="new-password-again"
                                    onChange={(e) => setUser({...user, phone: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save 
                            </button>
                        </form>
                    </>}
                </div>
            </div>
        </div>

    );
}

export default ChangePass;