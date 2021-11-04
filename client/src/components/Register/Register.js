import '../Register/Register.css';
import registerBackground from '../../images/register-bg.jpg';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <section className="register-section">
        <div className="register-container">
            <div className="form-container">
            <form className="register-form" action="/register" method="POST">
                    <h1>Register</h1>
                    <p>Please enter your credentials.</p>
                    <label for="username">Username</label><br></br>
                    <div className="icon">
                        <i className="fas fa-user"></i>
                        <input name="username" type="text" autocomplete="username"></input><br></br>
                    </div>
                    <label for="email">Email</label><br></br>
                    <div className="icon">
                        <i className="fas fa-envelope-open-text"></i>
                        <input name="email" type="email" autocomplete="email" required pattern="[^]+@[^]+[.][a-z]{2,63}$"></input><br></br>
                    </div>
                    <p className="register-info"><i className="fas fa-info-circle"></i> Password must be between 6 and 10 characters. Password must consist only of letters and at least 2 digits.</p>
                    <label for="password">Password</label><br></br>
                    <div className="icon">
                        <i className="fas fa-lock"></i>
                        <input className="password" type="password" autocomplete="current-password" name="password"></input>
                        <i id="eye-one" className="fas fa-eye"></i>
                        <br></br>
                    </div>
                    <label for="repeatPass">Repeat password</label><br></br>
                    <div className="icon">
                        <i className="fas fa-lock"></i>
                        <input className="repeatPass" type="password" autocomplete="current-password" name="repeatPass"></input><br></br>
                        <i id="eye-two" className="fas fa-eye"></i>
                    </div>
                    <div>
                        <button type="submit" className="registerBtn">Register</button>
                    </div>
            </form>
                <div className="second">
                    <Link className="link" to="/login">Already have an account?</Link><br></br>
                    <Link className="link" to="/">Back to Home</Link>
                </div>
            </div>
        </div>
        <div className="register-image" style={{ backgroundImage: `url(${registerBackground})` }}>
           
        </div>
    </section>
    )
}

export default Register;
