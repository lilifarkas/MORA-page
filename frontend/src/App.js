import './App.css';
import About from './components/About/About'
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header"
import Book from "./components/BookApointment/Book";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
      <div className='App'>
          < NavBar />
          < Header />
          < About />
          < Book />
          < Contact />
          < Footer />
      </div>
  );
}

export default App;
