# JavaScript Флашкарти
Обучителна система, базирана на създаване и управление на флаш карти, съдържащи терминология и дефиниции от областта на JavaScript.

## Функционалност при потребители със свободен достъп - контрол на достъпа
* Публичната част на проектa е видима без удостоверяване на потребителя
* Начална страница, съдържаща обща информация за потребителя относно ползите от самообучението с флашкарти
* Навигационно меню, даващо достъп единствено до страниците, предназначение за потребители със свободен достъп - начална страница, библиотека с флашкарти, потребителски вход и регистрация на нов потребител
* Възможност за разглеждане на цялата библиотека от флашкарти, но без изрична тяхна категоризация
* Достъп до детайлна информация за всяка една карта - идентификационен номер, въпрос, отговор и създател на картата
* Без достъп до бутони за редакция и изтриване

## Функционалност при потребители след регистрация в база данни (достъп за регистрирани потребители) - контрол на достъпа
* Регистрацията на потребителите влиза в сила след успешна проверка на техния имейл адрес
* Регистрираните потребители имат лични зони в уеб приложението, достъпни след успешното им влизане:
1. Начална страница, предоставяща достъп до трите основни категории флашкарти - JS Basics, JS Advanced и JS Web
    - Персонализиран приветствен екран, показващ името на текущия потребител и бутон "Продължи", който ги препраща по-долу към секцията с категоризациите
2. Профилна страница, съдържаща информация за текущия потребител:
    - Идентификационен номер, потребителско име, имейл, брой създадени флашкарти, информация за текущото ниво на потребителя, базирано на неговия принос спрямо общото количество създадени карти
    - Функционалност за изтриване на личния акаунт от базата данни
3. Достъп до личната библиотека на потребителя от създадени от тях флашкарти, сортирани по категории
4. Достъп до страницата с подробностите за всяка една флашкарта
    - Опция за редактиране или изтриване на текущата флашкарта, видими бутони само за създателя на страницата
        - Бутон за редактиране - дава функционалността за промяна на параметрите на текущата флашкарта - въпрос и/или отговор
        - Категорията на дадена флашкарта не може да бъде променена впоследствие
        - Бутонът "Изтрий" премахва текущата флашкарта от базата данни - както от главната библиотека, видима за всички нерегистрирани потребители, така и от списъка с лични карти на регистрирания потребител

## Технологии
* HTML, CSS, JavaScript, React.JS
* Dependencies: Parse, React notifications, React Scripts, React Scroll, React Spinners
* Heroku, Back4app as BAAS

## Задоволяване на изискванията
Уеб приложението използва следните технологии, рамки и техники за разработка:
* Има поне 3 различни динамични страници - Моите карти, Профилна страница, Създаване, Редактиране и т.н.
* Има необходимите изгледи:
    - Каталог – списък на всички създадени записи (Библиотека с флашкарти)
    - Подробности – информация за конкретен запис (подробности за флашкарта)
    - Една колекция, различна от потребителската колекция, с всички CRUD операции (създаване, четене, актуализиране, изтриване) - Колекция Flashcard
* Влезли потребители – създават записи и заявяват REST API, взаимодействат със записите (добавяне към списъка с карти за практикуване)
* Влезлият потребител (собственик) може да редактира / изтрива своите записи
* Гостът има достъп до основна информация за уебсайта (библиотека, подробности), но не и до функционалните дейности
* React.js се използва от страна на клиента
* Комуникация с отдалечена услуга (чрез REST, сокети, GraphQL или подобна техника клиент-сървър)
* Реализирано удостоверяване
* Реализирано маршрутизиране от страна на клиента
* Демонстрира използване на концепции за програмиране, специфични за библиотеката React: компоненти без състояние и state full компоненти, свързани форми, синтетични събития, стил на компоненти и др.
* Използва система за контрол на източника, чрез GitHub

## Екрани (Страници)
* **Welcome Page** (landing page) - начална страница за нерегистрирани потребители
* **Login/Register** - регистрация с мейл, потребителско име, парола
* **Flashcards Library** - списък с всички флашкарти, създадени от потребители
* **Home Page** - страница за регистрирани потребители, насочваща към библиотеки с трите основни категории флашкарти
* **Profile Page** - информация за настоящия потребител, с възможност за изтриване на профила
* **My Cards** - библиотека от флашкарти, създадени от настоящия потребител
* **Details Page** - страница, даваща информация за конкретна флашкарта, с възможност за редакция и изтриване
* **Create Page** - страница за създаване на флашкарти
* **Edit Page** - редакция на създадени флашкарти, техните въпроси и отговори

## План за изпълнение
### Част 1
* Създаване и настройване на приложение в Back4app
* Деплойване на приложение в Heroku
* Login/Register страница, logout функционалност
* Single Flashcard функционалност на компонента

### Част 2
* Създаване на landing page
* Създаване на home page
* Flashcard Details
* Flashcards library
* My Cards page
* Crеаte Page
* Edit Page
* Delete функционалност
* Profile page
* Context API

## Реализация
### Структура на данните
#### Колекции
* Sessions (служебна)
* Users (служебна)
```javascript
{
    email: String,
    username: String,
    password: String,
    myCards: Array<String>,
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
## Допълнителна функционалност
* Реализирана обработка на грешки и проверка на данните
* Приложението е разделено на компоненти с отделни CSS файлове
* Демонстрира използване на концепции за програмиране - React Hooks, Context API

## Опит за допълнителни подобрения
* Използвано решение за управление на състоянието (React Redux) вместо Context API
* Добър потребителски интерфейс и UX
* Свързване с външен API, като Google Maps, AccuWeather и др.
* Приложението е разположено в облака - Heroku