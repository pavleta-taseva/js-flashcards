import '../FlashcardsAdvanced/FlashcardsAdvanced.css';
import Flashcard from '../Flashcard/Flashcard.js';

function FlashcardAdvanced() {
    return (
        <div className="flashcards-wrapper">
            <h1>Let's see what did you learn about the JavaScript advanced terminology!</h1>
            <h3>Pick a card and try to answer it. Then reveal it in order to see the correct answer.</h3>
            <h3>If you feel like you need to practice this question more than once, just add it your Practice List by clicking the <ion-icon name="heart-outline"></ion-icon> icon.</h3>
            <div className="flashcards-container">
                <Flashcard />
                <Flashcard />
                <Flashcard />
            </div>
        </div>
    )
}

export default FlashcardAdvanced;
