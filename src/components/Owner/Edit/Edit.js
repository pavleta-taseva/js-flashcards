import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import notification from '../../../helpers/notification.js';
import * as cardService from '../../../services/cardService.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import './Edit.css';

const options = [
    { value: 'JS Basics', text: 'JS Basics' },
    { value: 'JS Advanced', text: 'JS Advanced' },
    { value: 'JS Web', text: 'JS Web' },
]

function Edit() {
    const { user } = useAuth();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [validate, setValidate] = useState(false);
    const [questionEdit, setQuestionEdit] = useState();
    const [answerEdit, setAnswerEdit] = useState();
    const [categoryEdit, setCategoryEdit] = useState();
    const { id } = location.state;
    const { question } = location.state;
    const { answer } = location.state;
    const navigate = useNavigate();

    async function onEdit(e) {
        e.preventDefault();
        const data = { questionEdit, answerEdit, categoryEdit };

        if (validate === false) {
            cardService.onEdit(id, data)
                .then(result => {
                    navigate(-1,
                        {
                            state: {
                                id: id,
                                question: questionEdit,
                                answer: answerEdit,
                                category: categoryEdit
                            }
                        }
                    );
                    setError(false);
                })
        } else {
            notification("Error!", "Please fill in all fields first");
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
                <label className="create-form-label" htmlFor="category">Edit Category:</label><br />
                <span className="category-select">
                    <select name="category" id="category" defaultValue={options[1]} onChange={e => setCategoryEdit(e.target.value)} >
                        {options.map(x => <option key={x.value} value={x.value}>{x.text}</option>)}
                    </select>
                </span>
                <div>
                    <label className="create-form-label" htmlFor={question}>Update Question:</label><br></br>
                    <textarea id="question-area" placeholder="Edit question" name="question" defaultValue={question} onChange={e => setQuestionEdit(e.target.value)} onBlur={fieldValidation} style={{ borderColor: validate.question ? '#ff2ae0' : 'inherit' }}></textarea>
                </div>
                <div>
                    <label className="create-form-label" htmlFor={answer}>Update Answer:</label><br></br>
                    <textarea id="answer-area" placeholder="Edit answer" name="answer" defaultValue={answer} onChange={e => setAnswerEdit(e.target.value)} onBlur={fieldValidation} style={{ borderColor: validate.answer ? '#ff2ae0' : 'inherit' }}></textarea>
                </div>
                <button className="editBtn" type="submit">Edit</button>
                <button onClick={cancel} className="editBtn">Cancel</button>
            </form>
        </div>
    )
}

export default Edit;
