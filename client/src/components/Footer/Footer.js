import React from 'react';
import { Link } from 'react-router-dom';
import '../Footer/Footer.css';

function Footer() {
    return (
        <div className="footer-bottom">
            <small>Copyright &copy; 2021 
                <Link className="links" to="https://github.com/KumihoBG" target="_blank"> @Kumiho
                </Link> - for educational purposes only.
            </small>
            <br></br>
            <small>Designed by Online Tutorials</small>
        </div>
    )
}

export default Footer;
