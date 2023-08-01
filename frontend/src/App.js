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
import Edit from "./components/Profile/EditProfile"
import ChangePassword from "./components/Profile/ChangePassword"
import Calendar from "./components/Calendar/Calendar"
import FadeIn from "./components/Animation/FadeIn"

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
                        <Route path="/booking" element={[ <Calendar />]} />
                    </Routes>
            </Router>
        </>
    );
}

export default App;
