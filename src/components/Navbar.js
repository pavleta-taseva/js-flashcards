import { logout } from '../api/data.js';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const userId = localStorage.getItem('userId');
    const isLogged = userId !== null;
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
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
                {isLogged
                    ?
                    <div className="user">
                        <li className={pathname === "/home" ? "active" : ""}>
                            <NavLink to="/home" alt="Flashcard Trainer Home page" end={true}>
                                <span className="nav-icon"><ion-icon name="home-outline"></ion-icon></span>
                                <span className="nav-item-title">Home</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "profile" ? "active" : ""}>
                            <NavLink to={`/profile/${userId}`} alt="Flashcard Trainer Profile page">
                                <span className="nav-icon"><ion-icon name="person-outline"></ion-icon></span>
                                <span className="nav-item-title">Profile</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "my-cards" ? "active" : ""}>
                            <NavLink to={`/my-cards/${userId}`} alt="Flashcard Trainer My cards page">
                                <span className="nav-icon"><ion-icon name="construct-outline"></ion-icon></span>
                                <span className="nav-item-title">My Cards</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "flashcards" ? "active" : ""}>
                            <NavLink to={`/flashcards/create`} alt="Flashcard Trainer Create page">
                                <span className="nav-icon"><ion-icon name="create-outline"></ion-icon></span>
                                <span className="nav-item-title">Create</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "practice" ? "active" : ""}>
                            <NavLink to={`/practice/${userId}`} alt="Flashcard Trainer Practice page">
                                <span className="nav-icon"><ion-icon name="bulb-outline"></ion-icon></span>
                                <span className="nav-item-title">Practice</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "logout" ? "active" : ""}>
                            <NavLink to={`#`} alt="Logout button">
                                <span className="nav-icon"><ion-icon name="log-out-outline"></ion-icon></span>
                                <button onClick={() => onLogout()} className="nav-logout-btn">Logout</button>
                            </NavLink>
                        </li>
                    </div>
                    : <div className="guest">
                        <li className={pathname === "/" ? "active" : ""}>
                            <NavLink to="/" alt="Flashcard Trainer Landing page" end={true}>
                                <span className="nav-icon"><ion-icon name="home-outline"></ion-icon></span>
                                <span className="nav-item-title">Home</span>
                            </NavLink>
                        </li>
                        <li className={splitLocation[1] === "collections" ? "active" : ""}>
                            <NavLink to="/collections" alt="Flashcard Trainer Collections page">
                                <span className="nav-icon"><ion-icon name="library-outline"></ion-icon></span>
                                <span className="nav-item-title">Flashcards</span>
                            </NavLink>
                        </li>

                        <li className={splitLocation[1] === "register" ? "active" : ""}>
                            <NavLink to="/register" alt="Flashcard Trainer Register page">
                                <span className="nav-icon"><ion-icon name="person-add-outline"></ion-icon></span>
                                <span className="nav-item-title">Register</span>
                            </NavLink>
                        </li>

                        <li className={splitLocation[1] === "login" ? "active" : ""}>
                            <NavLink to="/login" alt="Flashcard Trainer Login page">
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
