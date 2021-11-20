import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Category from './components/User/Category/Category.js';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/User/Home/Home.js';
import LandingPage from './components/Guest/LandingPage/LandingPage.js';
import Register from './components/User/Register/Register.js';
import Login from './components/User/Login/Login.js';
import FlashcardsBasic from './components/FlashcardsBasic/FlashcardsBasic.js';
import FlashcardsAdvanced from './components/FlashcardsAdvanced/FlashcardsAdvanced.js';
import FlashcardsWeb from './components/FlashcardsWeb/FlashcardsWeb.js';
import Edit from './components/Owner/Edit/Edit.js';
import Create from './components/Owner/Create/Create.js';
import Practice from './components/Owner/Practice/Practice.js';
import MyCards from './components/Owner/MyCards/MyCards.js';
import Details from './components/Details/Details.js';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <div className="App">
      <ReactNotification />
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={ <LandingPage /> }>
          </Route>
          <Route path='/home' element={ <Home /> }>
            <Route path='/home/categories' element={ <Category /> } />
          </Route>
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/flashcards-basic' element={ <FlashcardsBasic /> } />
          <Route path='/flashcards-advanced' element={ <FlashcardsAdvanced /> } />
          <Route path='/flashcards-web' element={ <FlashcardsWeb /> } />
          <Route path='/flashcards/create' element={ <Create /> } />
          <Route path='/details/:id' element={ <Details /> } />
          <Route path='/my-cards/:userId' element={ <MyCards /> } />
          <Route path='/practice/:userId' element={ <Practice /> } />
          <Route path='/edit/:id' element={ <Edit /> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
