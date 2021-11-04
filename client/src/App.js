import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoryIntro from './components/CategoryIntro/CategoryIntro.js';
import Category from './components/Category/Category.js';
import Navbar from './components/Navbar/Navbar.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Register from './components/Register/Register.js';

function App() {
  return (
    <Router>
    <div className="App">
      <Route path='/' exact render={ (props) => (
        <>
      <Header />
      <CategoryIntro />
      <Navbar />
      <Category />
      <Footer />
        </>
      )} />
      <Route path='/register' component={ Register } />
    </div>
    </Router>
  );
}


export default App;
