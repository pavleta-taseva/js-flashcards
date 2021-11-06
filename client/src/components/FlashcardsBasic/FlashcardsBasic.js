import '../FlashcardsBasic/FlashcardsBasic.css';
import Flashcard from '../Flashcard/Flashcard.js';

function FlashcardBasic() {
    return (
        <div className="flashcards-wrapper">
            <h1>Ready to test your skills in JavaScript basic terminology?</h1>
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

export default FlashcardBasic