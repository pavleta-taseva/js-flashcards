import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import '../FlashcardsAdvanced/FlashcardsAdvanced.css';
import FlashcardList from '../FlashcardList/FlashcardList.js';

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
    
    console.log(advanced);
    return (
        <div>
            <FlashcardList flashcards={advanced} />
        </div>
    )
}

export default FlashcardsAdvanced;
