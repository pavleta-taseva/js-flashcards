import React, { useState, useEffect } from 'react';
import './Flashcard.css';
import { Link } from 'react-router-dom';
import Parse from 'parse/dist/parse';
import 'react-loading-skeleton/dist/skeleton.css'

function Flashcard({ flashcard }) {
    const [ownerName, setOwnerName] = useState();
    let ownerId = flashcard.owner.id;
    let id = flashcard.id;

    async function getName() {
        const User = new Parse.User();
        const query = new Parse.Query(User);
        try {
            let user = await query.get(ownerId);
            const nameResult = user.get('username');
            return nameResult;
        } catch (error) {
            console.error('Error while fetching user', error);
        }
    };
    
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getName();
                setOwnerName(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
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
            alt="details"
            state={{
                id: id,
                question: flashcard.question,
                answer: flashcard.answer,
                owner: ownerName,
                ownerId: ownerId
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