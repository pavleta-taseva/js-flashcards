import React, { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import * as cardService from '../../../services/cardService.js';
import './OwnerDetails.css';
import { Link, useNavigate } from 'react-router-dom';

function OwnerDetails() {

    const location = useLocation();
    const { question } = location.state;
    const { answer } = location.state;
    let { owner } = location.state;
    let { id } = useParams();
    let { ownerId } = useParams();
    let [currentQuestion, setCurrentQuestion] = useState(question);
    let [currentAnswer, setCurrentAnswer] = useState(answer);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await cardService.updateCardDetails(id, owner);
                setCurrentQuestion(res.question);
                setCurrentAnswer(res.answer);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function onDelete(e) {
        e.preventDefault();
        cardService.deleteCard(id)
        .then(result => {
            navigate(-1);
        })
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
                <h2 className="details-heading"><span className="details-title">Question:</span> {`${currentQuestion}`}</h2>
                <h2 className="details-heading"><span className="details-title">Answer:</span> {`${currentAnswer}`}</h2>
                <h2 className="details-heading"><span className="details-title">Creator:</span> {`${owner}`}</h2>

                <div className="buttons">
                    <Link onClick={onDelete} alt="delete-page" className="flashcard-buttons" to={`/delete/${id}`}>Delete</Link>
                    <Link className="flashcard-buttons"
                        to={`/edit/${id}`}
                        alt="edit-page"
                        state={{
                            id: id,
                            question: currentQuestion,
                            answer: currentAnswer,
                            ownerId: ownerId
                        }}
                    >Edit</Link>
                </div>
            </div>
        </div>
    )
}

export default OwnerDetails;
