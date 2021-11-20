import React, { useState, useEffect } from "react";
import Parse from 'parse/dist/parse';
import FlashcardList from '../../FlashcardList/FlashcardList.js';
import BeatLoader from "react-spinners/BeatLoader";
import './Practice.css';

let practiceList = [];
let result = [];

async function getPracticeList() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    const userId = localStorage.getItem('userId');
    try {
        let user = await query.get(userId);
        const attributes = user.attributes;
        const array = Object.entries(attributes);
        const userArray = array[7];
        practiceList = userArray[1];
        for (const object of practiceList) {
            const category = object.get('category');
            const question = object.get('question');
            const answer = object.get('answer');
            const owner = object.get('owner');
            const queryResult = {
                id: object.id,
                category,
                question,
                answer,
                owner
            }
            result.push(queryResult);
        }
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }
    return result;
}

function Practice() {
    let [practiceCards, setPracticeCards] = useState(practiceList);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        async function fetchWebData() {
            try {
                const res = await getPracticeList();
                setPracticeCards(res);
                setTimeout(() => {
                    setLoading(false);
                }, 3000)
            } catch (err) {
                console.log(err);
            }
        }
        fetchWebData();
    }, []);

    return (
        <div>
            {loading
                ? <div className="loader">
                    <BeatLoader className="loading-clip" color={'#E7D4F6'} loading={loading} size={30} />
                    <h1 className="loader-heading">Loading...</h1>
                </div>
                : <div>
                    {practiceCards.length > 0
                        ? <FlashcardList flashcards={practiceCards} />
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

export default Practice;
