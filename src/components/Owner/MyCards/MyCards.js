import React, { useState, useEffect } from "react";
import OwnerFlashcardList from '../OwnerFlashcardList/OwnerFlashcardList.js';
import PaginationElement from "../../PaginationElement/PaginationElement.js";
import * as cardService from '../../../services/cardService.js';
import BeatLoader from "react-spinners/BeatLoader";
import './MyCards.css';

function MyCards() {
    let [cards, setCards] = useState([]);
    let [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        
        async function fetchWebData() {
            try {
                const res = await cardService.getMyCards(userId);
                setCards(res);
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
                return () => { setLoading(false) };
            } catch (err) {
                console.log(err);
            }
        }
        fetchWebData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Get current flashcards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    
    // Change page 
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    function previousPage() {
        let previous = currentPage - 1;
        if(previous < 1 || previous <= 0) {
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
        <div className="my-cards-container">
            {loading
                ? <div className="loader">
                    <BeatLoader className="loading-clip" color={'#E7D4F6'} loading={loading} size={30} />
                    <h1 className="loader-heading">Loading...</h1>
                </div>
                : <div>
                    {cards.length > 0
                        ? <div>
                            <OwnerFlashcardList flashcards={currentCards} />
                            <PaginationElement cardsPerPage={cardsPerPage} totalCards={cards.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage}/>
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

export default MyCards;
