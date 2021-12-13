import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import '../FlashcardsWeb/FlashcardsWeb.css';
import PaginationElement from "../PaginationElement/PaginationElement.js";
import FlashcardList from '../FlashcardList/FlashcardList.js';
import BeatLoader from "react-spinners/BeatLoader";

let finalArray = [];

async function getWebCards() {
    let webCards = [];
    const query = new Parse.Query('Flashcard');
    query.containedIn('category', ['JS Web']);

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
            const check = webCards.includes(currentCard);
            if (!check) {
                webCards.push(currentCard);
                finalArray = webCards;
            }
        };
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }
    return finalArray;
}

function FlashcardsWeb() {
    let [web, setWebCards] = useState(finalArray);
    let [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);
    const url = window.location.href;
    const currentPageName = url.split('http://localhost:3000/')[1].split('/')[0];

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const res = await getWebCards();
                setWebCards(res);
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    // Get current flashcards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = web.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(web.length / cardsPerPage);

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
                    {web.length > 0
                        ? <div>
                            <FlashcardList flashcards={currentCards} />
                            <PaginationElement cardsPerPage={cardsPerPage} totalCards={web.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage} currentPageName={currentPageName}/>
                        </div>
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

export default FlashcardsWeb;
