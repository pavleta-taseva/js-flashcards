import '../DemoFlashcard/DemoFlashcard.css';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'

function Flashcard() {
    const questionElement = <span>
        <h2 className="question">Question:</h2>
        <h2>What is JavaScript?</h2>
    </span>;

    const answerElement = <span>
        <h2 className="question">Answer:</h2>
        <p className="answer">Programming language with first-class functions. Main characteristics:
            <ul>
                <li>prototype-based</li>
                <li>multi-paradigm</li>
                <li>single-threaded</li>
                <li>dynamic language</li>
                <li>supporting object-oriented, imperative, and declarative styles</li>
            </ul>
        </p>
        <Link
            className="details-button"
            to="#"
        >Details
        </Link>
    </span>

    const cover = <div className="cover">
        {questionElement}
    </div>;
    const details = <div className="details">
        {answerElement}
    </div>

    return (
        <div className="card" >
            {cover}
            {details}
        </div>
    );
}

export default Flashcard;