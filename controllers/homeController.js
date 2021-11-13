const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const flashcards = await req.storage.getAll();
        res.json(flashcards);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;