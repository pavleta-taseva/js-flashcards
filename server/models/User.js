const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    myCards: [{
        type: Schema.Types.ObjectId,
        ref: 'Flashcard',
        default: []
    }],
    favoriteFlashcards: [{
        type: Schema.Types.ObjectId,
        ref: 'Flashcard',
        default: []
    }]
});

module.exports = model('User', userSchema);