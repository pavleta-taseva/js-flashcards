import React from 'react';
import '../OwnerFlashcard/OwnerFlashcard.css';
import { Link } from 'react-router-dom';

function OwnerFlashcard({ ownerFlashcard }) {
    console.log(ownerFlashcard);
    const questionElement = <span>
        <h2 className="question">Question:</h2>
        <h2>{ownerFlashcard.question}</h2>
    </span>;

    const answerElement = <span>
        <h2 className="question">Answer:</h2>
        <p className="answer">{ownerFlashcard.answer}</p>
        <Link
            className="details-button"
            to={`/details/${ownerFlashcard.owner.objectId}/${ownerFlashcard.objectId}`}
            alt="details"
            state={{
                id: ownerFlashcard.id,
                question: ownerFlashcard.question,
                answer: ownerFlashcard.answer,
                owner: ownerFlashcard.owner.username
            }}
        >Details
        </Link>
    </span>

    const cover = <div className="cover">
        {questionElement}
    </div>;
    const details = <div className="details">
        {answerElement}
    </div>

    return (
        <div className="card" >
            {cover}
            {details}
        </div>
    );
}

export default OwnerFlashcard;