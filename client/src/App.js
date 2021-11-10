import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import CategoryIntro from './components/CategoryIntro/CategoryIntro.js';
import Category from './components/Category/Category.js';
import Navbar from './components/Navbar/Navbar.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import FlashcardsBasic from './components/FlashcardsBasic/FlashcardsBasic.js';
import FlashcardsAdvanced from './components/FlashcardsAdvanced/FlashcardsAdvanced.js';
import FlashcardsWeb from './components/FlashcardsWeb/FlashcardsWeb.js';
import Edit from './components/Edit/Edit.js';
import Create from './components/Create/Create.js';
import React from 'react';
import Profile from './components/Profile/Profile.js';
import Practice from './components/Practice/Practice.js';

function App() {
  return (
    <Router>
      {/* Switch makes router stop when found match */}
      <Switch>
      <div className="App">
        {/* Exact is used to match the exact path and nothing else after it or function which returns component */}
        <Route path='/' exact render={(props) => (
          <React.Fragment>
            <Header />
            <CategoryIntro />
            <Navbar />
            <Category />
          </React.Fragment>
        )} />
        <Route path='/home' render={(props) => (
          <React.Fragment>
            <Navbar />
            <Home />
            <Category />
          </React.Fragment>
        )} />
        {/* Render is usually used to render expression as component, directly */}
        <Route path='/profile/:userId' render={(props) => (
          <React.Fragment>
            <Navbar />
            <Profile />
          </React.Fragment>
        )} />
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
        {/* <Route render={() => <h1>404, Page Not Found</h1>} /> */}
        <Footer />
      </div>
      </Switch>
    </Router>
  );
}

export default App;
