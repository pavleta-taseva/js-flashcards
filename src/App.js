import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
import Practice from './components/Practice/Practice.js';
import UserContext from './UserContext.js';

function App() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    
  }, [])

  return (
    <UserContext.Provider value={ { username, setUsername } }>
      <Router>
        {/* Switch makes router stop when found match */}
          <div className="App">
            {/* Exact is used to match the exact path and nothing else after it or function which returns component */}
          <Switch>
            <Route path='/' exact render={(props) => (
              <React.Fragment>
                <Header />
                <CategoryIntro />
                <Navbar />
                <Category />
              </React.Fragment>
            )} />
            {/* Render is usually used to render expression as component, directly */}
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
          </Switch>
          </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
