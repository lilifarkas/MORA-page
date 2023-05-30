import './Profile.css'
import bgImg from "../Register/Névtelen terv (25).png";
import React from "react";


function Profile(){
    

    return (
        <div className="main2">
            <img src={bgImg} alt="doctor" />
            <div className="hero-overlay"></div>
            <div className="hero-text">
                <div>

                </div>
                <div className="buttons d-flex flex-row gap-3">
                    <button className="btn btn-primary">EDIT</button>
                    <button className="btn btn-primary">DELETE</button>
                    <button className="btn btn-primary">BOOK APPPOINTMENT</button>
                </div>
            </div>
        </div>
    );
}


export default Profile;