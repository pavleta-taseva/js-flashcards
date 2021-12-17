import React, { useState, useEffect, useContext } from "react";
import * as authService from '../../../services/authService.js';
import { GithubContext } from "../../../App.js";
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginBackground from '../../../images/login-bg.jpg';
import { AuthContext } from '../../../contexts/AuthContext.js';
import notification from '../../../helpers/notification.js';

function Login() {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const { state, dispatch } = useContext(GithubContext);
    const [data, setData] = useState({ errorMessage: "", isLoading: false });
    const { client_id, redirect_uri } = state;
    const navigate = useNavigate();

    useEffect(() => {
        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        // If Github API returns the code parameter
        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, null, newUrl[0]);
            setData({ ...data, isLoading: true });

            const requestData = {
                code: newUrl[1]
            };

            const proxy_url = state.proxy_url;

            // Use code parameter and other parameters to make POST request to proxy_server
            fetch(proxy_url, {
                method: "POST",
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: "LOGIN",
                        payload: { user: data, isLoggedIn: true }
                    });
                })
                .catch(error => {
                    setData({
                        isLoading: false,
                        errorMessage: "Sorry! Login failed"
                    });
                });
        }
    }, [state, dispatch, data]);

    if (state.isLoggedIn) {
        return navigate('/home');
    }


    async function loginUser(e) {
        e.preventDefault();
        const { username, password } = Object.fromEntries(new FormData(e.currentTarget));

        login(username, password);
        if (username === '' || password === '') {
            notification("Empty input", "Please, fill in all fields!");
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
                    notification("User doesn't exist!", "Please register first");
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
                    <span>{data.errorMessage}</span>
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
                    <p> ----- or ----- </p>
                    <div className="login-github">
                        {data.isLoading ? (
                            <div className="loader-container">
                                <div className="loader-github"></div>
                            </div>
                        ) : (
                            <>
                                {
                                    // Link to request GitHub access
                                }
                                <a
                                    className="login-link"
                                    href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                                    onClick={() => {
                                        setData({ ...data, errorMessage: "" });
                                    }}
                                >
                                    <span>Login with GitHub</span>
                                </a>
                            </>
                        )}
                    </div>
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
