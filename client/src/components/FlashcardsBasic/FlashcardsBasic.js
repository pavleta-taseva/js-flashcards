import '../FlashcardsBasic/FlashcardsBasic.css';
import React, { useState } from 'react';
import FlashcardList from '../FlashcardList/FlashcardList.js';

function FlashcardBasic() {
    const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
    return (
        <FlashcardList flashcards={flashcards} />
    )
}

const SAMPLE_FLASHCARDS = [
    {
        id: 1,
        category: "JS Basics",
        question: "What is CSS",
        answer: "CSS stands for Cascading Style Sheets · CSS describes how HTML elements are to be displayed on screen, paper, or in other media."
    },
    {
        id: 2,
        category: "JS Basics",
        question: "What is HTTP",
        answer: "CSS stands for Cascading Style Sheets · CSS describes how HTML elements are to be displayed on screen, paper, or in other media."
    },
    {
        id: 3,
        category: "JS Basics",
        question: "What is Java",
        answer: "CSS stands for Cascading Style Sheets · CSS describes how HTML elements are to be displayed on screen, paper, or in other media."
    }
]

export default FlashcardBasic
