import { Link, useHistory } from 'react-router-dom';
import loginBackground from '../../images/login-bg.jpg';
import '../Login/Login.css';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../UserContext.js';
const host = 'https://js-flashcards.herokuapp.com';
const localhost = 'http://localhost:5000';
const HOST = localhost || host;
const URL = `${HOST}/auth/login`;

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const user = useContext(UserContext);
    const history = useHistory();

    function loginUser(e) {
        e.preventDefault();
        const data = { username, password };
   
        if (data.username !== undefined && data.password !== undefined) {
            axios({
                method: 'post',
                url: URL,
                data,
                withCredentials: true 
            })
            .then((response) => {
                user.setUsername(response.data.username);
                setError(false);
                // window.location.href = '/home';
                history.replace('/home');
                window.location.reload();
            })
            .catch((err) => {
                setError(true);
                console.log(err);
            });
        } else {
            alert('Wrong username or password.')
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
                            <input name="username" type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}></input><br></br>
                        </div>
                        <label>Password</label><br></br>
                        <div className="icon">
                            <i className="fas fa-unlock"></i>
                            <input className="login-password" type="password" autoComplete="current-password" name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                            <i id="eye-three" className="fas fa-eye"></i>
                            <br></br>
                        </div>
                        <div>
                            <button type="submit" className="loginBtn">Login</button>
                        </div>
                    </form>
                    <div className="second">
                        <Link className="link" to="/auth/register">Create new account</Link>
                    </div>
                </div>
            </div>
            <div className="login-image" style={{ backgroundImage: `url(${loginBackground})` }}>
            </div>
        </section>
    )
}
export default Login;
