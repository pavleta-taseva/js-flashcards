import React, { useState, useEffect } from "react"
import Parse from 'parse/dist/parse';
import FlashcardList from '../../FlashcardList/FlashcardList.js';
import { Link } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import './MyCards.css';

let myCards = [];

async function getMyCards() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    const userId = localStorage.getItem('userId');
    try {
        let user = await query.get(userId);
        const attributes = user.attributes;
        const array = Object.entries(attributes);
        const userArray = array[6];
        myCards = userArray[1];
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }
    return myCards;
}

function MyCards() {
    let [cards, setCards] = useState(myCards);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        async function fetchWebData() {
            try {
                const res = await getMyCards();
                setCards(res);
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
                    {cards.length > 0
                        ? <FlashcardList flashcards={cards} />
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
            }
        </div>
    )
}

export default MyCards;
