import './App.css';
import Category from './components/Category/Category.js';
import Navbar from './components/Navbar/Navbar.js';
import Header from './components/Header/Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Category />
    </div>
  );
}


export default App;
