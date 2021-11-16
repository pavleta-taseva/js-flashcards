import React, { useState, useEffect, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryIntro from './components/CategoryIntro/CategoryIntro.js';
import Category from './components/Category/Category.js';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Footer from './components/Footer/Footer.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import FlashcardsBasic from './components/FlashcardsBasic/FlashcardsBasic.js';
import FlashcardsAdvanced from './components/FlashcardsAdvanced/FlashcardsAdvanced.js';
import FlashcardsWeb from './components/FlashcardsWeb/FlashcardsWeb.js';
import Edit from './components/Edit/Edit.js';
import Create from './components/Create/Create.js';
import Practice from './components/Practice/Practice.js';
import MyCards from './components/MyCards/MyCards.js';
import Details from './components/Details/Details.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={ <Home /> }>
              <Route path='/' element={ <CategoryIntro /> } >
                <Route path='/' element={ <Category /> } />
              </Route>
          </Route>
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/flashcards-basic' element={ <FlashcardsBasic /> } />
          <Route path='/flashcards-advanced' element={ <FlashcardsAdvanced /> } />
          <Route path='/flashcards-web' element={ <FlashcardsWeb /> } />
          <Route path='/flashcards/create' element={ <Create /> } />
          <Route path="/details/:id" element={ <Details /> } />
          <Route path='/my-cards/:userId' element={ <MyCards /> } />
          <Route path='/practice/:userId' element={ <Practice /> } />
          <Route path="/edit/:id" element={ <Edit /> } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
