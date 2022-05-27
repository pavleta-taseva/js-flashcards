import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as cardService from '../../../services/cardService.js';
import { Link, useNavigate } from 'react-router-dom';

function OwnerDetails() {
    let { id } = useParams();
    let { ownerId } = useParams();
    let [currentQuestion, setCurrentQuestion] = useState('');
    let [currentAnswer, setCurrentAnswer] = useState('');
    let [currentOwner, setCurrentOwner] = useState('');
    let [currentCategory, setCurrentCategory] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const currentCard = await cardService.getCard(id);
                if (currentCard === undefined) {
                    navigate('/404', { replace: true });
                }
                const currentCardOwnerId = currentCard.owner.id;
                const ownerName = await cardService.getName(currentCardOwnerId);
                setCurrentQuestion(currentCard.question);
                setCurrentAnswer(currentCard.answer);
                setCurrentOwner(ownerName);
                setCurrentCategory(currentCard.category);
                const res = await cardService.updateCardDetails(id, ownerId);
                setCurrentQuestion(res.question);
                setCurrentAnswer(res.answer);
            } catch (err) {
                console.log(err);;
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function onDelete(e) {
        e.preventDefault();
        cardService.deleteCard(id)
        .then(result => {
            navigate(-1);
        }); 
    }

    return (
        <div className="details-container animate__animated animate__slideInRight">
            <div className="cube">
                <div className="top"></div>
                <div>
                    <span className="spanOne">{`${currentQuestion}`}</span>
                    <span className="spanTwo">{`${currentQuestion}`}</span>
                    <span className="spanThree">{`${currentQuestion}`}</span>
                    <span className="spanFour">{`${currentQuestion}`}</span>
                </div>
            </div>
            <div className="details-card">
                <h2 className="details"><span className="details-title">Flashcard Details:</span></h2>
                <h2 className="details-heading"><span className="details-title">Flashcard id:</span> {`${id}`}</h2>
                <h2 className="details-heading"><span className="details-title">Category:</span> {`${currentCategory}`}</h2>
                <h2 className="details-heading"><span className="details-title">Question:</span> {`${currentQuestion}`}</h2>
                <h2 className="details-heading"><span className="details-title">Answer:</span> {`${currentAnswer}`}</h2>
                <h2 className="details-heading"><span className="details-title">Creator:</span> {`${currentOwner}`}</h2>

                <div className="buttons">
                    <Link onClick={onDelete} className="flashcard-buttons" to={`/delete/${id}`} alt="Flashcard Trainer Delete button">Delete</Link>
                    <Link className="flashcard-buttons"
                        to={`/edit/${id}`}
                        alt="Flashcard Trainer Edit button"
                        state={{
                            id: id,
                            question: currentQuestion,
                            answer: currentAnswer,
                            ownerId: ownerId,
                            category: currentCategory,
                        }}
                    >Edit</Link>
                </div>
            </div>
        </div>
    )
}

export default OwnerDetails;
