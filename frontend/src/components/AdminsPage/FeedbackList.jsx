import React, {useEffect, useState} from "react";
import URL from '../../Constants/ConstantUrl';
import {NavLink, useNavigate} from "react-router-dom";
import bgImg from "../../images/Névtelen terv (25).png";
import './AdminsPage.css'
import {FiArrowLeft} from "react-icons/fi";

const Record = (props) => (
    <tr>
        <td>{props.record.userId}</td>
        <td>{props.record.date}</td>
        <td>{props.record.rating}</td>
        <td>{props.record.comment}</td>
        <td>
            {props.record.bookedDates.map((appointments) => {
                const bookedTime = appointments.bookedTime;
                const date = new Date(bookedTime);
                const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} : ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

                return (
                    <div key={appointments.id}>{formattedDate}</div>
                );
            })}
        </td>
    </tr>
);

export default function FeedbackList() {
    const [isLoading, setIsLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getRecords() {
            setIsLoading(true);

            const response = await fetch(`${URL}feedbacks`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                setIsLoading(false);
                return;
            }

            const records = await response.json();
            setRecords(records);
            console.log(records)
            setIsLoading(false);
        }

        getRecords();

        return;
    }, []);


    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    key={record._id}
                />
            );
        });
    }

    async function filterName(e) {
        const response = await fetch(`${URL}user`);
        const records = await response.json();

        let filtered = []
        records.map(record => {
            if((record.name.toLowerCase()).includes(e.toLowerCase())){
                filtered.push(record)
            }
        })
        setRecords(filtered)
    }

    async function filterEmail(e) {
        const response = await fetch(`${URL}user`);
        const records = await response.json();

        let filtered = []
        records.map(record => {
            if((record.email.toLowerCase()).includes(e.toLowerCase())){
                filtered.push(record)
            }
        })
        setRecords(filtered)
    }

    async function filterPhone(e) {
        const response = await fetch(`${URL}user`);
        const records = await response.json();

        let filtered = []
        records.map(record => {
            if((record.phone.toLowerCase()).includes(e.toLowerCase())){
                filtered.push(record)
            }
        })
        setRecords(filtered)
    }

    async function openFeedbackList() {

    }

    return (
        <div className="main2">
            <img src={bgImg} alt="doctor" />
            <div className="hero-overlay"></div>
            <div className="hero-text">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className="">
                            <div className="d-flex flex-row">
                                <NavLink
                                    to="/"
                                    className="back"
                                >
                                    <button className="logout">
                                        <FiArrowLeft />
                                    </button>
                                </NavLink>
                            </div>
                            <div className="title-container">
                                <h3 className="title-users">Feedbacks</h3>
                            </div>
                            <div className="filter">
                                <div>
                                    <input id="filterName" type="text" className="inputs-admin"
                                           placeholder="Filter by name" onChange={(e) => filterName(e.target.value)}></input>
                                </div>
                                <div>
                                    <input id="filterEmail" type="text" className="inputs-admin"
                                           placeholder="Filter by email" onChange={(e) => filterEmail(e.target.value)}></input>
                                </div>
                                <div>
                                    <input id="filterPhone" type="text" className="inputs-admin"
                                           placeholder="Filter by phone number" onChange={(e) => filterPhone(e.target.value)}></input>
                                </div>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="table" style={{ marginTop: 40 }}>
                                <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Date</th>
                                    <th>Rating</th>
                                    <th>Feedback</th>
                                    <th>Approval</th>
                                </tr>
                                </thead>
                                <tbody>{recordList()}</tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}