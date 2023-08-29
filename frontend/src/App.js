import './App.css';
import About from './components/About/About'
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header"
import Book from "./components/BookApointment/Book";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import LogIn from "./components/LogIn/LogIn"
import Register from "./components/Register/Register"
import Profile from "./components/Profile/Profile"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Edit from "./components/Profile/EditProfile/EditProfile"
import ChangePassword from "./components/Profile/EditProfile/ChangePassword"
import Calendar from "./components/Calendar/Calendar"
import FadeIn from "./components/Animation/FadeIn"
import CancelAppointment from "./components/Profile/CancelAppointment/CancelAppointment";
import AdminPage from './components/AdminsPage/AdminsPage'
import Feedbacks from './components/Feedbacks/Feedbacks'

function App() {

    return (
        <>
            <Router>
                    <Routes>
                        <Route path="/" element={[
                            <NavBar />,
                            <Header />,
                            <FadeIn>
                                <About />
                            </FadeIn>,
                            <Book />,
                            <Feedbacks />,
                            <Contact />,
                            <FadeIn>
                                <Footer />
                            </FadeIn>,
                        ]} />
                        <Route path="/login" element={[ <LogIn />]} />
                        <Route path="/register" element={[ <Register />]} />
                        <Route path="/profile" element={[ <Profile />]} />
                        <Route path="/edit" element={[ <Edit />]} />
                        <Route path="/change-password" element={[ <ChangePassword />]} />
                        <Route path="/cancel" element={[ <CancelAppointment />]} />
                        <Route path="/booking" element={[ <Calendar />]} />
                        <Route path="/adminsPage" element={[ <AdminPage />]} />
                    </Routes>
            </Router>
        </>
    );
}

export default App;
