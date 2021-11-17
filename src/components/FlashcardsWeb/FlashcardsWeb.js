import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import '../FlashcardsWeb/FlashcardsWeb.css';
import FlashcardList from '../FlashcardList/FlashcardList.js';

let finalArray = [];

async function getWebCards() {
    let webCards = [];
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('category', 'JS Web');
    try {
        const results = await query.find();
        for (const object of results) {
            const category = object.get('category')
            const question = object.get('question')
            const answer = object.get('answer')
            const owner = object.get('owner')
            const currentCard = {
                category,
                question,
                answer,
                owner
            }
            if (!webCards.includes(currentCard)) {
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
            <FlashcardList flashcards={web} />
        </div>
    )
}

export default FlashcardsWeb;
