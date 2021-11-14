import React, { useState, useContext } from 'react';
import { login } from '../../api/data.js';
import '../Login/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginBackground from '../../images/login-bg.jpg';
import UserContext from '../../UserContext.js';

const localUrl = 'http://localhost:5000/auth/login';
// const herokuUrl = 'https://js-flashcards.herokuapp.com/auth/login';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const user = useContext(UserContext);
    const history = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        const data = { username, password };

        if (data.username !== undefined && data.password !== undefined) {
            try {
                await login(username, password);
                user.setUsername(username);
                setError(false);
                history.replace('/');
                window.location.reload();
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
