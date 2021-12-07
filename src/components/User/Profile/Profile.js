import React, { useState, useEffect } from 'react';
import Parse from '../../../../node_modules/parse/dist/parse.js';
import '../Profile/Profile.css';
import Backdrop from '../../Backdrop/Backdrop.js';
import Modal from './../../Modal/Modal.js';
import * as cardService from '../../../services/cardService.js';
import * as authService from '../../../services/authService.js';

function Profile() {
    const [showModal, setShowModal] = useState();
    const [count, setCount] = useState('');
    const [level, setLevel] = useState('');
    const [created, setCreated] = useState();
    const [image, setImage] = useState(null);
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    function showModalHandler() {
        setShowModal(true);
    }

    function closeModalHandler() {
        setShowModal(false);
    }

    async function saveImage(e) {
        e.preventDefault();
        
        //define the width to resize e.g 600px
        let resizeWidth = 300;//without px
    
        //create a FileReader
        let reader = new FileReader();
    
        //image turned to base64-encoded Data URI.
        reader.readAsDataURL(image);
        reader.name = image.name;//get the image's name
        reader.size = image.size; //get the image's size
        reader.onload = function (event) {
          let img = new Image();//create a image
          img.src = event.target.result;//result is base64-encoded Data URI
          img.name = event.target.name;//set name (optional)
          img.size = event.target.size;//set size (optional)
          img.onload = async function (el) {
            let elem = document.createElement('canvas');//create a canvas
            elem.width = resizeWidth;
            elem.height = resizeWidth;
    
            //draw in canvas
            let ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);
    
            //get the base64-encoded Data URI from the resize image
            let srcEncoded = ctx.canvas.toDataURL('image/png', 1);
    
            //assign it to thumb src
            image.src = srcEncoded;
            /*Now you can send "srcEncoded" to the server and
            convert it to a png o jpg. Also can send
            "el.target.name" that is the file's name.*/
            try {
                let user = Parse.User.current();
                let file = new Parse.File(image.name, { base64: srcEncoded });
                file.save();
                user.set('image', file);
                try {
                    // Saves the user with the updated data
                    await user.save();
                    window.location.replace(`/profile/${userId}`);
                    console.log('New image saved successfully!');
                    return image;
                } catch (error) {
                    console.error('Error while updating user', error);
                }
            } catch(err) {
                console.log(err.message)
            }
          }
        }
    }

    async function handleProfileImage(event) {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await cardService.countMyCards(userId);
                const currentLevel = await cardService.getUserLevel(userId);
                const created = await cardService.createdAt(userId); 
                const image = await authService.getUserImage(userId);
                setImage(image);
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
                <div className="user-image-container">
                    <form onSubmit={e => saveImage(e)} className="upload-form">
                        <label htmlFor="upload">
                            <p className="picture-paragraph">Change your profile picture:</p>
                            <input type="file"
                                className="upload"
                                onChange={(event) => { handleProfileImage(event) }}
                                name="upload"
                                accept="image/*"
                                visibility="none"
                            />
                        </label>
                        <button className="submit-image" type="submit">Save image</button>
                    </form>
                    {image && (
                        <img className="user-image" alt="user" onError={(event) => event.target.style.display = 'none'} src={image}></img>
                    )}
                </div>
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
