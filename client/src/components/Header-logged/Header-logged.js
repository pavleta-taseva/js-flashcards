import React from 'react'
import '../Header-logged/Header-logged.css';

function HeaderLogged() {
    return (
        <div>
            <header id="desktop">
                <nav class='nav-style'>
                    <ul class='ul-style'>
                        <div class="right">
                            <li>
                                <span id="welcome-user" class="user">Welcome, user</span>
                            </li>
                            <li>
                                <a id="home-link" class="common active" href='/home'>Home</a>
                            </li>
                            <li>
                                <a id="about-link" class="common" href="/blog">My Flashcards</a>
                            </li>
                            <li>
                                <a href="/profile" class="user">Profile</a>
                            </li>
                            <li>
                                <a class="user" id="logoutBtn" href="javascript:void(0)">Logout</a>
                            </li>
                        </div>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default HeaderLogged;
