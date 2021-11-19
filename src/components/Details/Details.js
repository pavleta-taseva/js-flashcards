import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Parse from '../../../node_modules/parse/dist/parse.js';
import '../Details/Details.css';
import { Link, useNavigate } from 'react-router-dom';


function Details() {
    let isOwner = false;
    const location = useLocation();
    const { id } = location.state;
    const { question } = location.state;
    const { answer } = location.state;
    let { owner } = location.state;
    const localStorageOwner = localStorage.getItem('username');
    let check = owner === localStorageOwner;
    const navigate = useNavigate();
    let [currentQuestion, setCurrentQuestion] = useState(question);
    let [currentAnswer, setCurrentAnswer] = useState(answer);

    (function compareUsernames() {
       if (check) {
           isOwner = true;
       }
    })();

    async function onDelete() {
        const query = new Parse.Query('Flashcard');
        try {
            // here you put the objectId that you want to delete
            const object = await query.get(id);
            try {
                const response = await object.destroy();
                navigate('/', { replace: true })
                console.log('Deleted ParseObject', response);
            } catch (error) {
                console.error('Error while deleting ParseObject', error);
            }
        } catch (error) {
            console.error('Error while retrieving ParseObject', error);
        }
    };

    async function practice(e) {
        e.preventDefault();
        const Flashcard = Parse.Object.extend('Flashcard');
        const query = new Parse.Query(Flashcard);
        query.equalTo('objectId', id);
        try {
            const currentCard = await query.get(id);
            const currentUser = Parse.User.current();
            const practiceList = currentUser.get('practiceList');
            console.log(practiceList);
            currentUser.add('practiceCards', currentCard);
            console.log('Card added to the Practice list');
            await currentUser.save();
        } catch (err) {
            console.log(err.message)
        }
    }

    // const notListed = <div className="listed-container"><Link className="listed-link" to={`/practice-list/${id}`}><ion-icon name="add-circle-outline"></ion-icon>Add to Practice List</Link></div>;

    // const listed = <div className="listed-container"><ion-icon name="add-circle-outline"></ion-icon><h3>Added to Practice List</h3></div>;
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
                {isOwner
                    ? <div className="buttons">
                        <Link onClick={onDelete} className="flashcard-buttons" to={`/delete/${id}`}>Delete</Link>
                        <Link className="flashcard-buttons"
                            to={`/edit/${id}`}
                            state={{
                                id: id,
                                question: question,
                                answer: answer
                            }}
                        >Edit</Link>
                    </div>
                    : <div className="buttons">
                        <Link onClick={practice} className="flashcard-buttons" to={`/practice-list/${id}`}>Practice</Link>
                    </div>
                }

            </div>
        </div>
    )
}

export default Details;
