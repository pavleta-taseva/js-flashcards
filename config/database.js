const mongoose = require('mongoose');
const config = require('./credentials.js');

// Asynchronous - using promise to wait for the database to connect before starting application

module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.DB_CONNECTION_STRING, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        const db = mongoose.connection;
        db.on('error', err => {
            console.error('Connection error: ', err);
            reject(err);
        });
        db.once('open', function() {
            console.log('Connected to database');
            resolve();
        });
    });
};