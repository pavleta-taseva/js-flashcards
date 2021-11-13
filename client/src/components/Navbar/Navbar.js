import '../Navbar/Navbar.css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import UserContext from '../../UserContext.js';
import axios from 'axios';
const host = 'https://js-flashcards.herokuapp.com';
const localhost = 'http://localhost:5000';

function Navbar() {
    let [username, setUsername] = useState();
    const [email, setEmail] = useState();
    let user = useContext(UserContext);
    const isLogged = user.username !== undefined;
    const history = useHistory();
    //assigning location variable
    const location = useLocation();
    //destructuring pathname from location
    const { pathname } = location;
    const HOST = localhost || host;
    const URL = `${HOST}/auth/logout`;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    function logout() {
        axios.get(URL, {}, { withCredentials: true })
            .then(() => {
                setUsername('')
                setEmail('')
                user.username = undefined;
                // window.location.href = '/auth/login';
                history.replace('/auth/login');
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
                {isLogged
                    ? <div className="user">
                        <li className={splitLocation[1] === "practice" ? "active" : ""}>
                            <Link to={`/practice/:userId`}>
                                <span className="nav-icon"><ion-icon name="bulb-outline"></ion-icon></span>
                                <span className="nav-item-title">Practice</span>
                            </Link>
                        </li>
                        <li className={splitLocation[1] === "flashcards" ? "active" : ""}>
                            <Link to={`/flashcards/create`}>
                                <span className="nav-icon"><ion-icon name="create-outline"></ion-icon></span>
                                <span className="nav-item-title">Create</span>
                            </Link>
                        </li>
                        <li className={splitLocation[1] === "logout" ? "active" : ""}>
                            <Link to={`#`}>
                                <span className="nav-icon"><ion-icon name="log-out-outline"></ion-icon></span>
                                <button onClick={() => logout()} className="nav-logout-btn">Logout</button>
                            </Link>
                        </li>
                    </div>
                    : <div className="guest">
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
                }
            </ul>
        </div>
    )
}

export default Navbar;
