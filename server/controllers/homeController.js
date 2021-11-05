const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res, next) => {
    const flashcards = await req.storage.getAll();
    // const options = {
    //     root: path.join(__dirname)
    // };
     
    // const fileName = 'index.html';
    // res.sendFile(fileName, options, function (err) {
    //     if (err) {
    //         next(err);
    //     } else {
    //         console.log('Sent:', fileName);
    //     }
    // });
    res.json(flashcards);
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