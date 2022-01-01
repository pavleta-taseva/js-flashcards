import React, { useState, useEffect } from "react";
import OwnerFlashcardList from '../OwnerFlashcardList/OwnerFlashcardList.js';
import PaginationElement from "../../PaginationElement/PaginationElement.js";
import * as cardService from '../../../services/cardService.js';
import Loader from '../../Loader/Loader.js';
import '../MyCards/MyCards.css';
import { Navigate } from "react-router-dom";

const options = [
    { value: 'JS Basics', text: 'JS Basics' },
    { value: 'JS Advanced', text: 'JS Advanced' },
    { value: 'JS Web', text: 'JS Web' },
]

function MyCards() {
    let [cards, setCards] = useState([]);
    let [filteredCards, setFilteredCards] = useState([]);
    let [loading, setLoading] = useState(false);
    let [isFiltered, setIsFiltered] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);
    const userId = localStorage.getItem('userId');
    const url = window.location.href;
    const pattern = /^(http|https):\/\/(?:[a-z]*[-]*)(?:[a-z]+).[a-z]+.[a-z]+[:3000]*\//gm;
    const currentPageName = url.split(pattern)[1].split('/')[0];
    let categoryName = '';

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);

        async function fetchWebData() {
            try {
                const res = await cardService.getMyCards(userId);
                setCards(res);
                setIsFiltered(false);
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

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    let currentCards = [];
    let totalPages = 0;
    let totalCards = 0;

    if (isFiltered === false) {
        currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
        totalPages = Math.ceil(cards.length / cardsPerPage);
        totalCards = cards.length;
    } else {
        currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
        totalPages = Math.ceil(filteredCards.length / cardsPerPage);
        totalCards = filteredCards.length;
    }

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

    async function onFilter(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let category = formData.get('category');
        categoryName = category;
        const filtered = await cardService.filterCards(categoryName);
        setFilteredCards(filtered);
        setIsFiltered(true);
    }

    async function reload() {
        setIsFiltered(false);
        const res = await cardService.getMyCards(userId);
        setCards(res);
        Navigate(`/my-cards/${userId}`);
    }

    return (
        <div className="my-cards-container">
            {loading
                ? <Loader />
                : <div>
                    {currentCards.length > 0
                        ? <div>
                            <div className="card-list-titles">
                            <h1>Ready to Test your JavaScript knowledge?</h1>
                            </div>
                            <form onSubmit={e => onFilter(e)}>
                                <label className="filter-form-label" htmlFor="category">Filter flashcards by category:</label><br />
                                <span className="category-choose">
                                    <select name="category" className="category-choose-select" defaultValue={options[1]} >
                                        {options.map(x => <option key={x.value} value={x.value}>{x.text}</option>)}
                                    </select>
                                </span><br />
                                <button className="filterBtn" type="submit">Filter</button><br />
                            </form>
                                <button onClick={reload} className="filterBtn" type="submit">Load all cards</button>
                            <OwnerFlashcardList flashcards={currentCards} />
                            <PaginationElement
                                cardsPerPage={cardsPerPage}
                                totalCards={totalCards}
                                paginate={paginate}
                                previousPage={previousPage}
                                nextPage={nextPage}
                                currentPageName={currentPageName}
                            />
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
