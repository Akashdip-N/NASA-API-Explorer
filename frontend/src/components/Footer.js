import logo from '../icons_assets/logo.png';
import '../css_file/Footer.css';
import {faFacebook, faTwitter, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer({ darkMode, setDarkMode }) {
    return (
        <>
            <nav className="footer">
                <div className="footer-content">
                    <div className="logo-and-text">
                        <img src={logo} className="footer-logo" alt='logo_footer'/>
                        <h1 className="logo-text">API EXPLORER</h1>
                    </div>
                    <div className='darkmode-toggle'>
                        <h2>Select visibility mode</h2>
                        <span className="toggle-label">{darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />
                            <span className="slider">
                                <span className="slider-icon">{
                                    darkMode ? '🌙' : '☀️'
                                }</span>
                            </span>
                        </label>
                    </div>

                    <div className="social-media">
                        <h4>Follow Us On</h4>
                        <ul className="social-icons">
                            <li>
                                <a
                                    href="https://www.facebook.com"
                                    target="_blank"
                                    aria-label="Facebook"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                >
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Footer;