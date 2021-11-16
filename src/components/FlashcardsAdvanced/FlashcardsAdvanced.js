import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import Flashcard from '../Flashcard/Flashcard.js';
import '../FlashcardsAdvanced/FlashcardsAdvanced.css';

let finalArray = [];

async function getAdvancedCards() {
    let advancedCards = [];
    const query = new Parse.Query('Flashcard');
    query.containedIn('category', ['JS Advanced']);

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
            const check = advancedCards.includes(currentCard);
            if (!check) {
                advancedCards.push(currentCard);
                finalArray = advancedCards;
            }
        }
    } catch (err) {
        console.log(err.message)
    }

    return finalArray;
}

function FlashcardsAdvanced() {
    let [advanced, setAdvancedCards] = useState(finalArray);
    
    useEffect(() => {
        async function fetchAdData() {
            try {
                const res = await getAdvancedCards();
                setAdvancedCards(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAdData();
    }, []);

    return (
        <div className="my-list-container">
            <h2 className="my-cards-title">JS Advanced Flashcards List</h2><br />
            <div className="flashcards-container">
                {advanced.map((flashcard, index) => {
                    return <Flashcard flashcard={flashcard} key={index}></Flashcard>
                })}
            </div>
        </div>
    )
}

export default FlashcardsAdvanced;
