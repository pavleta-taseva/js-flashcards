import React from 'react'
import './Home.css';
import Category from '../Category/Category.js';

function Home() {
    const user = localStorage.getItem('username');

    return (
        <div className="categories-container">
            <h2 className="welcome-user">{`Welcome, ${user}`}</h2>

            <h1 className="category-title">Choose category</h1>
            <Category />
        </div>
    )
}

export default Home;
