import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import Flashcard from '../Flashcard/Flashcard.js';

let basicsCards = [];

async function getBasicsCards() {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('category', 'JS Basics');
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
                basicsCards.push(currentCard);
            });        
        } catch (error) {
            console.log(`Error: ${JSON.stringify(error)}`);
        }
        return basicsCards;
    }
    
    function FlashcardsBasic() {
        let [basics, setBasicsCards] = useState(basicsCards);
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
        
        let isEmpty = false;
        const length = basicsCards.length === undefined;
        if (length) {
            isEmpty = true;
        }

    return (
        <div className="my-list-container">
            <h2 className="my-cards-title">JS Basics Flashcards List</h2><br />
            {!isEmpty
                ? <div className="flashcards-container">
                    {basics.map((flashcard, index) => {
                        return <Flashcard flashcard={flashcard} key={index} />
                    })}
                </div>
                : <h3>There are no flashcards in this category yet.</h3>
            }
        </div>
    )
}

export default FlashcardsBasic;