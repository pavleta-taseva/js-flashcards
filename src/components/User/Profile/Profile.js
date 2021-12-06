import React, { useState, useEffect } from 'react';
import '../Profile/Profile.css';
import Backdrop from '../../Backdrop/Backdrop.js';
import Modal from './../../Modal/Modal.js';
import * as cardService from '../../../services/cardService.js';

function Profile() {
    const [showModal, setShowModal] = useState();
    const [count, setCount] = useState(0);
    const [level, setLevel] = useState('Disciple');
    const [created, setCreated] = useState();
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    function showModalHandler() {
        setShowModal(true);
    }

    function closeModalHandler() {
        setShowModal(false);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await cardService.countMyCards(userId);
                const currentLevel = await cardService.getUserLevel(userId);
                const created = await cardService.createdAt(userId);
                setCount(res);
                setLevel(currentLevel);
                setCreated(created);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="profile-container">
            <div className="user-profile">
                <div className="user-image"></div>
                <div className="user-details">
                    <h1>{username}</h1>
                    <h3><ion-icon name="mail-outline"></ion-icon><span className="user-details-span"> Email:</span> {email}</h3>
                    <h3><ion-icon name="id-card-outline"></ion-icon><span className="user-details-span"> User Id:</span> {userId}</h3>
                    <h3><ion-icon name="star-outline"></ion-icon><span className="user-details-span"> Contributions made:</span> {count} flashcards</h3>
                    <h3><ion-icon name="speedometer-outline"></ion-icon><span className="user-details-span"> Current level:</span> {level}</h3>
                    <h3><ion-icon name="hourglass-outline"></ion-icon><span className="user-details-span"> Account created at:</span> {created}</h3>
                    <h3><i class="fas fa-check-double"></i> Delete account:</h3>
                    <p>If you don't want to be part of our community anymore, click the button below. Please note that once deleted,
                        your account information cannot be recovered and you will need to re-register.</p>
                    <button onClick={showModalHandler} type="button" className="deleteAccount" name="deleteAccount">Delete account</button>
                </div>
            </div>
            {showModal && <Backdrop onClick={closeModalHandler} />}
            {showModal && <Modal text='Are you sure?' onClose={closeModalHandler} />}
        </div>
    )
}

export default Profile;
