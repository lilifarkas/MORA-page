import './About.css'
import bgImg from './Névtelen terv (22).png';
import doctorImg from './Névtelen terv (17).png';
import missionImg from './Névtelen terv (24).png';

function MainPage(){
    
    
    return(
        <div className="about-page" id="about">
            <div className="hero">
                <img src={bgImg} alt="doctor" />
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <h1>About Us</h1>
                </div>
            </div>
            <div className="main-content">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-container">
                            <h2>Welcome to Our Clinic</h2>
                            <p>At Our Clinic, we are committed to providing the highest quality medical care to our patients. Our team of highly trained medical professionals will work with you to create a personalized treatment plan that meets your specific needs and goals.</p>
                            <p>Whether you are dealing with a chronic condition or simply need a routine check-up, we are here to help. Contact us today to schedule an appointment and experience the difference of personalized medical care.</p>
                        </div>
                        <div className="col-md-4">
                            <img src={doctorImg} alt="two doctors smiling" className="doctorsPic"/>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <img src={missionImg} alt="doctor and a patient" className="doctorsPic"/>
                        </div>
                        <div className="col-md-6 text-center ">
                            <h2 className="text-title">Our Mission</h2>
                            <p className="text-container2 text-center">Our mission is to provide compassionate, patient-centered medical care to the communities we serve. We believe that every patient deserves to be treated with respect, dignity, and kindness.</p>
                            <p className="text-container2 text-center">We are committed to staying at the forefront of medical research and technology, so that we can continue to offer our patients the latest and most effective treatments available.</p>
                        </div>
                    </div>
                    
                    <div className="row mt-5 mb-5">
                        <div className="col-md-4">
                            <div className="service">
                                <i className="fas fa-user-md"></i>
                                <h3>Experienced Staff</h3>
                                <p>Our team of medical professionals has years of experience and is dedicated to providing the highest quality care to our patients.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="service">
                                <i className="fas fa-calendar-alt"></i>
                                <h3>Convenient Appointments</h3>
                                <p>We offer flexible scheduling options, so that you can get the care you need when it is most convenient for you.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="service">
                                <i className="fas fa-heartbeat"></i>
                                <h3>Compassionate Care</h3>
                                <p>We treat every patient with the respect, dignity, and kindness they deserve. You can trust us to provide the care you need.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;