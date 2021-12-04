import React, { useState, useContext } from 'react';
import * as authService from '../../../services/authService.js';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginBackground from '../../../images/login-bg.jpg';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { store } from 'react-notifications-component';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loginGoogle } from "../../../redux/actions/auth.js";

function Login({ loginGoogle, oauth }) {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        loginGoogle();
    };

    if (oauth) {
        window.location.href = oauth;
    }

    async function loginUser(e) {
        e.preventDefault();
        const { username, password } = Object.fromEntries(new FormData(e.currentTarget));

        login(username, password);
        if (username === '' || password === '') {
            store.addNotification({
                title: "Please, fill in all fields!",
                message: "Empty input",
                type: "info",
                insert: "bottom-center",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            return;
        }

        if (username !== undefined
            && password !== undefined
            && username !== null
            && password !== null) {
            try {
                const result = await authService.login(username, password);
                setError(false);
                if (result === null) {
                    store.addNotification({
                        title: "User doesn't exist!",
                        message: "Please register first",
                        type: "info",
                        insert: "bottom-center",
                        container: "top-center",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    });
                    navigate('/login', { replace: true });
                    return null;
                }
                navigate('/home', { replace: true });
            } catch (err) {
                console.error(err.message);
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
                        <button className="g-signin2" data-onsuccess="onSignIn" onClick={handleGoogleSignIn}>Sign In with Google</button>
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

Login.propTypes = {
    loginGoogle: PropTypes.func.isRequired,
    oauth: PropTypes.string,
};

const mapStateToProps = (state) => ({
    oauth: state.auth.oauth,
});

export default connect(mapStateToProps, { loginGoogle })(Login);


