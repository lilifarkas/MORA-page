import bgImg from "../../images/Névtelen terv (28).png";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import useFetchUser from '../../hooks/useFetchUser';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function CalendarToBook(){
    const user = useFetchUser();
    const [date, setDate] = useState(new Date());
    const greyDays = [1, 2, 0]; // Monday, Tuesday, Sunday
    const greenDays = [3, 4, 5, 6]; // Wednesday, Thursday, Friday, Saturday
    const [clickedGreyDay, setClickedGreyDay] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    function getTileClassName({ date, view }) {
        const today = new Date();
        if (date < today || date.getDay() === 0) {
            return 'grey-day';
        } else if (greenDays.includes(date.getDay())) {
            return 'green-day';
        }
    }

    function handleDateChange(date) {
        setDate(date);
    }

    function handleDayClick(date) {
        if (date < new Date() || date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 2) {
            console.log('Clicked on a grey day');
            setClickedGreyDay(true);
            setSelectedDate(null);
        } else {
            console.log('Clicked on a green day');
            setClickedGreyDay(false);
            setSelectedDate(date);
        }
    }

    return (
        <div className="main3">
            <div className="main2">
                <img src={bgImg} alt="doctor" />
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <div className="back-button">
                        <NavLink
                            to="/"
                            className="back"
                        >
                            <FiArrowLeft className="back-icon" />
                            Back
                        </NavLink>
                    </div>
                    <h1>Book appointment</h1>
                    {!user && (
                        <>
                            <div className="d-flex flex-column justify-content-center align-items-center gap-5">
                                <div>
                                    <h3 className="text-white">To book an appointment please Sign in or Sign up!</h3>
                                </div>
                                <div className="d-flex flex-row gap-5 justify-content-center">
                                    <NavLink className="button-text" to="/register">
                                        <button className="btn btn-primary">
                                            SIGN UP
                                        </button>
                                    </NavLink>
                                    <NavLink className="button-text" to="/login">
                                        <button className="btn btn-primary">
                                            SIGN IN
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </>
                    )}

                    {user && (
                        <>
                            <div className="d-flex justify-content-center">
                                <Calendar
                                    value={selectedDate || new Date()}
                                    onChange={handleDateChange}
                                    onClickDay={handleDayClick}
                                    tileClassName={getTileClassName}
                                />
                            </div>
                            {clickedGreyDay && (
                                <div className="message">
                                    <h2>This day is unavailable!</h2>
                                </div>
                            )}
                            <div className="hours-container">
                                {selectedDate && greenDays.includes(selectedDate.getDay()) && (
                                    <AvailableHours date={selectedDate} />
                                )}
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

function AvailableHours({ date }) {
    const hours = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
    ];

    return (
        <div>
            <h2>Available hours for {date.toDateString()}</h2>
            <ul>
                {hours.map((hour) => (
                    <li key={hour}>{hour}</li>
                ))}
            </ul>
        </div>
    );
}


export default CalendarToBook;