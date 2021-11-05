const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const authMiddleware = require('../middleware/authentication.js');
const storageMiddleWare = require('../middleware/storage.js');

module.exports = (app) => {
    app.engine('hbs', hbs({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');

    app.use('/client', express.static('client'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(authMiddleware());
    app.use(storageMiddleWare());
    
    // Serve static files if in production
    if (process.env.NODE_ENV === 'production') {
        // Set static folder
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }

    // Logger - helps with debugging
    app.use((req, res, next) => {
        if (!req.url.includes('favicon')) {
            console.log('>>>', req.method, req.url);
            if (req.user) {
                console.log('Registered user: ', req.user.username);
            }
        }
        next();
    });
};