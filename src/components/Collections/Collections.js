import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import FlashcardList from '../FlashcardList/FlashcardList.js';
import BeatLoader from "react-spinners/BeatLoader";
import '../Collections/Collections.css';

let finalArray = [];

async function getAllCards() {
    let advancedCards = [];
    const query = new Parse.Query('Flashcard');

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

function Collections() {
    let [all, setAll] = useState(finalArray);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchAdData() {
            try {
                const res = await getAllCards();
                setAll(res);
                setTimeout(() => {
                    setLoading(false);
                }, 3000)
            } catch (err) {
                console.log(err);
            }
        }
        fetchAdData();
    }, []);

    return (
        <div>
            {loading
                ? <div className="loader">
                    <BeatLoader className="loading-clip" color={'#E7D4F6'} loading={loading} size={30} />
                    <h1 className="loader-heading">Loading...</h1>
                </div>
                : <div>
                    <h1 className="library-title">Flashcards Library</h1>
                    <h3 className="library-info">The library contains all flashcards created by us or our users. No categorization is attached to the library. Please register as a user to view the flashcards by category or to create your own cards.</h3>
                    {all.length > 0
                        ? <FlashcardList flashcards={all} />
                        : <div className="no-cards">
                            <div>
                                <h1 className="no-cards-heading">No Flashcards in this category yet.</h1>
                            </div>
                            <div>
                                <h1 className="no-cards-heading">You need to add flashcards to this list<br></br> by pressing "Practice" button on the flashcard's details page.</h1>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Collections;
