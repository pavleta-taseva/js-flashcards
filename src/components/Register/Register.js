import { register } from '../../api/data.js';
import '../Register/Register.css';
import registerBackground from '../../images/register-bg.jpg';
import { Link,  useHistory } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import UserContext from '../../UserContext.js';

function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rePass, setRePass] = useState();
    const history = useHistory();
    const user = useContext(UserContext);

    async function registerUser(e) {
        e.preventDefault();

        if (password !== rePass) {
            alert('Two passwords don\'t match!');
            return;
        }

        const data = { username, email, password };

        if (data.username !== undefined && data.email !== undefined && data.password !== undefined) {
            try {
                await register(username, email, password);
                user.setUsername(username);
                history.replace('/auth/login');
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <section className="register-section">
            <div className="register-container">
                <div className="form-container">
                    <form className="register-form" onSubmit={e => registerUser(e)}>
                        <h1>Register</h1>
                        <p>Please enter your credentials.</p>
                        <label>Username</label><br></br>
                        <div className="icon">
                            <i className="fas fa-user"></i>
                            <input name="username" type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}></input><br></br>
                        </div>
                        <label>Email</label><br></br>
                        <div className="icon">
                            <i className="fas fa-envelope-open-text"></i>
                            <input name="email" type="email" autoComplete="email" required pattern="[^]+@[^]+[.][a-z]{2,63}$" value={email} onChange={e => setEmail(e.target.value)}></input><br></br>
                        </div>
                        <p className="register-info"><i className="fas fa-info-circle"></i> Password must be between 6 and 10 characters. Password must consist only of letters and at least 2 digits.</p>
                        <label>Password</label><br></br>
                        <div className="icon">
                            <i className="fas fa-lock"></i>
                            <input className="password" type="password" autoComplete="current-password" name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                            <i id="eye-one" className="fas fa-eye"></i>
                            <br></br>
                        </div>
                        <label>Repeat password</label><br></br>
                        <div className="icon">
                            <i className="fas fa-lock"></i>
                            <input className="rePass" type="password" autoComplete="current-password" name="rePass" onChange={e => setRePass(e.target.value)}></input><br></br>
                            <i id="eye-two" className="fas fa-eye"></i>
                        </div>
                        <div>
                            <button type="submit" className="registerBtn">Register</button>
                        </div>
                    </form>
                    <div className="second">
                        <Link className="link" to="/auth/login">Already have an account?</Link><br></br>
                    </div>
                </div>
            </div>
            <div className="register-image" style={{ backgroundImage: `url(${registerBackground})` }}>

            </div>
        </section>
    )
}

export default Register;
