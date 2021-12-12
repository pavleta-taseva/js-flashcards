import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { store } from 'react-notifications-component';

import * as cardService from '../../../services/cardService.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import './Edit.css';


function Edit() {
    const { user } = useAuth();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [validate, setValidate] = useState(false);
    const [questionEdit, setQuestionEdit] = useState();
    const [answerEdit, setAnswerEdit] = useState();
    const { id } = location.state;
    const { question } = location.state;
    const { answer } = location.state;
    const navigate = useNavigate();

    async function onEdit(e) {
        e.preventDefault();
        const data = { questionEdit, answerEdit };

        if (validate === false) {
            cardService.onEdit(id, data)
                .then(result => {
                    navigate(-1,
                        {
                            state: {
                                id: id,
                                question: questionEdit,
                                answer: answerEdit,
                            }
                        }
                    );
                    setError(false);
                })
        } else {
            store.addNotification({
                title: "Error!",
                message: "Please fill in all fields first.",
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
        }
    }

    function fieldValidation(e) {
        let currentField = e.target.value;
        if (currentField === '') {
            setValidate(true);
        } else {
            setValidate(false)
        }
    }

    function cancel() {
        return navigate(-1);
    }

    if (user === '') {
        return navigate('/login');
    }

    return (
        <div className="edit">
            <form className="edit-form" onSubmit={e => onEdit(e)}>
                {error && (
                    <div>Error: Missing data. Please edit all fields!</div>
                )}
                <h1>Edit your Flashcard</h1>
                <div>
                    <label htmlFor={question}>Question:</label><br></br>
                    <textarea id="question-area" placeholder="Edit question" name="question" defaultValue={question} onChange={e => setQuestionEdit(e.target.value)} onBlur={fieldValidation} style={{ borderColor: validate.question ? '#ff2ae0' : 'inherit' }}></textarea>
                </div>
                <div>
                    <label htmlFor={answer}>Answer:</label><br></br>
                    <textarea id="answer-area" placeholder="Edit answer" name="answer" defaultValue={answer} onChange={e => setAnswerEdit(e.target.value)} onBlur={fieldValidation} style={{ borderColor: validate.answer ? '#ff2ae0' : 'inherit' }}></textarea>
                </div>
                <button className="editBtn" type="submit">Edit</button>
                <button onClick={cancel} className="editBtn">Cancel</button>
            </form>
        </div>
    )
}

export default Edit;
