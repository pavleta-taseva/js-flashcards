import React, { useState } from 'react';
import * as cardService from '../../../services/cardService.js';
import { useNavigate } from 'react-router-dom';
import levelPicture from '../../../images/create.png';
import notification from '../../../helpers/notification.js';
import './Create.css';

const options = [
    { value: 'JS Basics', text: 'JS Basics' },
    { value: 'JS Advanced', text: 'JS Advanced' },
    { value: 'JS Web', text: 'JS Web' },
]

function Create() {
    const [error, setError] = useState(false);
    console.log(error);
    const [validate, setValidate] = useState(false);
    const owner = localStorage.getItem('userId');
    const navigate = useNavigate();

    async function onCreate(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let category = formData.get('category');
        let question = formData.get('question');
        let answer = formData.get('answer');

        let data = { category, question, answer, owner };

        if (category !== '' || question !== '' || answer !== '') {
            setValidate(true);
            setError(false);
        } else {
            setValidate(false);
            setError(true);
            return;
        }

        if (validate === true) {
            try {
                await cardService.create(data);
                setError(false);
                navigate(`/my-cards/${owner}`, { replace: true });
            } catch (error) {
                console.log(error);
            }    
        } else {
            notification("Choose category!", "Please, fill in all fields.");
            setError(true);
        }
    }    

    return (
        <div className="create-container">
            <div className="create">
                <form onSubmit={e => onCreate(e)} className="create-form">
                    <h1>Create your own Flashcard</h1>
                    <label className="create-form-label" htmlFor="category">Select category:</label><br />
                    <span className="category-select">
                        <select name="category" id="category" defaultValue={options[1]}>
                            {options.map(x => <option key={x.value} value={x.value}>{x.text}</option>)}
                        </select>
                    </span>
                    <div>
                        <label className="create-form-label">Write a question: </label><br></br>
                        <textarea id="question" placeholder="Enter question" name="question"></textarea>
                    </div>
                    <div>
                        <label className="create-form-label">Provide an answer: </label><br></br>
                        <textarea id="answer" placeholder="Enter answer" name="answer"></textarea>
                    </div>
                    <button className="createBtn" type="submit">Create</button>
                </form>
            </div>
            <div className='level-info'>
                <h2>Flashcard Creation</h2>
                <ul>
                    <li>Please create new flashcards with care and responsibility. Remember that other people will see their content as well as the name of their creator...</li>
                    <li>Create more and more cards and see how your personal level grows.</li>
                    <li> For every 5 cards created, your title will change.</li>
                    <li>You can see the current level you have been awarded on your personal profile page.</li>
                    <li>Current maximum level is 100 - High Emperor - the one who rules our World of JavaScript! <i class="fas fa-crown"></i></li>
                </ul>
                <img className="create-image" src={levelPicture} alt="Create new flashcard" />
            </div>
        </div>
    )
}

export default Create;
