const router = require('express').Router();
const { isRegistered } = require('../middleware/guards.js');

router.get('/create', isRegistered(), (req, res) => {
    res.sendFile('C:\Users\PC\Desktop\React\js-flashcards\client\public\index.html')
});

router.post('/create', isRegistered(), async (req, res) => {
    const ownerId = req.user.id;
    const flashcardData = {
        category: req.body.category,
        question: req.body.question,
        answer: req.body.answer,
        popularity: [],
        owner: req.user._id,
    };

    try {
        await req.storage.createFlashcard(flashcardData, ownerId);
        res.redirect('/');
    } catch (err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message];
        }

        const context = {
            errors,
            flashcardData: {
                category: req.body.category,
                question: req.body.question,
                answer: req.body.answer,
                popularity: [],
            }
        };

        res.render('create', context)
    }   
});

router.get('/details/:id', async (req, res) => {
    try {
        const flashcard = await req.storage.getFlashcardById(req.params.id);
        flashcard.hasUser = Boolean(req.user);
        flashcard.isOwner = req.user && req.user._id == flashcard.owner;
        flashcard.isListed = req.user && flashcard.popularity.find(h => h == req.user._id);

        res.render('details', { flashcard });
        return flashcard;
    } catch(err) {
        console.log(err.message)
        res.redirect('/');
    }
});

router.get('/edit/:id', isRegistered(), async (req, res) => {
    try {
        const flashcard = await req.storage.getFlashcardById(req.params.id);
        if(req.user._id != flashcard.owner) {
            throw new Error('You are not authorized to edit this flashcard.');
        }

        res.render('edit', { flashcard });
    } catch(err) {
        console.log(err.message)
        res.redirect('/');
    }
});

router.post('/edit/:id', isRegistered(), async (req, res) => {
    try {
        const flashcard = await req.storage.getFlashcardById(req.params.id);
        if(req.user._id != flashcard.owner) {
            throw new Error('You are not authorized to edit this flashcard.');
        }
        await req.storage.editFlashcardById(req.params.id, req.body);
        res.redirect('/');
    } catch(err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message];
        }

        const context = {
            errors,
            flashcard: {
                _id: req.params.id,
                category: req.body.category,
                question: req.body.question,
                answer: req.body.answer,
                popularity: [],
            }
        };

        res.render('edit', context)
    }   
});

router.get('/favorite/:id', isRegistered(), async(req, res) => {
    try {
        await req.storage.favorite(req.params.id, req.user._id);
        res.redirect('/flashcards/details/' + req.params.id);
    } catch(err) {
        console.log(err.message);
        res.redirect('/');
    }
});

module.exports = router;