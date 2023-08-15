import { FaFacebook, FaInstagram, FaViber} from "react-icons/fa";
import './Footer.css'

function Footer(){
    
    const facebookClicked = () => {
        window.open("https://www.facebook.com/CodecoolOfficial")
    }

    return (
        <div className="footer custom-bg-color mb-3">
            <div className="container-fluid d-flex flex-column gap-3">
                <div className="d-flex flex-row justify-content-center gap-5">
                    <div className="">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2758.3784915455826!2d20.161238875721846!3d46.26258197981753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47448810b8ce327f%3A0x7be67a5d5e5fbb75!2sSzeged%2C%20Szill%C3%A9ri%20sgrt.%2023%2C%206723!5e0!3m2!1shu!2shu!4v1690986596038!5m2!1shu!2shu"
                            width="400" height="300" style={{
                            border: "0",
                            width: "600px",
                        }} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div >
                        <h5 className="opening-hours">Opening Hours:</h5>
                        <p className="opening-hours">Monday - Friday: 8:00 AM - 8:00 PM</p>
                        <p className="opening-hours">Saturday: Closed</p>
                        <p className="opening-hours">Sunday: Closed</p>
                        <h5 className="opening-hours">Phone number:</h5>
                        <p className="opening-hours">+36 30 432 99 90</p>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col text-center web">
                        <p>&copy; Prevention and Rehabilitation Center</p>
                    </div>
                    <div className='footer-socials d-flex flex-row justify-content-center gap-5 mb-3'>
                        <div className='footer-socials-logo'>
                            < FaInstagram size={30} color="#4a646f"/>
                        </div>
                        <div className='footer-socials-logo' onClick={facebookClicked}>
                            < FaFacebook size={30} color="#4a646f"/>
                        </div>
                        <div className='footer-socials-logo'>
                            < FaViber size={30} color="#4a646f"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Footer;