import React, { useState, useEffect } from "react";
import FlashcardList from '../FlashcardList/FlashcardList.js';
import PaginationElement from "../PaginationElement/PaginationElement.js";
import '../Collections/Collections.css';
import Loader from '../Loader/Loader.js';
import * as cardService from '../../services/cardService.js';

function Collections() {
    let [all, setAll] = useState([]);
    let [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);
    const url = window.location.href;
    const currentPageName = url.split('https://js-flashcards.herokuapp.com/')[1].split('/')[0];

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);

        async function fetchAdData() {
            try {
                const res = await cardService.getAllCards();
                setAll(res);
                setTimeout(() => {
                    setLoading(false);
                }, 4000)
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
                ? <Loader />
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