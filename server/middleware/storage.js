const flashcardService = require('../services/flashcardService.js');
const userService = require('../services/userService.js');

module.exports = () => (req, res, next) => {
    // Import services
    req.storage = {
        ...flashcardService,
        ...userService
    };

    next();
}