import React from 'react'
import Flashcard from '../User/Flashcard/Flashcard.js';
import '../FlashcardList/FlashcardList.css';

function FlashcardList({ flashcards }) {
    return (
        <div>
            <div className="flashcards-list-container">

                <div className="flashcards-wrapper">
                    <div className="flashcards-container">
                        {flashcards?.map((flashcard, index) => {
                            return <Flashcard flashcard={flashcard} key={index}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
        )
}

export default FlashcardList
