import React, { useState } from 'react';
import '../Flashcard/Flashcard.css';
import { Link } from 'react-router-dom';
import Parse from '../../../node_modules/parse/dist/parse.js';

let id = '';

function Flashcard({ flashcard }) {
    console.log(flashcard);

    const [ownerName, setOwnerName] = useState();
    const owner = flashcard.owner;
    const ownerId = owner.id;
    console.log(ownerId);
    const localId = flashcard.localId;
    id = flashcard.id;
    if (id === undefined) {
        id = localId;
    }

    (async () => {
        const User = new Parse.User();
        const query = new Parse.Query(User);
        try {
          let user = await query.get(ownerId);
          const nameResult = user.get('username');
          setOwnerName(nameResult);
        } catch (error) {
          console.error('Error while fetching user', error);
        }
      })();

    const questionElement = <span>
        <h2 className="question">Question:</h2>
        <h2>{flashcard.question}</h2>
    </span>;

    const answerElement = <span>
        <h2 className="question">Answer:</h2>
        <p className="answer">{flashcard.answer}</p>
        <Link
            className="details-button"
            to={`/details/${id}`}
            state={{
                id: id,
                localId: localId,
                question: flashcard.question,
                answer: flashcard.answer,
                owner: ownerName
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
        <div id={`${id}`} className="card" >
            {cover}
            {details}
        </div>
    );
}

export default Flashcard;