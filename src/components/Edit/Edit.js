import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Parse from '../../../node_modules/parse/dist/parse.js';
import '../Edit/Edit.css';


function Edit() {
    const [error, setError] = useState(false);
    const [questionEdit, setQuestionEdit] = useState();
    const [answerEdit, setAnswerEdit] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    const { question } = location.state;
    const { answer } = location.state;

    async function onEdit(e) {
        e.preventDefault();
        const data = { questionEdit, answerEdit };
   
        const query = new Parse.Query('Flashcard');
        try {
            const object = await query.get(id);
            object.set('question', data.questionEdit);
            object.set('answer', data.answerEdit);
            try {
                const response = await object.save();          
                console.log('Flashcard updated', response);
                navigate(-1, 
                    { state: {
                        id: id,
                        question: questionEdit,
                        answer: answerEdit,
                    }}
                );
                setError(false);
            } catch (error) {
                console.error('Error while updating Flashcard', error);
            }
        } catch (error) {
            console.error('Error while retrieving object Flashcard', error);
        }
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
