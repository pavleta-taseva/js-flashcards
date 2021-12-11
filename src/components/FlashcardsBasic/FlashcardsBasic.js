import React, { useState, useEffect } from "react";
import Parse from '../../../node_modules/parse/dist/parse.js';
import FlashcardList from '../FlashcardList/FlashcardList.js';
import BeatLoader from "react-spinners/BeatLoader";
import PaginationElement from "../PaginationElement/PaginationElement.js";

let finalArray = [];

async function getBasicsCards() {
    let basicsCards = [];
    const query = new Parse.Query('Flashcard');
    query.containedIn('category', ['JS Basics']);

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
            const check = basicsCards.includes(currentCard);
            if (!check) {
                basicsCards.push(currentCard);
                finalArray = basicsCards;
            }
        };
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }
    return finalArray;
}

function FlashcardsBasic() {
    let [basics, setBasicsCards] = useState(finalArray);
    let [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const res = await getBasicsCards();
                setBasicsCards(res);
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
    const currentCards = basics.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(basics.length / cardsPerPage);

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
                    {basics.length > 0
                        ? <div>
                            <FlashcardList flashcards={currentCards} />
                            <PaginationElement cardsPerPage={cardsPerPage} totalCards={basics.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage} />
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

export default FlashcardsBasic;