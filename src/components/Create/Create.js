import React from 'react';
import '../Create/Create.css';

function Edit() {
    return (
        <div className="create-container">
            <div className="create">
                <form className="create-form" action="/flashcards/create" method="POST">
                    <h1>Create your own Flashcard</h1>
                    <div>
                        <label>Choose category:</label><br></br>
                        <select className="category-name" name="category">
                            <option value="JS Basics">JS Basics</option>
                            <option value="JS Advanced">JS Advanced</option>
                            <option value="JS Web">JS Web</option>
                        </select>
                    </div>
                    <div>
                        <label>Question:</label><br></br>
                        <textarea placeholder="Enter question" name="question"></textarea>
                    </div>
                    <div>
                        <label>Answer:</label><br></br>
                        <textarea placeholder="Enter answer" name="answer"></textarea>
                    </div>
                    <button className="createBtn" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Edit;
