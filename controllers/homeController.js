const router = require('express').Router();
const { TOKEN_SECRET, COOKIE_NAME } = require('../config/credentials.js');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const flashcards = await req.storage.getAll();
        res.json(flashcards);
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/profile/:userId', async (req, res) => {
    const payload = jwt.verify(req.cookies.authToken, TOKEN_SECRET);
    if (payload) {
        const userId = payload._id;
        try {
            const currentUser = await req.storage.getUserById(userId);
            // console.log('Current user ', currentUser);
            const flashcards = currentUser.myCards;
            // console.log(flashcards);
            const username = currentUser.username;
            // console.log('Username ', username);
    
            res.json({
                currentUser,
                flashcards,
                username
            });
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;