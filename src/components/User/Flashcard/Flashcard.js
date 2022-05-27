import { useState, useEffect } from 'react';
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


    return (
        <div id={`${id}`} className="flashcard" >
            <div className="inner">
                <div className="front">
                    <span>
                        <h2 className="front-category-info">{flashcard.category}</h2>
                        <h2 className="question">Question:</h2>
                        <h2 className="question-text">{flashcard.question}</h2>
                    </span>;
                </div>
                <div className="back">
                    <span>
                        <h2 className="question">Answer:</h2>
                        <span>
                            <h2 className="user-question">Answer:</h2>
                            <p className="user-answer">{flashcard.answer}</p>
                            <Link
                                className="details-button"
                                to={`/details/${id}`}
                                alt="Flashcard Details"
                                state={{
                                    id: id,
                                    question: flashcard.question,
                                    answer: flashcard.answer,
                                    owner: ownerName,
                                    ownerId: ownerId
                                }}
                            >Read More
                            </Link>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Flashcard;