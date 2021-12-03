import React, { useState, useContext } from 'react';
import * as authService from '../../../services/authService.js';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginBackground from '../../../images/login-bg.jpg';
import { AuthContext } from '../../../contexts/AuthContext.js';

function Login() {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        const { username, password } = Object.fromEntries(new FormData(e.currentTarget));
        console.log(username, password);
        login(username, password);

        if (username !== undefined && password !== undefined) {
            try {
                await authService.login(username, password);
                setError(false);
                navigate('/home', { replace: true });
            } catch(err) {
                console.log(err.message)
            }
        }
    }
    return (
        <section className="login-section">
            <div className="login-container">
                <div className="loginForm-container">
                    <form onSubmit={e => loginUser(e)}>
                        {error && (
                            <div>Error: Wrong email or password!</div>
                        )}
                        <h1>Login</h1>
                        <p>Please enter your credentials.</p>
                        <label>Username</label><br></br>
                        <div className="icon">
                            <i className="fas fa-envelope-open-text"></i>
                            <input name="username" type="text" autoComplete="username"></input><br></br>
                        </div>
                        <label>Password</label><br></br>
                        <div className="icon">
                            <i className="fas fa-unlock"></i>
                            <input className="login-password" type="password" autoComplete="current-password" name="password"></input>
                            <i id="eye-three" className="fas fa-eye"></i>
                            <br></br>
                        </div>
                        <div>
                            <button type="submit" className="loginBtn">Login</button>
                        </div>
                    </form>
                    <div className="second">
                        <Link className="link" to="/register" alt="register">Create new account</Link>
                    </div>
                </div>
            </div>
            <div className="login-image" style={{ backgroundImage: `url(${loginBackground})` }}>
            </div>
        </section>
    )
}
export default Login;
