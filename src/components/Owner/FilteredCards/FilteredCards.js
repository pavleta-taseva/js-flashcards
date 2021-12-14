import React, { useState, useEffect } from 'react';
import * as cardService from '../../../services/cardService.js';
import OwnerFlashcardList from '../OwnerFlashcardList/OwnerFlashcardList.js';
import PaginationElement from "../../PaginationElement/PaginationElement.js";
import Loader from '../../Loader/Loader.js';

const options = [
    { value: 'JS Basics', text: 'JS Basics' },
    { value: 'JS Advanced', text: 'JS Advanced' },
    { value: 'JS Web', text: 'JS Web' },
]

function FilteredCards() {
    let [loading, setLoading] = useState(false);
    const [filteredCards, setFilteredCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);
    const url = window.location.href;
    const currentPageName = url.split('http://localhost:3000/')[1].split('/')[0];

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const res = await cardService.filterCards();
                setFilteredCards(res);
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
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    
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

    function onFilter(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let category = formData.get('category');
        console.log(category);
        return category;
    }

    return (
        <div className="my-cards-container">
            {loading
                ? <Loader />
                : <div>
                    {filteredCards.length > 0
                        ? <div>
                            <div className="card-list-titles">
                            <h1>Ready to Test your JavaScript knowledge?</h1>
                            </div>
                            <form onSubmit={e => onFilter(e)}>
                                <label className="filter-form-label" htmlFor="category">Filter flashcards by category:</label><br />
                                <span className="category-choose">
                                    <select name="category" id="category" defaultValue={options[1]} >
                                        {options.map(x => <option key={x.value} value={x.value}>{x.text}</option>)}
                                    </select>
                                </span><br />
                                <button className="filterBtn" type="submit">Filter</button>
                            </form>
                            <OwnerFlashcardList flashcards={currentCards} />
                            <PaginationElement 
                                cardsPerPage={cardsPerPage} 
                                totalCards={filteredCards.length} 
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

export default FilteredCards;
