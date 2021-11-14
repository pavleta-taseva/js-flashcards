import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import '../Edit/Edit.css';


function Edit() {
    const location = useLocation();
    const { category, question, answer } = location.state.flashcard;
    const { id } = useParams();

    return (
        <div className="edit">
            <form className="edit-form" action={`/edit/${id}`} method="POST">
                <h1>Edit your Flashcard</h1>
                <div>
                    <label htmlFor={category}>Choose category:</label><br></br>
                    <select className="category" name="category">
                        <option value="js-basics">JS Basics</option>
                        <option value="js-advanced">JS Advanced</option>
                        <option value="js-web">JS Web</option>
                    </select>
                </div>
                <div>
                    <label htmlFor={question}>Question:</label><br></br>
                    <textarea placeholder="Edit question" name="question" defaultValue={question}></textarea>
                </div>
                <div>
                    <label htmlFor={answer}>Answer:</label><br></br>
                    <textarea placeholder="Edit answer" name="answer" defaultValue={answer}></textarea>
                </div>
                <button className="editBtn" type="submit">Edit</button>
            </form>
        </div>
    )
}

export default Edit;
