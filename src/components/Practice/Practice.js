import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Parse from '../../../node_modules/parse/dist/parse.js';
import FlashcardList from '../FlashcardList/FlashcardList.js';
import '../Practice/Practice.css';

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

    useEffect(() => {
        async function fetchWebData() {
            try {
                const res = await getPracticeList();
                setPracticeCards(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchWebData();
    }, []);

    return (
        <div>
            {practiceCards.length > 0
                ? <FlashcardList flashcards={practiceCards} />
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

export default Practice;
