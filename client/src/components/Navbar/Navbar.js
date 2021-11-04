import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function Navbar() {
    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

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
                        <Link to="/profile">
                            <span className="nav-icon"><ion-icon name="person-outline"></ion-icon></span>
                            <span className="nav-item-title">Profile</span>
                        </Link>
                    </li>
                </div>
                <li className={splitLocation[1] === "logout" ? "active" : ""}>
                    <Link to="/auth/logout">
                        <span className="nav-icon"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span className="nav-item-title">Logout</span>
                    </Link>
                </li>
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
