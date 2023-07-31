import { FaFacebook, FaInstagram, FaViber} from "react-icons/fa";

function Footer(){
    
    const facebookClicked = () => {
        window.open("https://www.facebook.com/CodecoolOfficial")
    }

    return (
        <div className="footer custom-bg-color">
            <div className="container-fluid">
                <div className="row">
                    <div className="col text-center web">
                        <p>&copy; 2023 My Website</p>
                    </div>
                    <div className='footer-socials d-flex flex-row justify-content-center gap-5 mb-3'>
                        <div className='footer-socials-logo'>
                            < FaInstagram />
                        </div>
                        <div className='footer-socials-logo' onClick={facebookClicked}>
                            < FaFacebook />
                        </div>
                        <div className='footer-socials-logo'>
                            < FaViber />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Footer;