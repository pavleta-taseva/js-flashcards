const { Schema, model } = require('mongoose');

const flashcardSchema = new Schema({
    category: {
        type: String,
        required: [true, 'Category is required.'],
        enum: ['JS Basics', 'JS Advanced', 'JS Web']
    },
    question: {
        type: String,
        required: [true, 'Question is required.'],
        minLength: 10,
        maxLength: 500,
    },
    answer: {
        type: String,
        required: [true, 'Answer is required.'],
        minLength: 10,
        maxLength: 500,
    },
    popularity: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner is required.'],
    }
});

module.exports = model('Flashcard', flashcardSchema);