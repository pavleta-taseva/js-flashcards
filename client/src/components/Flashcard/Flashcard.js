import '../Flashcard/Flashcard.css';

function Flashcard() {
    let isFavorite = false;
    const notListed = <div className="listed-container"><ion-icon name="heart-outline"></ion-icon><h3>Add to Practice List</h3></div>;
    const listed = <div className="listed-container"><ion-icon name="heart-dislike-outline"></ion-icon><h3>Added to Practice List</h3></div>;

    return (
        <div className="box">
            <span>
                <h1 className="question">Question:</h1>
                <h1>What is HTTP?</h1>
                <div>
                    {isFavorite ? listed : notListed}
                </div>
            </span>
        </div>
    );
}

export default Flashcard;