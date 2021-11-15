import React, { useState } from 'react';
import Parse from '../../../node_modules/parse/dist/parse.js';
import { useNavigate } from 'react-router-dom';
import '../Create/Create.css';

function Create() {
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [category, setCategory] = useState();
    const owner = localStorage.getItem('userId');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);
    const [checkedThree, setCheckedThree] = useState(false);
    const categories = ['JS Basics', 'JS Advanced', 'JS Web'];

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
                <input type="checkbox" checked={value} onChange={onChange}/>
                {label}
            </label>
        );
    };
    
    async function onCreate(e) {
        e.preventDefault();
        setQuestion(question);
        setAnswer(answer);

        const data = { category, question, answer };
        console.log(data);
        if (data.category !== undefined && data.question !== undefined && data.answer !== undefined) {
            try {
                const newFlashcard = new Parse.Object('Flashcard');
                const currentUser = Parse.User.current();
                newFlashcard.set('category', category);
                newFlashcard.set('question', question);
                newFlashcard.set('answer', answer);
                newFlashcard.set('owner', currentUser);
                try {
                    const result = await newFlashcard.save();
                    setError(false);
                    navigate(`/my-cards/${owner}`, { replace: true });
                    // Access the Parse Object attributes using the .GET method
                    console.log('Flashcard created', result);
                } catch (error) {
                    console.error('Error while creating Flashcard: ', error);
                }
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    return (
        <div className="create-container">
            <div className="create">
                <form onSubmit={e => onCreate(e)} className="create-form">
                    <h1>Create your own Flashcard</h1>
                    <label>Choose category:</label><br></br>
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
                    <label>Question: </label><br></br>
                    <textarea placeholder="Enter question" name="question" onChange={e => setQuestion(e.target.value)}>{question}</textarea>
                    </div>
                    <div>
                    <label>Answer: </label><br></br>
                    <textarea placeholder="Enter answer" name="answer" onChange={e => setAnswer(e.target.value)}>{answer}</textarea>
                    </div>
                    <button className="createBtn" type ="submit">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Create;
