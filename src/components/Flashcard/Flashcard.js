import React from 'react';
import Parse from '../../../node_modules/parse/dist/parse.js';
import '../Flashcard/Flashcard.css';
import { Link } from 'react-router-dom';
let isFavorite = false;

async function practice(e) {
    e.preventDefault();
    try {
        console.log('It works!');
        isFavorite = true;
        const Flashcard = Parse.Object.extend('Flashcard');
        const query = new Parse.Query(Flashcard);
        let result = await query.get('objectId', { key: true });
      
        // console.log(currentCard);
        // const data = { flashcard }
        // const currentUser = Parse.User.current();
        // currentUser.add('myCards', data);   
        console.log(result);
    } catch(err) {
        console.log(err.message)
    }
}

function Flashcard({ flashcard }) {
    const flashcardInfo = flashcard;
    const id = flashcard.id;
    let owner = JSON.stringify(flashcardInfo.owner);
    const notListed = <div className="listed-container"><Link onClick={practice} className="listed-link" to={`/practice-list/${id}`}><ion-icon name="add-circle-outline"></ion-icon>Add to Practice List</Link></div>;

    const listed = <div className="listed-container"><ion-icon name="add-circle-outline"></ion-icon><h3>Added to Practice List</h3></div>;
    const questionElement = <span>
        <h2 className="question">Question:</h2>
        <h2>{flashcardInfo.question}</h2>
        <div>
            {isFavorite ? listed : notListed}
        </div>
    </span>;

    const answerElement = <span>
        <h2 className="question">Answer:</h2>
        <p className="answer">{flashcardInfo.answer}</p>
        <Link 
            className="details-button" 
            to={`/details/${id}`}
            state={{
                id: id,
                question: flashcardInfo.question,
                answer: flashcardInfo.answer,
                owner: owner
            }}
            >Read More
        </Link>

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
    console.log(id);
    return (
        <div id={`${id}`} className="card">
            {cover}
            {details}
        </div>
    );
}

export default Flashcard;