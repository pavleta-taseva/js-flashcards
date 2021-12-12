import React from 'react';
import { Link } from 'react-router-dom';
import '../Footer/Footer.css';

function Footer() {
    return (
        <footer>
            <small>Copyright &copy; 2021 |  
            <a className="links" href="https://github.com/KumihoBG" target="_blanc"> Pavleta Taseva (KumihoBG)</a>
            </small>
            <small>
            Credits to <a className="links" href="https://www.youtube.com/channel/UCbwXnUipZsLfUckBPsC7Jog" target="_blanc"> Online Tutorials - YouTube Channel</a>
            <br></br>
            Credits to <a className="links" href="http://www.freepik.com"> vectorjuice / Freepik</a>
            <p>Email: pavleta.taseva@gmail.com</p>
            <Link className='privacy-policy-link' to='/privacy-policy' alt="policy">Privacy Policy</Link><br />
            <a rel="noreferrer" target="_blank" href="https://www.facebook.com/kumiho.bg/"><i className="fab fa-facebook fa-2x"></i>
            </a><a rel="noreferrer" target="_blank" href="https://twitter.com/PRTSFBG"><i className="fab fa-twitter fa-2x"></i></a>
            <a rel="noreferrer" target="_blank" href="https://www.instagram.com/pavletataseva/"><i className="fab fa-instagram fa-2x"></i></a>
            </small>
        </footer>
    )
}

export default Footer;

