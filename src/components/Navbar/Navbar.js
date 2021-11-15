import React from 'react';
import { logout } from '../../api/data.js';
import '../Navbar/Navbar.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {

    const userId = localStorage.getItem('userId');
    const isLogged = userId !== null;
    const navigate = useNavigate();
    //assigning location variable
    const location = useLocation();
    //destructuring pathname from location
    const { pathname } = location;
    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    async function onLogout() {
        try {
            await logout();
            navigate('/login', { replace: true });
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="nav">
            <ul>
                <li className={pathname === "/" ? "active" : ""}>
                    <NavLink exact={true} to="/" end={true}>
                        <span className="nav-icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="nav-item-title">Home</span>
                    </NavLink>
                </li>
                {isLogged
                    ? <div className="user">
                        <li className={splitLocation[1] === "profile" ? "active" : ""}>
                            <NavLink to={`/profile/:userId`}>
                                <span className="nav-icon"><ion-icon name="person-outline"></ion-icon></span>
                                <span className="nav-item-title">Profile</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "practice" ? "active" : ""}>
                            <NavLink to={`/practice/:userId`}>
                                <span className="nav-icon"><ion-icon name="bulb-outline"></ion-icon></span>
                                <span className="nav-item-title">Practice</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "my-cards" ? "active" : ""}>
                            <NavLink to={`/my-cards/:userId`}>
                                <span className="nav-icon"><ion-icon name="construct-outline"></ion-icon></span>
                                <span className="nav-item-title">My Cards</span>
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
                    : <div className="guest">
                        <li className={splitLocation[1] === "collections" ? "active" : ""}>
                            <NavLink to="/collections">
                                <span className="nav-icon"><ion-icon name="library-outline"></ion-icon></span>
                                <span className="nav-item-title">Flashcards</span>
                            </NavLink>
                        </li>

                        <li className={splitLocation[1] === "register" ? "active" : ""}>
                            <NavLink to="/register">
                                <span className="nav-icon"><ion-icon name="person-add-outline"></ion-icon></span>
                                <span className="nav-item-title">Register</span>
                            </NavLink>
                        </li>

                        <li className={splitLocation[1] === "login" ? "active" : ""}>
                            <NavLink to="/login">
                                <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                                <span className="nav-item-title">Login</span>
                            </NavLink>
                        </li>
                    </div>
                }
            </ul>
        </div>
    )
}

export default Navbar;
