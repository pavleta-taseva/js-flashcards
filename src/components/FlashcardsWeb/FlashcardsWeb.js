import React, { useState, useEffect, Suspense } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import Flashcard from '../Flashcard/Flashcard.js';
import '../FlashcardsWeb/FlashcardsWeb.css';

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

    return (
        <div className="my-list-container">
            <h2 className="my-cards-title">JS Web Flashcards List</h2><br />
            <div className="flashcards-container">
                {web.map((flashcard, index) => {
                    return <Flashcard flashcard={flashcard} key={index} />
                })}
            </div>
        </div>
    )
}

export default FlashcardsWeb;
