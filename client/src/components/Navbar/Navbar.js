import '../Navbar/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Navbar() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();

    //assigning location variable
    const location = useLocation();
    //destructuring pathname from location
    const { pathname } = location;
    const localUrl = 'http://localhost:5000/auth/logout';
    const herokuUrl = 'https://js-flashcards.herokuapp.com/auth/logout';

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    function logout() {
        axios.get(herokuUrl, {}, { withCredentials: true })
        .then(() => {
            setUsername('')
            setEmail('')
        });
    }

    return (

        <div className="nav">
            <ul>
                {/* Checking the current path name using javascript ternary operator and if true adding active classname to it */}
                <li className={splitLocation[1] === "" ? "active" : ""}>
                    <Link to="/">
                        <span className="nav-icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="nav-item-title">Home</span>
                    </Link>
                </li>
                <div className="guest">
                    <li className={splitLocation[1] === "register" ? "active" : ""}>
                        <Link to="/auth/register">
                            <span className="nav-icon"><ion-icon name="person-add-outline"></ion-icon></span>
                            <span className="nav-item-title">Register</span>
                        </Link>
                    </li>

                    <li className={splitLocation[1] === "login" ? "active" : ""}>
                        <Link to="/auth/login">
                            <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                            <span className="nav-item-title">Login</span>
                        </Link>
                    </li>
                </div>

                <div className="user">
                    <li className={splitLocation[1] === "profile" ? "active" : ""}>
                        <Link to={`/profile/:userId`}>
                            <span className="nav-icon"><ion-icon name="person-outline"></ion-icon></span>
                            <span className="nav-item-title">Profile</span>
                        </Link>
                    </li>
                    <li className={splitLocation[1] === "create" ? "active" : ""}>
                        <Link to="/flashcards/create">
                            <span className="nav-icon"><ion-icon name="create-outline"></ion-icon></span>
                            <span className="nav-item-title">Create</span>
                        </Link>
                    </li>
                    <li className={splitLocation[1] === "practice" ? "active" : ""}>
                        <Link to={`/practice/:userId`}>
                            <span className="nav-icon"><ion-icon name="bulb-outline"></ion-icon></span>
                            <span className="nav-item-title">Practice</span>
                        </Link>
                    </li>
                    <li className={splitLocation[1] === "logout" ? "active" : ""}>
                    <Link to={`#`}>
                        <span className="nav-icon"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span onClick={() => logout()} className="nav-item-title">Logout</span>
                    </Link>
                    </li>
                </div>
                {/* Visible only for admin */}
                <li className={splitLocation[1] === "admin" ? "active" : ""}>
                    <Link to="/admin">
                        <span className="nav-icon"><ion-icon name="cog-outline"></ion-icon></span>
                        <span className="nav-item-title">Admin Panel</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;
