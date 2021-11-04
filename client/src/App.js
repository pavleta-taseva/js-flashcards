import './App.css';
import CategoryIntro from './components/CategoryIntro/CategoryIntro.js';
import Category from './components/Category/Category.js';
import Navbar from './components/Navbar/Navbar.js';
import Header from './components/Header/Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <CategoryIntro />
      <Navbar />
      <Category />
    </div>
  );
}


export default App;
