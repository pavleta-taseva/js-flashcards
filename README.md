# JS Flashcards
===============
Web application representing a training system based on creating and managing flashcards containing terminology and definitions in the field of JavaScript.

## Public Part (Accessible without authentication)
* The public part of the project is visible without authentication
* Home page containing general information for the user about the benefits of self-learning with flashcards
* Navigation menu, giving access only to the pages, intended for users with free access - home page, library with flashcards, user login and registration of a new user
* Ability to view the entire library of flashcards, but without their explicit categorization
* Access to detailed information about each card - identification number, question, answer and card creator
* No access to edit and delete buttons


## Private Part (Available for Registered Users)
* Registration of users comes into effect after successful verification of their e-mail address
* Registered users have personal areas in the web application accessible after their successful login:
1. Home page giving access to the three main categories of flashcards - JS Basics, JS Advanced and JS Web
    - Personalized welcoming screen showing current user's name and a "Continue" button that takes them below to the categorization section
2. Profile page containing information about the current user:
    - Identification number, username, email, contributions count, current level information, based on the contribution to the total number of cards created
    - Functionality to delete the personal account from the database
3. Access to user's personal library of flashcards created by them, sorted by category
4. Access to flashcard's details page
* Option to edit or delete current flashcard, visible buttons only for the creator of the page
    - Edit button - gives the functionality to change current flashcard's parameters - question and/or answer
    - Category cannot be changed once the flashcard has been created
    - Delete button removes the current flashcard from the database - both from the main library, visible to all unregistered users, and from the list of personal flashcards of the registered user

## Application details
Your Web application should use the following technologies, frameworks, and development techniques:
•	At least 3 different dynamic pages (pages like about, contacts, etc. do not count towards that figure)
•	Must have specific views:
o	Catalog – list of all created records
o	Details – information about a specific record
•	At least one collection, different from the User collection, with all CRUD operations (create, read, update, delete)
o	Logged in users – create records and request to the REST API, interaction with the records (via Likes, Dislikes, Comments, etc.)
o	Logged in (author) – to be able to Edit / Delete their records
o	A Guest should have access to basic website information (catalog, details), but not to the functional activities
•	Use React.js for the client-side
•	Communicate to a remote service (via REST, sockets, GraphQL, or a similar client-server technique)
•	Implement authentication
•	Implement client-side routing
•	Demonstrate use of programming concepts, specific to the React library: stateless and state full components, bound forms, synthetic events, Component Styling, etc.
•	Use a source control system, like GitHub
•	It is required to have committed in GitHub for at least 3 days

## Additional functionality
* Implemented error handling and data validation
* The application is divided into components with separate CSS files
* Demonstrates use of programming concepts - React Hooks, Context API

## Additional improvements attempt
* Use a state management solution (React Redux) instead of Context API
* Good UI and UX
* Connect to an external API, like Google Maps, AccuWeather, etc.
* The application is deployed in the cloud - Heroku

## User creation details
* Registered user will store the following information in the database:
* * username
* * email
* * hashed password
* * my cards – list of his own cards

## Flashcard creation details
* Single Flashcard will store the following information in the database:
* * category – JS Basics, JS Advanced, JS Web
* * question 
* * answer
* * owner

~~***************************************************~~

# JavaScript флашкарти
===============
Обучителна система, базирана на създаване и управление на флаш карти, съдържащи терминология и дефиниции от областта на JavaScript.

## Функционалност при потребители със свободен достъп
* Публичната част на проектa е видима без удостоверяване на потребителя
* Начална страница, съдържаща обща информация за потребителя относно ползите от самообучението с флашкарти
* Навигационно меню, даващо достъп единствено до страниците, предназначение за потребители със свободен достъп - начална страница, библиотека с флашкарти, потребителски вход и регистрация на нов потребител
* Възможност за разглеждане на цялата библиотека от флашкарти, но без изрична тяхна категоризация
* Достъп до детайлна информация за всяка една карта - идентификационен номер, въпрос, отговор и създател на картата
* Без достъп до бутони за редакция и изтриване

## Функционалност при потребители след регистрация в база данни (достъп за регистрирани потребители)
* Регистрацията на потребителите влиза в сила след успешна проверка на техния имейл адрес
* Регистрираните потребители имат лични зони в уеб приложението, достъпни след успешното им влизане:
* * - Начална страница, предоставяща достъп до трите основни категории флашкарти - JS Basics, JS Advanced и JS Web
* * Персонализиран приветствен екран, показващ името на текущия потребител и бутон "Продължи", който ги препраща по-долу към секцията с категоризациите
* * - Профилна страница, съдържаща информация за текущия потребител:
* * * Идентификационен номер, потребителско име, имейл, брой създадени флашкарти, информация за текущото ниво на потребителя, базирано на неговия принос спрямо общото количество създадени карти
* * * Функционалност за изтриване на личния акаунт от базата данни
* * - Достъп до личната библиотека на потребителя от създадени от тях флашкарти, сортирани по категории
* * * Достъп до страницата с подробностите за всяка една флашкарта
* * * Опция за редактиране или изтриване на текущата флашкарта, видими бутони само за създателя на страницата
* * * * Бутон за редактиране - дава функционалността за промяна на параметрите на текущата флашкарта - въпрос и/или отговор
* * * * Категорията на дадена флашкарта не може да бъде променена впоследствие
* * * * Бутонът "Изтрий" премахва текущата флашкарта от базата данни - както от главната библиотека, видима за всички нерегистрирани потребители, така и от списъка с лични карти на регистрирания потребител


## Технологии
* HTML, CSS, JavaScript
* lit-html, page
* GitHub Pages, Back4app

## Екрани (Страници)
* **Welcome Screen** (landing page)
* **Login/Regsiter** - регистрация с мейл, потребителско име, парола
* **Quiz Browser** - списък с тестове и възможност за търсене по заглавие и филтрация по тема
* **Quiz Details** - допълнително описание, статистика за теста, информация за автора и възможност за стартиране на теста
* **Quiz Contest Mode** - отговаряне на въпроси, всеки въпрос е в отделен изглед, възможност за свободно преминаване от въпрос на въпрос, възможност за рестартиране на теста
* **Quiz Results** - обобщение на резултатите, възможност за преглеждане на сгрешените въпроси
* **Profile Page** - информация за създадени тестове и всички решени тестове
* **Quiz Editor** - интегриран редактор за тестове, въпроси и отговори

## План за изпълнение
### Part 1
* Създаване и настройване на приложение в Back4app
* Деплойване на приложение в GitHub Pages
* Login/Register страница
* Quiz Editor функционалност

### Part 2
* Довършване на структура и стилизация
* Welcome Screen
* Quiz Browser
* Quiz Details
* Quiz Contest Mode
* Quiz Results
* Profile Page

## Реализация
### Структура на данните
#### Колекции
* Sessions (служебна)
* Users (служебна)
```javascript
{
    email: String,
    username: String,
    password: String
}
```
* Quizes
```javascript
{
    title: String,
    topic: String,
    questionCount: Number
}
```
* Questions
```javascript
{
    text: String,
    answers: Array<String>,
    correctIndex: Number,
    quiz:  Pointer<Quiz>
}
```
* Solutions
```javascript
{
    quiz: Pointer<Quiz>,
    correct: Number
}
```

#### Контрол на достъпа
* Гостите могат да се регистрират, да преглеждат каталога, детайлите на тестовете и профилните страници на потребителите
* Регистрираните потребители могат да решават тестове, да преглеждат резултатите си и да създават и редактират тестове
* Само създателя на един тест може да го редактира и изтрива
* Всеки регистриран потребител може да решава чужд тест