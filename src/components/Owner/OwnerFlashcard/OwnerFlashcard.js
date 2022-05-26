import { Link } from 'react-router-dom';

function OwnerFlashcard({ ownerFlashcard }) {

    return (
        <div id={`${ownerFlashcard.id}`} className="flashcard" >
            <div className="inner">
                <div className="front">
                    <span>
                        <h2 className="front-category-info">{ownerFlashcard.category}</h2>
                        <h2 className="question">Question:</h2>
                        <h2 className="question-text">{ownerFlashcard.question}</h2>
                    </span>;
                </div>
                <div className="back">
                    <span>
                        <h2 className="question">Answer:</h2>
                        <span>
                            <h2 className="user-question">Answer:</h2>
                            <p className="user-answer">{ownerFlashcard.answer}</p>
                            <Link
                                className="details-button"
                                to={`/details/${ownerFlashcard.objectId}`}
                                alt="details"
                                state={{
                                    id: ownerFlashcard.objectId,
                                    question: ownerFlashcard.question,
                                    answer: ownerFlashcard.answer,
                                    owner: ownerFlashcard.ownerName,
                                    ownerId: ownerFlashcard.objectId
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

export default OwnerFlashcard;