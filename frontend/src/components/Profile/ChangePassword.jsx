import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import useFetchUser from "../../hooks/useFetchUser";
import {FiArrowLeft} from "react-icons/fi";
import bgImg from "../../images/Névtelen terv (28).png";
import URL from '../../Constants/ConstantUrl';

function ChangePass( ) {
    const fetchUser = useFetchUser();
    const [user, setUser] = useState("");
    const [change, setChange] = useState(false);
    const[changePassForm, setChangePassForm] = useState({
        "password": "",
        "newPassword": ""
    })
    const [isMatching, setIsMatching] = useState(true);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const navigate = useNavigate();
    const [failedOldPass, setFailedOldPass] = useState(false);

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
        
        const result = await fetch(`${URL}change-pass/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(changePassForm),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (!result.ok) {
            const errorResponse = await result.json();
            setFailedOldPass(true);
            console.log(failedOldPass)
            return;
        }

        if(result.ok){
            const response = await fetch(`${URL}logout`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.errorMessages[0];
                alert(errorMessage);
                console.log(errorMessage);
                return;
            }

            if(response.ok){
                navigate("/login");
            }
            setTimeout(() => {

            }, 1000);
        }
        setTimeout(() => {

        }, 1000);
    };
    
    const checkNewPass = (e) => {
        if(e !== changePassForm.newPassword){
            setIsMatching(false);
        } else {
            setIsMatching(true);
        }
    }

    const handleInputChange = (inputName, inputValue) => {
        setChangePassForm((prevState) => ({
            ...prevState,
            [inputName]: inputValue,
        }));

        setIsFormFilled(
            Object.values(changePassForm).every((value) => value.trim() !== '')
        );
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
                    <h5 className="text-white">After changing your password, you have to log in!</h5> 
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
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="titles mt-2">New password: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="new-password"
                                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="titles mt-2">New password again: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="new-password-again"
                                    onChange={(e) => checkNewPass(e.target.value)}
                                />
                            </div>
                            {!isMatching && <>
                                <p className="text-danger">Match the new password!</p>
                            </>}
                            {failedOldPass && <>
                                <p className="text-danger">Wrong password!</p>
                            </>}
                            <button type="submit" className="btn btn-primary" disabled={!isMatching|| !isFormFilled}>
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