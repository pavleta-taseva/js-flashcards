import React, { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import Parse from '../../../../node_modules/parse/dist/parse.js';
import '../Details/Details.css';
import { Link, useNavigate } from 'react-router-dom';
import { store } from 'react-notifications-component';


function Details() {
    const location = useLocation();
    let { id } = useParams();
    const { question } = location.state;
    const { answer } = location.state;
    let { owner } = location.state;
    let userId = '';
    const localStorageOwner = localStorage.getItem('username');
    let check = owner === localStorageOwner;
    let [currentQuestion, setCurrentQuestion] = useState(question);
    let [currentAnswer, setCurrentAnswer] = useState(answer);
    let isOwner = false;
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await updateCardDetails();
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

    function createNotification() {
        store.addNotification({
            title: "Success!",
            message: "Flashcard added to your Practice List",
            type: "info",
            insert: "top",
            container: "top",
            animationIn: ["animate__animated", "animate__zoomIn"],
            animationOut: ["animate__animated", "animate__zoomOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    (function compareUsernames() {
        if (check) {
            isOwner = true;
        } else if (owner === undefined) {
            isOwner = true;
        }
    })();

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
                {isOwner
                    ? <div></div>
                    : <div><h2 className="details-heading"><span className="details-title">Creator:</span> {`${owner}`}</h2></div>
                }
            </div>
        </div>
    )
}

export default Details;
