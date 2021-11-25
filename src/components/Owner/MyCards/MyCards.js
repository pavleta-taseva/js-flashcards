import React, { useState, useEffect } from "react"
import OwnerFlashcardList from '../OwnerFlashcardList/OwnerFlashcardList.js';
import * as cardService from '../../../services/cardService.js';
import BeatLoader from "react-spinners/BeatLoader";
import './MyCards.css';

function MyCards() {
    let [cards, setCards] = useState([]);
    let [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        setLoading(true);

        async function fetchWebData() {
            try {
                const res = await cardService.getMyCards(userId);
                setCards(res);
                setTimeout(() => {
                    setLoading(false);
                }, 3000)
                return () => { setLoading(false) };
            } catch (err) {
                console.log(err);
            }
        }
        fetchWebData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {loading
                ? <div className="loader">
                    <BeatLoader className="loading-clip" color={'#E7D4F6'} loading={loading} size={30} />
                    <h1 className="loader-heading">Loading...</h1>
                </div>
                : <div>
                    {cards.length > 0
                        ? <OwnerFlashcardList flashcards={cards} />
                        : <div className="no-cards">
                        <div className="left-container">
                            <h1 className="no-cards-heading">No Flashcards in this category yet.</h1>
                            <h1 className="no-cards-heading">Why don't you create your own flashcards to practice with?</h1>
                        </div>
                    </div>
                    }
                </div>
            }
        </div>
    )
}

export default MyCards;
