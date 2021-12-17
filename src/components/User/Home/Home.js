import React, { useContext } from 'react';
import { Link } from 'react-scroll'
import { GithubContext } from "../../../App.js";
import Category from '../Category/Category.js';
import './Home.css';

function Home() {
    const user = localStorage.getItem('username');
    const { state, dispatch } = useContext(GithubContext);
    const { name } = state.user;
    console.log(dispatch);
    return (
        <div className="categories-container">
            <h2 className="welcome-user">
                <ion-icon name="finger-print-sharp"></ion-icon>
                <span className="current-user">{`${user || name}`}</span></h2>
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
            <h3>The categories are formed on the basis of our own experience. By no means do we claim to be accurate, as everyone judges for themselves the complexity of the questions and terminology.</h3>
            <Category />

            <div className="info-container">
                <div className="js-basics">
                    <p className="info">
                    <ion-icon name="help-circle-outline"></ion-icon> <strong>JS Basics</strong> includes questions that concern the basics of programming and are more general, that is, they could apply not only to the JavaScript language, but also to other programming languages. For example:
                    <ul>
                        <li>Types and variables</li>
                        <li>Arrays</li>
                        <li>Conditional statement</li>
                        <li>Loops</li>
                    </ul>
                    </p>
                </div>

                <div className="js-advanced">
                    <p className="info">
                    <ion-icon name="help-circle-outline"></ion-icon> In <strong>JS Advanced</strong> category you will find more complex questions concerning:
                    <ul>
                        <li>associative arrays, objects, classes</li>
                        <li>word processing, string operations, regex</li>
                        <li>Functions and functional programming</li>
                        <li>DOM manipulation</li>
                        <li>Single Page Applications, HTTP requests, REST Services, asynchronous programming etc.</li>
                    </ul>
                    </p>
                </div>

                <div className="js-web">
                    <p className="info">
                    <ion-icon name="help-circle-outline"></ion-icon> In <strong>JS Web</strong> category we will include questions related to:
                    <ul>
                        <li>React.js library</li>
                        <li>Development of server-side JavaScript applications with Node.js platform</li>
                        <li>Using Express.js as a framework</li>
                        <li>Non-relational database (MongoDB) and the Mongoose library for retrieving data from it</li>
                    </ul>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home;
