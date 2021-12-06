import React, { useState, useEffect } from 'react';
import './Flashcard.css';
import { Link, useParams } from 'react-router-dom';
import * as cardService from '../../../services/cardService.js';

function Flashcard({ flashcard }) {
    const [ownerName, setOwnerName] = useState();
    let { ownerId } = useParams();
    let id = flashcard.id;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await cardService.getName(ownerId);
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