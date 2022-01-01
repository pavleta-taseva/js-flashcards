import React, { useState, useEffect } from "react";
import PaginationElement from "../PaginationElement/PaginationElement.js";
import * as cardService from '../../services/cardService.js';
import '../FlashcardsAdvanced/FlashcardsAdvanced.css';
import FlashcardList from '../FlashcardList/FlashcardList.js';
import Loader from '../Loader/Loader.js';

let finalArray = [];

function FlashcardsAdvanced() {
    let [advanced, setAdvancedCards] = useState(finalArray);
    let [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);
    const url = window.location.href;
    const pattern = /^(http|https):\/\/(?:[a-z]*[-]*)(?:[a-z]+).[a-z]+.[a-z]+[:3000]*\//gm;
    const currentPageName = url.split(pattern)[1].split('/')[0];

    useEffect(() => {
        setLoading(true);
        async function fetchAdData() {
            try {
                const res = await cardService.getAdvancedCards();
                setAdvancedCards(res);
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
            } catch (err) {
                console.log(err);
            }
        }
        fetchAdData();
    }, []);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = advanced.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(advanced.length / cardsPerPage);
    
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
                    {advanced.length > 0
                        ? <div>
                            <FlashcardList flashcards={currentCards} />
                            <PaginationElement cardsPerPage={cardsPerPage} totalCards={advanced.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage} currentPageName={currentPageName} />
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

export default FlashcardsAdvanced;
