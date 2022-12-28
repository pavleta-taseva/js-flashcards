import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from './components/User/Category/Category.js';
import Navbar from './components/Navbar.js';
import Home from './components/User/Home/Home.js';
import LandingPage from './components/LandingPage.js';
import Register from './components/User/Register/Register.js';
import Login from './components/User/Login/Login.js';
import Profile from './components/User/Profile/Profile.js';
import Collections from './components/Collections.js';
import FlashcardsBasic from './components/FlashcardsBasic.js';
import FlashcardsAdvanced from './components/FlashcardsAdvanced.js';
import FlashcardsWeb from './components/FlashcardsWeb.js';
import Edit from './components/Owner/Edit/Edit.js';
import Create from './components/Owner/Create/Create.js';
import MyCards from './components/Owner/MyCards/MyCards.js';
import Practice from './components/User/Practice/Practice.js';
import Details from './components/User/Details/Details.js';
import OwnerDetails from './components/Owner/OwnerDetails/OwnerDetails.js';
import Footer from './components/Footer.js';
import { ReactNotifications } from 'react-notifications-component'
import NotFoundPage from './components/NotFoundPage.js';
import { AuthProvider } from './contexts/AuthContext.js';
import PrivateRoutes from './helpers/PrivateRoutes.js';
import PublicRoutes from './helpers/PublicRoutes.js';
import 'react-notifications-component/dist/theme.css';

const App = () => {

  return (
    <AuthProvider>
      <div className="App">
        <ReactNotifications />
        <Navbar />
        <main>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path='/' element={<LandingPage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/collections' element={<Collections />} />
              <Route path='/collections/:number' element={<Collections />} />
            </Route>
            
            <Route path='/details/:id' element={<Details />} />
            
            <Route element={<PrivateRoutes />}>
              <Route path='/home' element={<Home />}>
                <Route path='/home/categories' element={<Category />} />
              </Route>
              <Route path='/profile/:userId' element={<Profile />} />
              <Route path='/flashcards-basic' element={<FlashcardsBasic />} />
              <Route path='/flashcards-basic/:number' element={<FlashcardsBasic />} />
              <Route path='/flashcards-advanced' element={<FlashcardsAdvanced />} />
              <Route path='/flashcards-advanced/:number' element={<FlashcardsAdvanced />} />
              <Route path='/flashcards-web' element={<FlashcardsWeb />} />
              <Route path='/flashcards-web/:number' element={<FlashcardsWeb />} />
              <Route path='/flashcards/create' element={<Create />} />
              <Route path='/details/:ownerId/:id' element={<OwnerDetails />} />
              <Route path='/my-cards/:userId' element={<MyCards />} />
              <Route path='/my-cards/:number' element={<MyCards />} />
              <Route path='/practice/:userId' element={<Practice />} />
              <Route path='/practice/:number' element={<Practice />} />
              <Route path='/edit/:id' element={<Edit />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/404' element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
