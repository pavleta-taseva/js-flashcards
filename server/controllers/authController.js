// Factory function to import modular router
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middleware/guards.js');

router.get('/register', isGuest(), (req, res) => {
    res.json({ status: 200 });
});

router.post('/register',
    isGuest(),
    // Change according to the documentation
    body('username')
        .isLength({ min: 5 })
        .withMessage('Username must be minimum 5 characters long.')
        .bail(),
    body('email', 'Invalid email').isEmail(),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be minimum 5 characters long.')
        .bail()
        .matches(/[a-zA-z0-9]/)
        .withMessage('Password may contain only english letters and numbers.'),

    body('rePass').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords don\'t match.');
        }
        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);
        console.log(req.body.username, req.body.email);
        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }

            const newUser = await req.authentication.createUser(req.body.username, req.body.email, req.body.password);
            console.log(newUser);
            res.json(newUser);
            // Change redirect according to the requirements
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    }
);

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login');
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.authentication.loginUser(req.body.username, req.body.password);
        // Change redirect according to the requirements
        res.redirect('/');
    } catch (err) {
        const context = {
            errors: [err.message],
            userData: {
                username: req.body.username,
            }
        }
        res.render('user/login', context);
    }
});

router.get('/logout', (req, res) => {
    req.authentication.logout();
    res.redirect('/');
});

module.exports = router;