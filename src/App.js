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
          <Route path='/practice/:userId' render={(props) => (
            <React.Fragment>
              <Navbar />
              <Practice />
            </React.Fragment>
          )} />
          <Route path='/auth/register' render={(props) => (
            <React.Fragment>
              <Navbar />
              <Register />
            </React.Fragment>
          )} />
          <Route path='/auth/login' render={(props) => (
            <React.Fragment>
              <Navbar />
              <Login />
            </React.Fragment>
          )} />
          <Route path='/flashcards-basic' render={(props) => (
            <React.Fragment>
              <Navbar />
              <FlashcardsBasic />
            </React.Fragment>
          )} />
          <Route path='/flashcards-advanced' render={(props) => (
            <React.Fragment>
              <Navbar />
              <FlashcardsAdvanced />
            </React.Fragment>
          )} />
          <Route path='/flashcards-web' render={(props) => (
            <React.Fragment>
              <Navbar />
              <FlashcardsWeb />
            </React.Fragment>
          )} />
          <Route path="/flashcards/create" render={(props) => (
            <React.Fragment>
              <Navbar />
              <Create />
            </React.Fragment>
          )} />
          <Route path="/edit/:id" render={(props) => (
            <React.Fragment>
              <Navbar />
              <Edit />
            </React.Fragment>
          )} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
