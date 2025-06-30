import { useState } from 'react';
import '../css_file/TopNav.css';
import logo_image from '../icons_assets/logo.png';

function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="container" id="home">
      <div className="top-header">
        <div className="logo-container">
          <img src={logo_image} alt="Logo" className="logo" />
          <h1 className="logo-text">API EXPLORER</h1>
        </div>

        <div className="toggle-wrapper">
          <div className="hamburger" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      {/* This will now appear below the header on small screens */}
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#instructions" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#playground" onClick={() => setMenuOpen(false)}>Playground</a>
        <a href="#rateus" onClick={() => setMenuOpen(false)}>Rate Us</a>
        <a href="#contact_us" onClick={() => setMenuOpen(false)}>Contact Us</a>
      </div>
    </div>
  );
}

export default TopNav;