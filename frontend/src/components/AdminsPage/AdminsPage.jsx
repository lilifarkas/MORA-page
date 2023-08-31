import React, {useEffect, useState} from "react";
import URL from '../../Constants/ConstantUrl';
import {NavLink, useNavigate} from "react-router-dom";
import bgImg from "../../images/Névtelen terv (25).png";
import './AdminsPage.css'
import {FiArrowLeft} from "react-icons/fi";
import AdminRegistrationModal from "./AdminRegistration";

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.email}</td>
        <td>{props.record.phone}</td>
        <td>{props.record.role}</td>
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

export default function RecordList() {
    const [isLoading, setIsLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        async function getRecords() {
            setIsLoading(true);

            const response = await fetch(`${URL}user`);

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
    
    async function arrangeUsers(e) {
        const response = await fetch(`${URL}user`);
        const records = await response.json();

        if(e === "---Arrange---") {
            setRecords(records)
        } else if( e === "By name") {
            const sortedByFirstName = records.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            setRecords(sortedByFirstName)
        }else if( e === "By email") {
            const sortedByLastName = records.sort((a,b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0))
            setRecords(sortedByLastName)
        }else if( e === "By role") {
            const sortedByMiddleName = records.sort((a,b) => (a.role > b.role) ? 1 : ((b.role > a.role) ? -1 : 0))
            setRecords(sortedByMiddleName)
        }
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

    const openFeedbackList = () => {
        navigate("/adminsPage/feedbacks");
    };
    
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
                                <button className="logout new-admin-button" onClick={() => setIsModalOpen(true)}>
                                    Register new Admin
                                </button>
                                <button className="logout new-admin-button" onClick={() => openFeedbackList}>
                                    Feedbacks
                                </button>
                                
                            </div>
                            <div className="title-container mt-3">
                                <h3 className="title-users">Users</h3>
                            </div>
                            <div className="filter">
                                <div>
                                    <select id = "arrange" 
                                            className="arrange-select"
                                            onChange={(e) => arrangeUsers(e.target.value)} >
                                        <option className="arrange-options"> Arrange </option>
                                        <option className="arrange-options"> By name </option>
                                        <option className="arrange-options"> By email </option>
                                        <option className="arrange-options"> By role </option>
                                    </select>
                                </div>
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Role</th>
                                    <th>Booked Appointments</th>
                                </tr>
                                </thead>
                                <tbody>{recordList()}</tbody>
                            </table>
                        </div>
                        {isModalOpen &&
                            <AdminRegistrationModal
                                isOpen={isModalOpen}
                                onRequestClose={() => setIsModalOpen(false)}
                            />
                        }
                    </>
                )}
            </div>
        </div>
    );
}