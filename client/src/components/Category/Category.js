import "../Category/Category.css";
import { Link } from 'react-router-dom';

function Category() {
  return (
    <div id={"categories"} className="category-container">
      <div className="category-card">
        <div className="category-icon">
          <ion-icon name="logo-javascript"></ion-icon>
        </div>
        <div className="category-content">
          <Link to="/flashcards-basic"><h2 className="category-title">JS Basics</h2></Link>
          <p className="category-description">
            Learn with ease the basics of JS Programming language through series
            of flashcards, created for beginners.
          </p>
        </div>
      </div>

      <div className="category-card">
        <div className="category-icon">
          <ion-icon name="logo-javascript"></ion-icon>
        </div>
        <div className="category-content">
          <h2 className="category-title">JS Advanced</h2>
          <p className="category-description">
            Feeling confident enough? Test your advanced knowledge in
            JavaScript.
          </p>
        </div>
      </div>

      <div className="category-card">
        <div className="category-icon">
          <ion-icon name="logo-javascript"></ion-icon>
        </div>
        <div className="category-content">
          <h2 className="category-title">JS Web</h2>
          <p className="category-description">
            Already able to create JS Applications and Web servers? Prove your
            mastery!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Category;
