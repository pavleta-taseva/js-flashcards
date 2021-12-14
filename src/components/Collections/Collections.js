import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import FlashcardList from '../FlashcardList/FlashcardList.js';
import PaginationElement from "../PaginationElement/PaginationElement.js";
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
    let [all, setAll] = useState([]);
    let [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);
    const url = window.location.href;
    const currentPageName = url.split('http://localhost:3000/')[1].split('/')[0];
 
    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);

        async function fetchAdData() {
            try {
                const res = await getAllCards();
                setAll(res);
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
            } catch (err) {
                console.log(err);
            }
        }
        fetchAdData();
    }, []);

    // Get current flashcards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = all.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(all.length / cardsPerPage);

    // Change page 
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    function previousPage() {
        let previous = currentPage - 1;
        if (previous < 1 || previous <= 0) {
            previous = 1;
        }
        setCurrentPage(previous);
    }

    function nextPage() {
        let nextPage = currentPage + 1;
        if (currentPage + 1 > totalPages) {
            nextPage = currentPage;
        }
        setCurrentPage(nextPage);
    }

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
                        ? <div >
                            <FlashcardList flashcards={currentCards} />
                            <PaginationElement 
                                cardsPerPage={cardsPerPage} 
                                totalCards={all.length} 
                                paginate={paginate} 
                                previousPage={previousPage} 
                                nextPage={nextPage} 
                                currentPageName={currentPageName}
                            />
                        </div>
                        : <div className="no-cards">
                            <div>
                                <h1 className="no-cards-heading">No Flashcards in this category yet.</h1>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Collections;