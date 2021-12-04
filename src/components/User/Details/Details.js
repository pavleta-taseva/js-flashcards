import React, { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import * as cardService from '../../../services/cardService.js';
import { Link, useNavigate } from 'react-router-dom';
import '../Details/Details.css';

function Details() {
    const location = useLocation();
    const { question } = location.state;
    const { answer } = location.state;
    let { owner } = location.state;
    let { ownerId } = location.state;
    let { id } = useParams();
    let [currentQuestion, setCurrentQuestion] = useState(question);
    let [currentAnswer, setCurrentAnswer] = useState(answer);
    const localStorageOwnerId = localStorage.getItem('userId');
    let check = ownerId === localStorageOwnerId;
    const navigate = useNavigate();
    const [add, setAdd] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await cardService.updateCardDetails(id, owner);
                let foundCard = await cardService.checkIfInPracticeList(id, owner);
                if (foundCard) {
                    setAdd(true);
                }
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
        await cardService.deleteCard(id)
            .then(result => {
                navigate(-1);
            })
    }

    async function onRemove(e) {
        e.preventDefault();

        await cardService.removeCardFromPractice(id, localStorageOwnerId)
            .then(result => {
                navigate(-1);
            })
    }

    if (owner === undefined) {
        owner = 'Unknown';
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
                <div><h2 className="details-heading"><span className="details-title">Creator:</span> {`${owner}`}</h2></div>
                {check
                    ? <div className="buttons">
                        <Link 
                            onClick={onDelete} 
                            alt="delete-page" 
                            className="flashcard-buttons" 
                            to={`/delete/${id}`}
                            >Delete
                        </Link>
                        <Link 
                            className="flashcard-buttons"
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
                    : <div>
                        {add
                            ? <div className="buttons">
                                <Link
                                    className="button-disabled"
                                    to={`/details/${id}`}
                                    alt="details"
                                    disabled={true}
                                    state={{
                                        id: id,
                                        question: currentQuestion,
                                        answer: currentAnswer,
                                        ownerId: ownerId
                                    }}
                                >Card already in the List
                                </Link>
                                <Link
                                onClick={onRemove}
                                    className="button-remove"
                                    to={`/practice/${ownerId}`}
                                    alt="practice-list"
                                >Remove card from practice
                                </Link>
                            </div>
                            : <div className="buttons">
                                <Link
                                    className="flashcard-buttons"
                                    to={`/practice/${localStorageOwnerId}`}
                                    alt="practice"
                                    onClick={() => {
                                        cardService.practice(id);
                                    }}
                                >Practice
                                </Link>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Details;
