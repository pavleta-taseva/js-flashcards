import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import '../Details/Details.css';

async function getMyCard() {
    let isOwner = false;
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    const getCurrentUser = localStorage.getItem('userId');
    try {
        const results = await query.find();
    } catch (error) {
        console.error('Error while fetching Flashcard', error);
    }
    return isOwner;
}

function Details() {
    let [card, setCard] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getMyCard();
                setCard(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {/* <h2>Flashcard id: {`${flashcard.id}`}</h2>
            <h2>Flashcard id: {`${flashcard.question}`}</h2>
            <h2>Flashcard id: {`${flashcard.answer}`}</h2>
            <h2>Flashcard id: {`${owner}`}</h2> */}
            {/* <div className="buttons">
                <Link className="flashcard-buttons" to={`/delete/${flashcard.id}`}>Delete</Link>
                <Link className="flashcard-buttons"
                    to={{
                        pathname: `/edit/${flashcard.id}`,
                        state: {
                            flashcard: flashcard
                        }
                    }}>
                    Edit</Link>
            </div> */}
        </div>
    )
}

export default Details;
