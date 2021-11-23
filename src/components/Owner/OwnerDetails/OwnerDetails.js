import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Parse from '../../../../node_modules/parse/dist/parse.js';
import './OwnerDetails.css';
import { Link, useNavigate } from 'react-router-dom';

function OwnerDetails() {
    const location = useLocation();
    let { id } = location.state;
    const { question } = location.state;
    const { answer } = location.state;
    let { owner } = location.state;
    let [currentQuestion, setCurrentQuestion] = useState(question);
    let [currentAnswer, setCurrentAnswer] = useState(answer);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await updateCardDetails();
                console.log(res);
                setCurrentQuestion(res.question);
                setCurrentAnswer(res.answer);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function updateCardDetails() {
        const Flashcard = Parse.Object.extend('Flashcard');
        const query = new Parse.Query(Flashcard);
        try {
            const results = await query.find();
            for (const object of results) {
                const question = object.get('question');
                const answer = object.get('answer');
                let currentOwner = object.get('owner');
                owner = currentOwner;
                const updatedCard = {
                    question,
                    answer,
                    owner
                }
                return updatedCard;
            }
        } catch (error) {
            console.error('Error while fetching Flashcard', error);
        }
    }

    async function onDelete() {
        const query = new Parse.Query('Flashcard');
        try {
            const object = await query.get(id);
            try {
                const response = await object.destroy();
                // const currentUser = Parse.User.current();
                // currentUser.remove('myCards', object);
                navigate('/', { replace: true });
                console.log('Deleted ParseObject', response);
            } catch (error) {
                console.error('Error while deleting ParseObject', error);
            }
        } catch (error) {
            console.error('Error while retrieving ParseObject', error);
        }
    };

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

                <div className="buttons">
                    <Link onClick={onDelete} alt="delete-page" className="flashcard-buttons" to={`/delete/${id}`}>Delete</Link>
                    <Link className="flashcard-buttons"
                        to={`/edit/${id}`}
                        alt="edit-page"
                        state={{
                            id: id,
                            question: currentQuestion,
                            answer: currentAnswer
                        }}
                    >Edit</Link>
                </div>
            </div>
        </div>
    )
}

export default OwnerDetails;
