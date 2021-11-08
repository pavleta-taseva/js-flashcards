import '../Create/Create.css';

function Edit() {
    return (

        <div className="create">
            <form className="create-form" action="/create" method="POST">
                <h1>Create your own Flashcard</h1>
                <div>
                    <label>Choose category:</label><br></br>
                    <select className="category-name" name="category">
                        <option value="js-basics">JS Basics</option>
                        <option value="js-advanced">JS Advanced</option>
                        <option value="js-web">JS Web</option>
                    </select>
                </div>
                <div>
                    <label>Question:</label><br></br>
                    <textarea placeholder="Enter question" name="question"></textarea>
                </div>
                <div>
                    <label>Answer:</label><br></br>
                    <textarea placeholder="Enter answer" name="answer"></textarea>
                </div>
                <button className="createBtn" type="submit">Create</button>
            </form>
        </div>
    )
}

export default Edit;
