import { Link } from 'react-router-dom';

function Flashcard() {
    return (
        <div className="flashcard-container">
            <h1 className='flashcard-title'>Demo Flashcard</h1>
            <h4 className='flashcard-text'><ion-icon name="color-wand-outline"></ion-icon> Hover over (Click) the flashcard to reveal functionality</h4>

            <div className="flashcard" >
                <div className="inner">
                    <div className="front">
                        <span>
                            <h2 className="question">Question:</h2>
                            <h2>What is JavaScript?</h2>
                        </span>;
                    </div>
                    <div className="back">
                        <span>
                            <h2 className="question">Answer:</h2>
                            <div className="answer">Programming language with first-class functions. Main characteristics:
                                <ul>
                                    <li>- prototype-based</li>
                                    <li>- multi-paradigm</li>
                                    <li>- single-threaded</li>
                                    <li>- dynamic language</li>
                                    <li>- supporting object-oriented, imperative, and declarative styles</li>
                                </ul>
                            </div>
                            <Link
                                className="details-button"
                                to="#"
                                alt=""
                            >Details
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Flashcard;