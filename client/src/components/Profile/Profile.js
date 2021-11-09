import React from 'react';
import '../Profile/Profile.css';

function Profile() {
    return (
        <div className="profile-page">
            <section id="profile-page">
                <div id="left-container">
                    <div id="user">
                        <div id="user-image-container">
                            <form className="upload-form">
                                <label htmlFor="upload">
                                    <p className="i"><i id="header-upload-two" className="fas fa-camera fa-2x"></i></p>
                                    <input type="file" id="upload" name="upload" style={{display:"none"}} accept="image/*" visibility="none"></input>
                                </label>
                            </form>
                            <div id="picture-container">
                                <img id="user-image" src="" alt="User"></img>
                            </div>
                            <h3 id="username-style">{}</h3>
                        </div>
                    </div>
                    <div id="user-details">
                        <h2>Account details:</h2>
                        <ul>
                            <li><i className="fas fa-user-circle"></i> Username: </li>
                            <li><i className="fas fa-envelope-square"></i> Email:  </li>
                        </ul>
                    </div>
                </div>

                <div id="right-container">
                    <h2>Account Actions:</h2>
                    <div className="new-pass-container">
                        <div className="wrapper">
                            <h4><i className="fas fa-check-double"></i> If you wish to change your current password, please fill in the new
                                password. Repeat it to make sure there is no error and click the button in the box below:</h4>
                            <div id="new-pass-info-container">
                                <p><i className="fas fa-info-circle"></i> Password must be between 6 and 10 characters. Password
                                    must consist only of letters and at least 2 digits.</p>
                            </div>
                            <form id="profile-form" action="#" method="post">
                                <input hidden id="username-hidden" name="username-hidden" type="text" autoComplete="username"></input>
                                <label htmlFor="new-password">New password:</label>
                                <div className="icon">
                                    <i className="fas fa-lock"></i>
                                    <input id="new-password" type="password" name="change-password" autoComplete="password"></input><br></br>
                                    <i id="eye-four" className="fas fa-eye togglePassword"></i>
                                </div>
                                <br></br>
                                <label htmlFor="repeat-password">Repeat password:</label>
                                <div className="icon">
                                    <i className="fas fa-lock"></i>
                                    <input id="repeat-password" type="password" name="change-password" autoComplete="current-password"></input><br></br>
                                    <i id="eye-five" className="fas fa-eye"></i>
                                </div>
                                <button type="button" id="submitNewPass" name="submitNewPass">Change Password</button>
                            </form>
                        </div>

                        <div className="wrapper">
                            <h4><i className="fas fa-check-double"></i> Delete account:</h4>
                            <p>If you don't want to be part of our community anymore, click the button below. Please note that once deleted,
                                your account information cannot be recovered and you will need to re-register.</p>
                            <button type="button" id="deleteAccount" name="deleteAccount">Delete account</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile;

