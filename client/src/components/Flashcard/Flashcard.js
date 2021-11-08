import '../Flashcard/Flashcard.css';
import { Link } from 'react-router-dom';

function Flashcard({ flashcard }) {
    let isFavorite = false;
    const notListed = <div className="listed-container"><Link className="listed-link" to={`/practice-list/${flashcard.id}`}><ion-icon name="add-circle-outline"></ion-icon>Add to Practice List</Link></div>;

    const listed = <div className="listed-container"><ion-icon name="add-circle-outline"></ion-icon><h3>Added to Practice List</h3></div>;
    const questionElement = <span>
        <h2 className="question">Question:</h2>
        <h2>{flashcard.question}</h2>
        <div>
            {isFavorite ? listed : notListed}
        </div>
    </span>;
    const answerElement = <span>
        <h2 className="question">Answer:</h2>
        <p className="answer">{flashcard.answer}        <Link className="flashcard-buttons" to={`/details/${flashcard.id}`}>Read More</Link></p>
        <div className="buttons">
            <Link className="flashcard-buttons" to={`/delete/${flashcard.id}`}>Delete</Link>
            <Link className="flashcard-buttons" to={`/edit/${flashcard.id}`}>Edit</Link>
        </div>
        <div>
            {isFavorite ? listed : notListed}
        </div>
    </span>
    const cover = <div className="cover">
        {questionElement}
    </div>;
    const details = <div className="details">
        {answerElement}
    </div>

    return (
        <div className="card">
            {cover}
            {details}
        </div>
    );
}

export default Flashcard;