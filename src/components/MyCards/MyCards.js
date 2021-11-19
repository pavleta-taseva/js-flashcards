import React, { useState, useEffect } from "react"
import Parse from '../../../node_modules/parse/dist/parse.js';
import FlashcardList from '../FlashcardList/FlashcardList.js';
import { Link } from 'react-router-dom';
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
            {cards.length > 0
                ? <FlashcardList flashcards={cards}/>
                : <div className="no-cards">
                    <div>
                        <h1 className="no-cards-heading">No Flashcards in this category yet.</h1>
                    </div>
                    <div>
                        <h1 className="no-cards-heading">Be the first one! <Link className="links" to='/flashcards/create'>Create</Link> a flashcard yourself!</h1>
                    </div>
                </div>
            }
        </div>
    )
}

export default MyCards;
