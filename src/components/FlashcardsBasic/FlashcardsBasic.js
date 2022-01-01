import React, { useState, useEffect } from "react";
import FlashcardList from '../FlashcardList/FlashcardList.js';
import Loader from '../Loader/Loader.js';
import PaginationElement from "../PaginationElement/PaginationElement.js";
import * as cardService from '../../services/cardService.js';

let finalArray = [];

function FlashcardsBasic() {
    let [basics, setBasicsCards] = useState(finalArray);
    let [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);
    const url = window.location.href;
    const pattern = /^(http|https):\/\/(?:[a-z]*[-]*)(?:[a-z]+).[a-z]+.[a-z]+[:3000]*\//gm;
    const currentPageName = url.split(pattern)[1].split('/')[0];
    
    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const res = await cardService.getBasicsCards();
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

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = basics.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(basics.length / cardsPerPage);

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
                    {basics.length > 0
                        ? <div>
                            <FlashcardList flashcards={currentCards} />
                            <PaginationElement cardsPerPage={cardsPerPage} totalCards={basics.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage} currentPageName={currentPageName}/>
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