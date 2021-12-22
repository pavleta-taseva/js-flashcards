import React, { useState, useEffect } from "react";
import FlashcardList from '../../FlashcardList/FlashcardList.js';
import PaginationElement from "../../PaginationElement/PaginationElement.js";
import Loader from '../../Loader/Loader.js';
import '../Practice/Practice.css';
import * as cardService from '../../../services/cardService.js';
let practiceList = [];
const userId = localStorage.getItem('userId');


function Practice() {
    let [practiceCards, setPracticeCards] = useState(practiceList);
    let [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);
    const url = window.location.href;
    const currentPageName = url.split('https://js-flashcards.herokuapp.com/')[1].split('/')[0];
    
    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        async function fetchWebData() {
            try {
                const res = await cardService.getPracticeList(userId);
                setPracticeCards(res);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
                return () => { setLoading(false) };
            } catch (err) {
                console.log(err);
            }
        }
        fetchWebData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = practiceCards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(practiceCards.length / cardsPerPage);

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

    console.log(practiceCards);
    return (
        <div>
            {loading
                ? <Loader />
                : <div>
                    {practiceCards.length > 0
                        ? <div>
                            <h2 className="practice-title">Your Practice List</h2>
                            <FlashcardList flashcards={currentCards} />
                            <PaginationElement cardsPerPage={cardsPerPage} totalCards={practiceCards.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage} currentPageName={currentPageName} />
                        </div>
                        : <div className="no-cards">
                            <div className="left-container">
                                <h1 className="no-cards-heading">There are currently no Flashcards in your Practice List yet.</h1>
                                <h1 className="no-cards-heading">Why don't you browse our library of flashcards to start adding them to your list?</h1>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Practice;