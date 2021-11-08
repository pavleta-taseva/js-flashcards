const router = require('express').Router();
const { isRegistered } = require('../middleware/guards.js');

router.get('/create', isRegistered(), (req, res) => {
    res.json({ status: true });
});

router.post('/create', isRegistered(), async (req, res) => {
    const ownerId = req.user._id;
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

        res.json({ context })
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

router.get('/delete/:id', isRegistered(), async (req, res) => {
    try {
        const flashcard = await req.storage.getFlashcardById(req.params.id);

        if (flashcard.owner != req.user._id) {
            throw new Error('You are not authorized to delete this flashcard.');
        }
        await req.storage.deleteFlashcard(req.params.id);
        res.redirect('/');
    } catch(err) {
        console.log(err.message)
        res.redirect('/flashcards/details/' + req.params.id);
    }
});

router.get('/practice-list/:id', isRegistered(), async(req, res) => {
    try {
        await req.storage.practice(req.params.id, req.user._id);
        res.redirect('/flashcards/details/' + req.params.id);
    } catch(err) {
        console.log(err.message);
        res.redirect('/');
    }
});

module.exports = router;