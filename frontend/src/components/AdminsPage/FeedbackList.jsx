import React, {useEffect, useState} from "react";
import URL from '../../Constants/ConstantUrl';
import {NavLink, useNavigate} from "react-router-dom";
import bgImg from "../../images/Névtelen terv (25).png";
import './AdminsPage.css'
import {FiArrowLeft} from "react-icons/fi";
import './FeedbackList.css'

const Record = (props) => {
    const [isApproved, setIsApproved] = useState(props.record.isApproved);

    const toggleApproval = async () => {
        try {
            const response = await fetch(`${URL}update/${props.record.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isApproved: !isApproved, 
                }),
            });

            if (response.ok) {
                setIsApproved(!isApproved);
                window.location.reload();
            } else {
                const errorMessage = await response.text();
                console.error(errorMessage);
            }
        } catch (error) {
            console.error("Error updating approval:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <tr>
            <td>{props.record.userId}</td>
            <td style={{width: props.dateWidth}}>{formatDate(props.record.date)}</td>
            <td>{props.record.rating}</td>
            <td style={{width: props.feedbackWidth}}>{props.record.comment}</td>
            <td>{props.record.isApproved.toString()}</td>
            <td>
                <label className="approval-toggle">
                    <input
                        type="checkbox"
                        checked={isApproved}
                        onChange={toggleApproval}
                    />
                    Approved
                </label>
            </td>
        </tr>
    )
};

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

        
    }, []);


    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    key={record._id}
                    feedbackWidth="70%"
                    dateWidth="20%"
                />
            );
        });
    }

    async function filterUserId(e) {
        const response = await fetch(`${URL}feedbacks`);
        const records = await response.json();

        const filtered = records.filter(record =>
            record.userId.toString().includes(e)
        );
        setRecords(filtered)
    }

    async function filterDate(e) {
        const response = await fetch(`${URL}feedbacks`);
        const records = await response.json();

        const filtered = records.filter(record =>
            record.date.includes(e)
        );
        setRecords(filtered)
    }

    async function filterRating(e) {
        const response = await fetch(`${URL}feedbacks`);
        const records = await response.json();

        if (e.trim() === '') {
            setRecords(records)
            return;
        }
        
        const filtered = records.filter(record =>
            record.rating === parseInt(e)
        );
        setRecords(filtered)
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
                                    to="/adminsPage"
                                    className="back"
                                >
                                    <button className="logout">
                                        <FiArrowLeft />
                                    </button>
                                </NavLink>
                            </div>
                            <div className="title-container-feedback">
                                <h3 className="title-users">Feedbacks</h3>
                            </div>
                            <div className="filter">
                                <div>
                                    <input id="filterUserId" type="text" className="inputs-admin"
                                           placeholder="Filter by user ID" onChange={(e) => filterUserId(e.target.value)}></input>
                                </div>
                                <div>
                                    <input id="filterDate" type="text" className="inputs-admin"
                                           placeholder="Filter by date" onChange={(e) => filterDate(e.target.value)}></input>
                                </div>
                                <div>
                                    <input id="filterRating" type="text" className="inputs-admin"
                                           placeholder="Filter by rating" onChange={(e) => filterRating(e.target.value)}></input>
                                </div>
                            </div>
                        </div>
                        <div className="table-container-feedback">
                            <table className="table" style={{ marginTop: 40 }}>
                                <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th style={{ width: '20%' }}>Date</th>
                                    <th>Rating</th>
                                    <th style={{ width: '70%' }}>Feedback</th>
                                    <th>Is approved</th>
                                    <th>Change approval</th>
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