import bgImg from "../../images/Névtelen terv (28).png";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import useFetchUser from '../../hooks/useFetchUser';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Calendar.css"
import Modal from "react-modal";
import URL from '../../Constants/ConstantUrl';
import useFetchDates from '../../hooks/UseFetchDates';


function CalendarToBook(){
    const user = useFetchUser();
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const greyDays = [1, 2, 0]; // Monday, Tuesday, Sunday
    const greenDays = [1, 2, 3, 4, 5]; // Wednesday, Thursday, Friday, Saturday
    const [clickedGreyDay, setClickedGreyDay] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHours, setSelectedHours] = useState([]);
    const [clickedHour, setClickedHour] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const[bookingForm, setBookingForm] = useState({
        "user": {
            "id": null,
            "name": `${user.name}`,
            "role": `${user.role}`,
            "email": `${user.email}`,
            "phone": `${user.phone}`,
            "password": `${user.password}`,
            "bookedDates": user.bookedDates
        },
        "date": new Date().toISOString(),
        "bookedTime": ""
    })
    const dates = useFetchDates();
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        const datesArray = Object.values(dates);
        const bookedDates = datesArray.map(item => item.bookedTime);
        setBookedDates(bookedDates);
    }, [dates]);

    function getTileClassName({ date, view }) {
        const today = new Date();
        const differenceInDays = Math.floor((date - today) / (1000 * 60 * 60 * 24));
        console.log(bookedDates)
        if (date.getDay() === 0 || date.getDay() === 6) {
            return 'grey-day';
        } else if (differenceInDays < 0) {
            return 'grey-day';
        } else {
            return 'green-day';
        }
        
    }

    function handleDateChange(date) {
        setDate(date);
    }

    function handleDayClick(date) {
        const today = new Date();
        const differenceInDays = Math.floor((date - today) / (1000 * 60 * 60 * 24));
        
        if (date.getDay() === 0 || date.getDay() === 6 || differenceInDays < 0) {
            console.log("Clicked on a grey day");
            setClickedGreyDay(true);
            setSelectedDate(null);
        } else {
            console.log("Clicked on a green day");
            setClickedGreyDay(false);
            setSelectedDate(date);
            setSelectedHours([]);
            setClickedHour(null);
        }
    }

    function handleHourClick(hour) {
        if (selectedHours.includes(hour)) {
            setSelectedHours(selectedHours.filter((h) => h !== hour));
        } else {
            if (selectedHours.length < 1) {
                setSelectedHours([...selectedHours, hour]);
                
            } else {
                setSelectedHours([hour]);
                
            }
        }
        setClickedHour(hour);
        
    }

    const handleCancel = () => {
        setShowModal(false);
    }
    
    const bookAnAppointment = async (e) => {
        e.preventDefault();

        const bookedTime = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            parseInt(selectedHours[0].split(":")[0]),
            0,
            0
        );

        const updatedBookingForm = {
            "user": {
                ...bookingForm.user,
                id: user.id,
            },
            "date": new Date().toISOString(),
            "bookedTime": bookedTime.toISOString()
        };
        console.log(user.id)
        console.log(bookedTime)
        const response = await fetch(`${URL}dates/registerDate`, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBookingForm),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            // const errorMessage = errorResponse.errorMessages[0];
            alert(errorResponse)
            console.log(errorResponse);
            return
        }

        setBookingForm({
            "user": user,
            "date": new Date().toISOString(),
            "bookedTime": ""
        });

        if(response.ok) {
            navigate("/profile");
        }

        setShowModal(false);
    }

    return (
            <div className="main4">
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
                                <div className="message mt-5">
                                    <h2 className="text-white">Sorry, this day is unavailable!</h2>
                                </div>
                            )}
                            <div className="hours-container mt-5 mb-5">
                                {selectedDate && greenDays.includes(selectedDate.getDay()) && (
                                    <>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <AvailableHours
                                                date={selectedDate}
                                                handleHourClick={handleHourClick}
                                                selectedHours={selectedHours}
                                                bookedDates={bookedDates}/>
                                            <div className="mt-5">
                                                <button
                                                    className="btn btn-primary profile-buttons"
                                                    onClick={() => setShowModal(true)}
                                                    disabled={!selectedHours || selectedHours.length === 0}>
                                                    BOOK</button>
                                            </div>
                                            <Modal
                                                isOpen={showModal}
                                                onRequestClose={() => setShowModal(false)}
                                                contentLabel="Booking an appointment Modal"
                                                className="modal"
                                            >
                                                <h2 className="titles">Are you sure you want to book this appointment? {selectedDate.toDateString()}, {selectedHours}</h2>
                                                <div className="d-flex flex-row gap-5 mt-3">
                                                    <button className="btn btn-primary" onClick={bookAnAppointment}>YES</button>
                                                    <button className="btn btn-primary" onClick={handleCancel}>NO</button>
                                                </div>
                                            </Modal>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                    
                </div>
            </div>
    );
}

function AvailableHours({ date, handleHourClick, selectedHours, bookedDates }) {
    const hours = [
        { startTime: "08:00", endTime: "10:00" },
        { startTime: "10:00", endTime: "12:00" },
        { startTime: "12:00", endTime: "14:00" },
        { startTime: "14:00", endTime: "16:00" },
        { startTime: "16:00", endTime: "18:00" },
        { startTime: "18:00", endTime: "20:00" },
    ];

    const isHourSelected = (hour) => selectedHours.includes(hour);

    const isHourBooked = (hour) => {
        const startTime = hour.split(" - ")[0]; // Get the starting hour from the slot
        const selectedDateTime = new Date(date);
        selectedDateTime.setHours(parseInt(startTime.split(":")[0]), 0, 0, 0);

        // Check if any booked date matches the selected date and start time
        return bookedDates.some((bookedTime) => {
            const bookedDateTime = new Date(bookedTime);
            return (
                bookedDateTime.toDateString() === selectedDateTime.toDateString() &&
                bookedDateTime.getHours() === selectedDateTime.getHours()
            );
        });
    };

    const handleClick = (hour) => {
        if (!isHourBooked(hour)) {
            handleHourClick(hour);
        }
    };

    return (
        <div>
            <h2 className="text-white">Available hours for {date.toDateString()}</h2>
            <div className="hours-container">
                {hours.map(({ startTime, endTime }) => {
                    const hour = `${startTime} - ${endTime}`;
                    const isSelected = isHourSelected(hour);
                    const isDisabled = isHourBooked(hour);
                    const classNames = isSelected
                        ? "hour-slot selected"
                        : isDisabled
                            ? "hour-slot disabled"
                            : "hour-slot";

                    return (
                        <div
                            key={hour}
                            onClick={() => handleClick(hour)}
                            className={classNames}
                        >
                            {hour}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export default CalendarToBook;