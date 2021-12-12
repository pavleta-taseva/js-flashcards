import React, { useState } from 'react';
import * as cardService from '../../../services/cardService.js';
import { useNavigate } from 'react-router-dom';
import './Create.css';

function Create() {
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [category, setCategory] = useState();
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);
    const [checkedThree, setCheckedThree] = useState(false);
    const categories = ['JS Basics', 'JS Advanced', 'JS Web'];
    const owner = localStorage.getItem('userId');
    const navigate = useNavigate();

    const handleChangeOne = (e) => {
        setCheckedOne(!checkedOne);
        setCategory(categories[0]);
    };

    const handleChangeTwo = (e) => {
        setCheckedTwo(!checkedTwo);
        setCategory(categories[1]);
    };

    const handleChangeThree = (e) => {
        setCheckedThree(!checkedThree);
        setCategory(categories[2]);
    };

    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label>
                <input id="checkbox" type="checkbox" checked={value} onChange={onChange}/>
                {label}
            </label>
        );
    };
    
      async function onCreate(e) {
        e.preventDefault();
        setQuestion(question);
        setAnswer(answer);

        let data = { category, question, answer, owner };
        cardService.create(data)
        .then(result => {
            navigate(`/my-cards/${owner}`, { replace: true });
        })
    }

    return (
        <div className="create-container">
            <div className="create">
                <form onSubmit={e => onCreate(e)} className="create-form">
                    <h1>Create your own Flashcard</h1>
                    <label className="create-form-label">Choose category:</label><br></br>
                    <div>
                        <Checkbox
                        label="JS Basics"
                        value={checkedOne}
                        onChange={handleChangeOne}
                        />
                        <Checkbox
                        label="JS Advanced"
                        value={checkedTwo}
                        onChange={handleChangeTwo}
                        />
                        <Checkbox
                        label="JS Web"
                        value={checkedThree}
                        onChange={handleChangeThree}
                        />
                    </div>
                    <div>
                    <label className="create-form-label">Question: </label><br></br>
                    <textarea id="question" placeholder="Enter question" name="question" onChange={e => setQuestion(e.target.value)}>{question}</textarea>
                    </div>
                    <div>
                    <label className="create-form-label">Answer: </label><br></br>
                    <textarea id="answer" placeholder="Enter answer" name="answer" onChange={e => setAnswer(e.target.value)}>{answer}</textarea>
                    </div>
                    <button className="createBtn" type ="submit">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Create;
