const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const flashcardController = require('../controllers/flashcardController.js');

module.exports = (app) => {
    // route to map the controller
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/flashcards', flashcardController);
}