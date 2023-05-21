import './App.css';
import About from './components/About/About'
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header"
import Book from "./components/BookApointment/Book";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import LogIn from "./components/LogIn/LogIn"
import Register from "./components/Register/Register"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={[<NavBar/>, <Header />, <About/>, <Book/>, <Contact/>, <Footer/>]} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
