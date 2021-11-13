// Factory function to import modular router
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middleware/guards.js');

router.get('/register', isGuest(), (req, res) => {
    res.json({ status: "ok"});
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
     async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }
            
            await req.authentication.createUser(req.body.username, req.body.email, req.body.password);
            res.status(200).json({ status: "ok" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
);

router.get('/login', isGuest(), (req, res) => {
    res.json({ status: "ok" });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await req.authentication.loginUser(req.body.username, req.body.password);
        res.json(user);
    } catch (err) {
        const context = {
            errors: [err.message],
            userData: {
                username: req.body.username,
            }
        }
        res.json({ context });
    }
});

router.get('/logout', (req, res) => {
    req.authentication.logout();
    console.log('User successfully logged out.');
});

module.exports = router;