import React, { useState } from 'react';
import Parse from 'parse/dist/parse';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './Create.css';

function Create() {
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [category, setCategory] = useState();
    const owner = localStorage.getItem('userId');
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
                <input id="checkbox" type="checkbox" checked={value} onChange={onChange}/>
                {label}
            </label>
        );
    };
    
    async function onCreate(e) {
        e.preventDefault();
        setQuestion(question);
        setAnswer(answer);

        let data = { category, question, answer };
     
        if (data.category !== undefined && data.question !== undefined && data.answer !== undefined) {
            try {
                const newFlashcard = new Parse.Object('Flashcard');
                const currentUser = Parse.User.current();
                const localId = uuidv4();
                newFlashcard.set('localId', localId);
                newFlashcard.set('category', category);
                newFlashcard.set('question', question);
                newFlashcard.set('answer', answer);
                newFlashcard.set('owner', currentUser);
                currentUser.add('myCards', data = { localId, category, question, answer, owner });
                try {
                    const result = await newFlashcard.save();
                    const response = await currentUser.save();
                    console.log('User updated ', response);
                    navigate(`/my-cards/${owner}`, { replace: true });
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
