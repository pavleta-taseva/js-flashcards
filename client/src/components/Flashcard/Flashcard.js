import '../Flashcard/Flashcard.css';
import React, { useState } from 'react';

function Flashcard( { flashcard }) {
    const [flip, setFlip] = useState(false);
    let isFavorite = false;    
    const notListed = <div className="listed-container"><ion-icon name="heart-outline"></ion-icon><h3>Add to Practice List</h3></div>;
    const listed = <div className="listed-container"><ion-icon name="heart-dislike-outline"></ion-icon><h3>Added to Practice List</h3></div>;
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
                        <div>
                            {isFavorite ? listed : notListed}
                        </div>
                        </span>
    const front =   <div className="front">
                    {questionElement}
                    </div>;
    const back =    <div className="back">
                    {answerElement}
                    </div>

    return (
        <div onClick={() => setFlip(!flip)} className={`box ${flip ? flip : ''}`}>
             { flip ? back : front }             
        </div>
    );
}

export default Flashcard;