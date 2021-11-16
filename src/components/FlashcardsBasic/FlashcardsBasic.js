import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import Flashcard from '../Flashcard/Flashcard.js';

let finalArray = [];

async function getBasicsCards() {
    let basicsCards = [];
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('category', 'JS Basics');
    try {
        const results = await query.find();
        for (const object of results) {
            const category = object.get('category');
            const question = object.get('question');
            const answer = object.get('answer');
            const owner = object.get('owner');
            const currentCard = {
                category,
                question,
                answer,
                owner
            }
            if (!basicsCards.includes(currentCard)) {
                basicsCards.push(currentCard);
                finalArray = basicsCards;
            }
        };
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }
    return  finalArray;
}

function FlashcardsBasic() {
    let [basics, setBasicsCards] = useState(finalArray);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getBasicsCards();
                setBasicsCards(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    
    console.log(basics);
    return (
        <div className="my-list-container">
            <h2 className="my-cards-title">JS Basics Flashcards List</h2><br />
            <div className="flashcards-container">
                {basics.map((flashcard, index) => {
                    return <Flashcard flashcard={flashcard} key={index}></Flashcard>
                })}
            </div>
        </div>
    )
}

export default FlashcardsBasic;