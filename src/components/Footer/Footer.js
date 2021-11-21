import React from 'react';
import '../Footer/Footer.css';

function Footer() {
    return (
        <footer>
            <small>Copyright &copy; 2021 | Design by 
                <a className="links" href="https://github.com/KumihoBG" target="_blanc"> Pavleta Taseva</a> - for educational purposes only.
            </small>
            <small>
            Credits to <a className="links" href="https://www.youtube.com/channel/UCbwXnUipZsLfUckBPsC7Jog" target="_blanc"> Online Tutorials - YouTube Channel</a>
            <br></br>
            Credits to <a className="links" href="http://www.freepik.com"> vectorjuice / Freepik</a>
            <br></br>
            Credits to <a className="links" href="https://www.mockofun.com">Design created with MockoFUN</a>
            </small>
        </footer>
    )
}

export default Footer;

