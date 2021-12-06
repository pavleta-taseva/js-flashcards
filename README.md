# JS Flashcards
Web application representing a training system based on creating and managing flashcards containing terminology and definitions in the field of JavaScript.

## Public Part (Accessible without authentication) - access control
* The public part of the project is visible without authentication
* Home page containing general information for the user about the benefits of self-learning with flashcards
* Navigation menu, giving access only to the pages, intended for users with free access - home page, library with flashcards, user login and registration of a new user
* Ability to view the entire library of flashcards, but without their explicit categorization
* Access to detailed information about each card - identification number, question, answer and card creator
* No access to edit and delete buttons
* No access to practice button 

## Private Part (Available for Registered Users) - access control
* Registration of users comes into effect after successful verification of their e-mail address
* Registered users have personal areas in the web application accessible after their successful login:
1. Home page giving access to the three main categories of flashcards - JS Basics, JS Advanced and JS Web
    - Personalized welcoming screen showing current user's name and a "Continue" button that takes them below to the categorization section
2. Profile page containing information about the current user:
    - Identification number, username, email, contributions count - the total number of cards created
    - Functionality to delete the personal account from the database
3. Access to user's personal library of flashcards created by them, sorted by category
4. Access to flashcard's details page
- Option to edit or delete current flashcard, visible buttons only for the creator of the card
    - Edit button - gives the functionality to change current flashcard's parameters - question and/or answer
    - Category cannot be changed once the flashcard has been created
    - Delete button removes the current flashcard from the database - both from the main library, visible to all unregistered users, and from the list of personal flashcards of the registered user

## Technologies
* HTML, CSS, JavaScript, React.JS
* Dependencies: Parse, React notifications, React Scripts, React Scroll, React Spinners
* Heroku, Back4app as BAAS

## Satisfaction of requirements
Web application uses the following technologies, frameworks, and development techniques:
* It has at least 3 different dynamic pages - My cards, Profile page, Practice List, Create, Edit, etc.
* Has the required views:
    - Catalog – list of all created records (Flashcards Library)
    - Details – information about a specific record (Flashcard details)
    - One collection, different from the User collection, with all CRUD operations (create, read, update, delete) - Flashcard collection
* Logged in users – create records and request to the REST API, interaction with the records (add to Practice List)
* Logged in user (owner) is able to Edit / Delete their records
* A Guest has access to basic website information (library, details), but not to the functional activities
* React.js is used for the client-side
* Communicate to a remote service (Back4App)
* Implemented authentication
* Implemented client-side routing
* Demonstrates use of programming concepts, specific to the React library: stateless and state full components, bound forms, synthetic events, Component Styling, etc.
* Uses a source control system, like GitHub    

## Screens (Pages)
* **Welcome Page** (landing page) - home page for unregistered users
* **Login / Register** - registration with e-mail, username, password
* **Flashcards Library** - a list of all flashcards created by users
* **Home Page** - a page for registered users, pointing to libraries with the three main categories of flashcards
* **Profile Page** - information about the current user, with the possibility to delete the profile
* **My Cards** - a library of flashcards created by the current user
* **Details Page** - a page giving information about a specific flashcard, with the ability to edit and delete
* **Practice List Page** - a page where the user can find all the cards created by other users, but he himself wants to practice
* **Create Page** - page for creating flashcards
* **Edit Page** - edit created flashcards, their questions and answers

## Implementation plan
### Part 1
* Create and set up an application in Back4app
* Deploy an application in Heroku
* Login / Register page, logout functionality
* Single Flashcard component functionality

### Part 2
* Creating a landing page
* Creating a home page
* Flashcard Details
* Flashcards library
* My Cards page
* Practice page
* Create Page
* Edit Page
* Delete functionality
* Profile page
* Context API

## Implementation
### Data structure
#### Collections
* Sessions (official)
* Users (official)
```javascript
{
    email: String,
    username: String,
    password: String,
    myCards: Array<String>,
    practiceCards: Array<String>
}
```
* Flashcard
```javascript
{
    title: String,
    topic: String,
    questionCount: Number
    owner:  Pointer<User>
}
```
## Additional functionality
* Implemented error handling and data validation
* The application is divided into components with separate CSS files
* Demonstrates use of programming concepts - React Hooks, Context API

## Additional improvements attempt
* Use a state management solution (React Redux) instead of Context API
* Good UI and UX
* Connect to an external API, like Google Maps, AccuWeather, etc.
* The application is deployed in the cloud - Heroku



