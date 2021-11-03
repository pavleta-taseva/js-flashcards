import React from 'react'
import '../Header/Header.css';
import background from '../../images/bg.jpg';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <section className="header" style={{ backgroundImage: `url(${background})` }}>
            <div className="header-content">
                <div onClick={() => window.location.replace("/#categories")}>
                    <Link to="#categories" className="animate__animated animate__fadeInDown">
                    <ion-icon name="arrow-forward-circle-outline"></ion-icon> JavaScript Flashcards Trainer
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Header;
