import React, { useState, useEffect } from "react"
import Parse from '../../../node_modules/parse/dist/parse.js';
import { useNavigate } from 'react-router-dom';
import { getMyItem } from '../../api/data.js';
import Flashcard from '../Flashcard/Flashcard.js';
import '../Create/Create.css';
let myCards = [];

async function getMyCards() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    const userId = localStorage.getItem('userId');
    try {
        let user = await query.get(userId);
        const attributes = user.attributes;
        const array = Object.entries(attributes);
        const userArray = array[6];
        myCards = userArray[1];
        // myCards = new Array(array[6]);    
        // console.log(myCards[0]);    
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }
    return myCards;
}

function MyCards() {
    const [cards, setCards] = useState(myCards);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getMyCards();
                setCards(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="my-list-container">
            <h2>My Flashcards</h2><br />
            <div className="flashcards-container">
                {cards.map(flashcard => {
                    return <Flashcard flashcard={flashcard} key={flashcard.id} />
                })}
            </div>
        </div>
    )
}

export default MyCards;
