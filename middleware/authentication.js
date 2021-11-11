const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService.js');
const { TOKEN_SECRET, COOKIE_NAME } = require('../config/credentials.js');

// Factory function (returns another function)
module.exports = () => (req, res, next) => {
    // Parse JWT
    if (parseToken(req, res)) {
        // Attach functions to context
        req.authentication = {
            async createUser(username, email, password) {
                const token = await register(username, email, password);
                // console.log('Token from authentication.js', token);
                res.cookie(COOKIE_NAME, token).json({ username: username, email: email });
            },
            async loginUser(username, password) {
                const token = await login(username, password);
                console.log('Token from login ', token);
                res.cookie(COOKIE_NAME, token).json({ 
                    username: username, 
                    token
                });
            },
            logout() {
                // Clearing the cookie
                res.cookie(COOKIE_NAME, '').send();
                // res.clearCookie('authToken').send();
                console.log("Cookie cleared");
            }
        }
        next();
    }
}

// Registration
async function register(username, email, password) {
    const existingUsername = await userService.getUserByUsername(username);
    const existingEmail = await userService.getUserByEmail(email);

    if (existingUsername) {
        throw new Error('This username is already taken.');
    }

    if (existingEmail) {
        throw new Error('This email is already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(username, email, hashedPassword);
    return generateToken(user);
}

// Login
async function login(username, password) {
    const user = await userService.getUserByUsername(username);

    if (!user) {
        throw new Error('Wrong username or password.');
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
        throw new Error('Wrong password.');
    }

    console.log('Logging in as: ' + user.username);
    return generateToken(user);
}

// Generate token
function generateToken(user) {
    return jwt.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
    }, TOKEN_SECRET );
}

// Parse token
function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.currentUser = userData;
        } catch (err) {
            res.clearCookie(COOKIE_NAME);
            return false;
        }
    }

    return true;
}