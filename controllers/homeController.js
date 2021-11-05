const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const flashcards = await req.storage.getAll();
        res.json(flashcards);
    } catch (error) {
        console.log(error.message);
    }   
});

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const currentUser = await req.storage.getUserById(userId);
    const flashcards = currentUser.flashcards;
    res.json({
        currentUser,
        flashcards
    });
});

module.exports = router;