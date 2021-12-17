import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Flashcard from '../User/Flashcard/Flashcard.js';
import { useAuth } from '../../contexts/AuthContext.js';
import './FlashcardList.css';

function FlashcardList({ flashcards }) {
    const { user } = useAuth();
    const check = user.username !== '';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <div className="flashcards-list-container">
                {check
                    ? <div className='main-categories-links'>
                        <NavLink className={(navData) => navData.isActive ? 'active-main' : 'category-normal-link'} to="/flashcards-basic">
                            Flashcards Basic
                        </NavLink>
                        <NavLink className={(navData) => navData.isActive ? 'active-main' : 'category-normal-link'} to="/flashcards-advanced">
                            | Flashcards Advanced |
                        </NavLink>
                        <NavLink className={(navData) => navData.isActive ? 'active-main' : 'category-normal-link'} to="/flashcards-web">
                            Flashcards Web
                        </NavLink>
                    </div>
                    : ''
                }

                <div className="flashcards-wrapper">
                    <div className="flashcards-container">
                        {flashcards?.map((flashcard, index) => {
                            return <Flashcard flashcard={flashcard} key={index} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlashcardList
