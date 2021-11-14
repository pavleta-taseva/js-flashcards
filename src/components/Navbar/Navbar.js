import React, { useState, useContext } from 'react';
import { logout } from '../../api/data.js';
import '../Navbar/Navbar.css';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext.js';

function Navbar() {
    let [username, setUsername] = useState();
    const [email, setEmail] = useState();
    let user = useContext(UserContext);
    const isLogged = user.username !== undefined;
    const history = useNavigate();
    //assigning location variable
    const location = useLocation();
    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    async function onLogout() {
        try {
            await logout();
            history.replace('/auth/login');
        } catch(err) {
            console.log(err.message)
        }
    }

    return (

        <div className="nav">
            <ul>
                {/* Checking the current path name using javascript ternary operator and if true adding active classname to it */}
                <li className={splitLocation[1] === "" ? "active" : ""}>
                    <NavLink to="/">
                        <span className="nav-icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="nav-item-title">Home</span>
                    </NavLink>
                </li>
                
                    <div className="user">
                        <li className={splitLocation[1] === "practice" ? "active" : ""}>
                            <NavLink to={`/practice/:userId`}>
                                <span className="nav-icon"><ion-icon name="bulb-outline"></ion-icon></span>
                                <span className="nav-item-title">Practice</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "flashcards" ? "active" : ""}>
                            <NavLink to={`/flashcards/create`}>
                                <span className="nav-icon"><ion-icon name="create-outline"></ion-icon></span>
                                <span className="nav-item-title">Create</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "logout" ? "active" : ""}>
                            <NavLink to={`#`}>
                                <span className="nav-icon"><ion-icon name="log-out-outline"></ion-icon></span>
                                <button onClick={() => onLogout()} className="nav-logout-btn">Logout</button>
                            </NavLink>
                        </li>
                    </div>
                    <div className="guest">
                        <li className={splitLocation[1] === "register" ? "active" : ""}>
                            <NavLink to="/auth/register">
                                <span className="nav-icon"><ion-icon name="person-add-outline"></ion-icon></span>
                                <span className="nav-item-title">Register</span>
                            </NavLink>
                        </li>

                        <li className={splitLocation[1] === "login" ? "active" : ""}>
                            <NavLink to="/auth/login">
                                <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                                <span className="nav-item-title">Login</span>
                            </NavLink>
                        </li>
                    </div>
            </ul>
        </div>
    )
}

export default Navbar;
