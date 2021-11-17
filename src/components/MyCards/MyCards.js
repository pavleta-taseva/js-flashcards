import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import Parse from '../../../node_modules/parse/dist/parse.js';
import Flashcard from '../Flashcard/Flashcard.js';
import FlashcardList from '../FlashcardList/FlashcardList.js';
import '../MyCards/MyCards.css';

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
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }
    return myCards;
}

function MyCards() {
    let [cards, setCards] = useState(myCards);

    useEffect(() => {
        async function fetchWebData() {
            try {
                const res = await getMyCards();
                setCards(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchWebData();
    }, []);
    
    return (
        <div>
            <FlashcardList flashcards={cards} />
        </div>
    )
}

export default MyCards;
