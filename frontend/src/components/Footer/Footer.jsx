import { FaFacebook, FaInstagram, FaViber} from "react-icons/fa";
import './Footer.css'

function Footer(){
    
    const facebookClicked = () => {
        window.open("https://www.facebook.com/CodecoolOfficial")
    }

    return (
        <div className="footer custom-bg-color mb-3">
            <div className="container-fluid">
                <div className="row">
                    <div className="col text-center web">
                        <p>&copy; 2023 My Website</p>
                    </div>
                    <div className='footer-socials d-flex flex-row justify-content-center gap-5 mb-3'>
                        <div className='footer-socials-logo'>
                            < FaInstagram size={30}/>
                        </div>
                        <div className='footer-socials-logo' onClick={facebookClicked}>
                            < FaFacebook size={30}/>
                        </div>
                        <div className='footer-socials-logo'>
                            < FaViber size={30}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Footer;