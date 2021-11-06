import '../FlashcardsWeb/FlashcardsWeb.css';
import Flashcard from '../Flashcard/Flashcard.js';

function FlashcardsWeb() {
    return (
        <div className="flashcards-wrapper">
            <h1>Show us what you got!</h1>
            <h3>Pick a card and try to answer it. Then reveal it in order to see the correct answer.</h3>
            <div className="flashcards-container">
                <Flashcard />
                <Flashcard />
                <Flashcard />
            </div>
        </div>
    )
}

export default FlashcardsWeb;
