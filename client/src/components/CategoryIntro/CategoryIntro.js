import { Link } from 'react-router-dom';
import '../CategoryIntro/CategoryIntro.css';

function CategoryIntro() {
    const link = <Link className="links" to="/register">Register</Link>;

    return (
        <div className="category-intro-container">
            <h1 className="category-intro-heading">
                Studying JavaScript but struggling with terminology?
            </h1>
            <p className="category-intro">
                Organize your learning process by practicing with our flashcards.<br></br> We
                have selected a series of questions and will constantly increase them.
            </p>
            <p className="category-intro">
                Start by choosing the appropriate level of knowledge, according to your opinion.<br></br>Don't worry, you can always choose a lower or higher level than yours if you find it suitable.
            </p>
            <p className="category-intro">If you want to add a pinch of personality, then why not {link} as our user and start creating your own flashcards?</p>
        </div>
    )
}

export default CategoryIntro;
