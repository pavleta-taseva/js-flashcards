import React from "react";
import './PaginationElement.css';

function PaginationElement({ cardsPerPage, totalCards, paginate, previousPage, nextPage }) {
    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(totalCards / cardsPerPage); index++) {
        pageNumbers.push(index);
    }
  
    return (
        <nav className="pagination-nav">
            <ul className="pagination">
                <a href="!#" onClick={() => previousPage()} className="minus">« </a>
                {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a href="!#" onClick={() => paginate(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                ))}
                <a href="!#" onClick={() => nextPage()} className="plus"> »</a>
            </ul>
        </nav>
    )
}

export default PaginationElement;