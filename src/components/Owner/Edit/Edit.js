import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as cardService from '../../../services/cardService.js';
import './Edit.css';


function Edit() {
    const location = useLocation();
    const [error, setError] = useState(false);
    const [questionEdit, setQuestionEdit] = useState();
    const [answerEdit, setAnswerEdit] = useState();
    const { id } = location.state;
    const { question } = location.state;
    const { answer } = location.state;
    const navigate = useNavigate();

    async function onEdit(e) {
        e.preventDefault();
        const data = { questionEdit, answerEdit };
   
        cardService.onEdit(id, data)
        .then(result => {
            navigate(-1, 
                { state: {
                    id: id,
                    question: questionEdit,
                    answer: answerEdit,
                }}
            );
            setError(false);
        })
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
                    <textarea id="question-area" placeholder="Edit question" name="question" defaultValue={question} onChange={e => setQuestionEdit(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor={answer}>Answer:</label><br></br>
                    <textarea id="answer-area" placeholder="Edit answer" name="answer" defaultValue={answer} onChange={e => setAnswerEdit(e.target.value)}></textarea>
                </div>
                <button className="editBtn" type="submit">Edit</button>
                <button onClick={() => navigate(-1)} className="editBtn" type="submit">Cancel</button>
            </form>
        </div>
    )
}

export default Edit;
