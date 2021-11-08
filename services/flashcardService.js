const Flashcard = require('../models/Flashcard.js');
const User = require('../models/User.js');

async function createFlashcard(flashcardData, ownerId) {
    const flashcard = new Flashcard(flashcardData);
    const user = await User.findById(ownerId);
    user.myCards.push(flashcard);
    await user.save();
    await flashcard.save();
    return flashcard;
}

async function getAll() {
    const flashcards = await Flashcard.find({}).lean();
    return flashcards;
}

async function getFlashcardById(id) {
    const flashcard = await Flashcard.findById(id).lean();
    return flashcard;
}

async function editFlashcardById(id, flashcardData) {
    const flashcard = await Flashcard.findById(id);
    flashcard.category = flashcardData.category;
    flashcard.question = flashcardData.question;
    flashcard.answer = flashcardData.answer;
    flashcard.popularity = flashcardData.popularity;
    return flashcard.save();
}

async function deleteFlashcard(id) {
    return await Flashcard.findByIdAndDelete(id);
}

async function practice(flashcardId, userId) {
    const user = await User.findById(userId);
    const flashcard = await Flashcard.findById(flashcardId);

    if(user._id == flashcard.owner) {
        throw new Error('You are not authorized to add your own flashcard to Practice list.');
    }

    user.listedFlashcards.push(flashcard);
    // flashcard.bookedBy.push(user);
    return Promise.all([user.save(), flashcard.save()]);
}

module.exports = {
    createFlashcard,
    getAll,
    getFlashcardById,
    editFlashcardById,
    deleteFlashcard,
    practice
}