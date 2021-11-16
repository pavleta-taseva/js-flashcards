import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import Flashcard from '../Flashcard/Flashcard.js';

let advancedCards = [];

async function getAdvancedCards() {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('category', 'JS Advanced');
    try {
        const results = await query.find();
            results.forEach(object => {
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
                advancedCards.push(currentCard);
            });        
        } catch (error) {
            console.log(`Error: ${JSON.stringify(error)}`);
        }
        return advancedCards;
    }
    
    function FlashcardsAdvanced() {
        let [advanced, setAdvancedCards] = useState(advancedCards);
        useEffect(() => {
            async function fetchData() {
                try {
                    const res = await getAdvancedCards();
                    setAdvancedCards(res);
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }, []);
        
        let isEmpty = false;
        const length = advancedCards.length === undefined;
        if (length) {
            isEmpty = true;
        }

    return (
        <div className="my-list-container">
            <h2 className="my-cards-title">JS Advanced Flashcards List</h2><br />
            {!isEmpty
                ? <div className="flashcards-container">
                    {advanced.map((flashcard, index) => {
                        return <Flashcard flashcard={flashcard} key={index} />
                    })}
                </div>
                : <h3>There are no flashcards in this category yet.</h3>
            }
        </div>
    )
}

export default FlashcardsAdvanced;
