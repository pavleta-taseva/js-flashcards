import React from 'react';
import './PaginationElement.css';

function PaginationElement({ cardsPerPage, totalCards, paginate }) {
    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(totalCards / cardsPerPage); index++) {
        pageNumbers.push(index);
    }

    return (
        <nav className="pagination-nav">
            <ul className="pagination">
                <a href="!#" className="minus">«</a>
                {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a href="!#" onClick={() => paginate(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                ))}
                <a href="!#" className="plus">»</a>
            </ul>
        </nav>
    )
}

export default PaginationElement;