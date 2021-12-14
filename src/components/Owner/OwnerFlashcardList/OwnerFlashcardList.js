import React from 'react'
import OwnerFlashcard from '../OwnerFlashcard/OwnerFlashcard.js';
import './OwnerFlashcardList.css';

function OwnerFlashcardList({ flashcards }) {
    return (
        <div>
            <div className="flashcards-list-container">
                <div className="flashcards-wrapper">
                    <div className="flashcards-container">
                        {flashcards?.map((ownerFlashcard, index) => {
                            return <OwnerFlashcard ownerFlashcard={ownerFlashcard} key={index} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerFlashcardList;
