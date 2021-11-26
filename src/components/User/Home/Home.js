import React from 'react';
import { Link } from 'react-scroll'
import './Home.css';
import Category from '../Category/Category.js';

function Home() {
    const user = localStorage.getItem('username');

    return (
        <div className="categories-container">
            <h2 className="welcome-user">
                <ion-icon name="finger-print-sharp"></ion-icon> 
                <span className="current-user">{`${user}`}</span></h2>
                <Link 
                    className="continue-link" 
                    to="categories" 
                    alt="categories"
                    spy={true} 
                    smooth={true} 
                    duration={500} 
                >Continue
                </Link>
            <h1 className="category-title">Choose category</h1>
            <p className="info">
                The categories are formed on the basis of our own experience. For example, <strong>JS Basics</strong> includes questions that concern the basics of programming and are more general, that is, they could apply not only to the JavaScript language, but also to other programming languages. For example: What are variables or what is an array, conditional statements, loops etc.
            </p>
            <br></br>
            <p className="info">
                In <strong>JS Advanced</strong> category you will find more complex questions concerning associative arrays, objects, classes, word processing, regex,  functional programming, DOM manipulation, Single Page Applications, HTTP requests, REST Services, asynchronous programming etc.
            </p>
            <br></br>
            <p className="info">
                In <strong>JS Web</strong> category we will include questions related to React.js library, development of server-side JavaScript applications with Node.js platform, using Express.js as a framework, non-relational database (MongoDB) and the Mongoose library for retrieving data from it.
            </p>
            <Category />
        </div>
    )
}

export default Home;
