import React from 'react'
import './LandingPage.css';
import background from '../../../images/bg.jpg';
import { Link, Outlet } from 'react-router-dom';
import DemoFlashcard from '../../DemoFlashcard/DemoFlashcard.js';

function LandingPage() {
    const link = <Link alt="register" className="links" to="/register">Register</Link>;

    return (
        <div>
            <section className="header" style={{ backgroundImage: `url(${background})` }}>
                <div className="header-content">
                    <div className="animate__animated animate__fadeInDown">
                        <h1>JavaScript Flashcards Trainer</h1>
                        <h6>Challenge yourself</h6>
                    </div>
                </div>
            </section>

            <section className="main-info">
                <div className="website-info">
                    <div className="one">
                        <h1 className="category-intro-heading">
                            Studying JavaScript...<br></br>but struggling with terminology?
                        </h1>
                        <p className="category-intro">
                            Have you ever said to yourself after watching another tutorial: "Oh, I understand everything! JavaScript is not a difficult language, I will learn it in no time!" You are convinced that you know everything and you will perform excellently at a job interview. And later, when you are asked a simple question, can you not find the right words to give the answer?</p>
                        <p className="category-intro">
                            The conclusion that can be drawn is that you have not exercised enough. You have never heard your answers spoken aloud.
                            With the help of your auditory memory, you will learn complex terminology much more easily. By hearing your own voice and repeating short but clear definitions, you will train your brain and soon be able to answer questions almost automatically.
                        </p>
                        <p className="category-intro">
                            This way of learning should not be underestimated. Just remember how young children are taught their first words by being shown picture cards and being asked to name the object or animal in words.
                        </p>
                        <p className="category-intro">
                            After all, we are like young children - but in our case we have to learn a whole programming language from scratch.
                        </p>
                    </div>

                    <div className="two"></div>

                    <div className="three">
                        <h2>Flashcard Example</h2>
                        <DemoFlashcard />
                    </div>

                    <div className="four">
                        <h1 className="category-intro-heading">So, how to do that?</h1>
                        <p className="category-intro">
                            We suggest you try the learning system via our flash cards. It may not seem serious and motivating at first, but then you will notice how useful the cards will be as you try to improve your knowledge. We have prepared and will constantly update the collections of flashcards. But if you want to add a pinch of personality, then why not {link} as our user and start creating your own flashcards?
                        </p>
                        <p className="category-intro">
                            Currently, you can see all flashcards <Link alt="collections" to="/collections" className="links">here</Link> but it is without clear categorization. When you register, they will be sorted by categories, you will be able to create your own cards in your list, and you will also be able to even save flashcards created by other users in your Practice list.
                        </p>
                        <p className="category-intro">
                            And why not create your own collection of questions that were asked to you in an interview, but you did not answer correctly back then? Now you get the chance to master them to perfection.
                        </p>
                        <p className="category-intro">
                            Ready to start?
                        </p>
                    </div>
                </div>
            </section>
            <Outlet />
        </div>
    )
}

export default LandingPage;
