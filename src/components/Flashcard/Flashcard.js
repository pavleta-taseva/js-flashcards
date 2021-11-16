import React from 'react';
import '../Flashcard/Flashcard.css';
import { Link } from 'react-router-dom';
import { getOwner } from '../../api/data.js';


function Flashcard({ flashcard }) {
    const flashcardId = flashcard._id;
    async function getCurrentOwner() {
        let owner = await getOwner(flashcardId);
        console.log(owner);
    }
    getCurrentOwner();
    let isFavorite = false;
    const notListed = <div className="listed-container"><Link className="listed-link" to={`/practice-list/${flashcard.id}`}><ion-icon name="add-circle-outline"></ion-icon>Add to Practice List</Link></div>;

    const listed = <div className="listed-container"><ion-icon name="add-circle-outline"></ion-icon><h3>Added to Practice List</h3></div>;

    const questionElement = <span>
        <h2 className="question">Question:</h2>
        <h2>{flashcard.question}</h2>
        <div>
            {isFavorite ? listed : notListed}
        </div>
    </span>;

    const answerElement = <span>
        <h2 className="question">Answer:</h2>
        <p className="answer">{flashcard.answer}</p>
        <Link className="details-button" to={`/details/${flashcard.id}`}>Read More</Link>
        <div className="buttons">
            <Link className="flashcard-buttons" to={`/delete/${flashcard.id}`}>Delete</Link>
            <Link className="flashcard-buttons"
                to={{
                    pathname: `/edit/${flashcard.id}`,
                    state: {
                        flashcard: flashcard
                    }
                }}>
                Edit</Link>
        </div>
        <div>
            {isFavorite ? listed : notListed}
        </div>
    </span>
    
    const cover = <div className="cover">
        {questionElement}
    </div>;
    const details = <div className="details">
        {answerElement}
    </div>

    return (
        <div className="card">
            {cover}
            {details}
        </div>
    );
}

export default Flashcard;