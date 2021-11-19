import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Parse from '../../../node_modules/parse/dist/parse.js';
import '../FlashcardsWeb/FlashcardsWeb.css';
import FlashcardList from '../FlashcardList/FlashcardList.js';

let finalArray = [];

async function getWebCards() {
    let webCards = [];
    const query = new Parse.Query('Flashcard');
    query.containedIn('category', ['JS Web']);
    
    try {
        const results = await query.find();
        for (let object of results) {
            const id = object.id;
            const category = object.get('category');
            const question = object.get('question');
            const answer = object.get('answer');
            const owner = object.get('owner');

            const currentCard = {
                id,
                category,
                question,
                answer,
                owner
            }
            const check = webCards.includes(currentCard);
            if (!check) {
                webCards.push(currentCard);
                finalArray = webCards;
            }
        };
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }
    return finalArray;
}
function FlashcardsWeb() {
    let [web, setWebCards] = useState(finalArray);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getWebCards();
                setWebCards(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    console.log(web);
    return (
        <div>
            {web.length > 0
                ? <FlashcardList flashcards={web} />
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

export default FlashcardsWeb;
