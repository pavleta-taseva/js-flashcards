import React from 'react'
import './Home.css';
import background from '../../images/bg.jpg';
import { Link, Outlet } from 'react-router-dom';

function Home() {
    return (
        <div>
            <section className="header" style={{ backgroundImage: `url(${background})` }}>
                <div className="header-content">
                    <div onClick={() => window.location.replace("/#categories")}>
                        <Link to="#categories" className="animate__animated animate__fadeInDown">
                            JavaScript Flashcards Trainer
                            <h6><ion-icon name="arrow-forward-circle-outline"></ion-icon> Choose your level</h6>
                        </Link>
                    </div>
                </div>
            </section>
            <Outlet />
        </div>
    )
}

export default Home;
