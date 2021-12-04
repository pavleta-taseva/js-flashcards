import Parse from 'parse/dist/parse';
import { store } from 'react-notifications-component';
const baseUrl = 'https://parseapi.back4app.com/classes/Flashcard';

export const getCard = async (id) => {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('objectId', id);
    try {
        const results = await query.find();
        for (const object of results) {
            const category = object.get('category')
            const question = object.get('question')
            const answer = object.get('answer')
            const owner = object.get('owner')
            console.log(category);
            console.log(question);
            console.log(answer);
            console.log(owner);
        }
    } catch (error) {
        console.error('Error while fetching Flashcard', error);
    }
};

export const getAll = async () => {
    let response = await fetch(`${baseUrl}/pets`)

    let pets = await response.json();

    let result = Object.values(pets)

    return result;
};

export const create = async (data) => {
    if (data.category !== undefined && data.question !== undefined && data.answer !== undefined) {
        try {
            const newFlashcard = new Parse.Object('Flashcard');
            const currentUser = Parse.User.current();
            const category = data.category;
            const question = data.question;
            const answer = data.answer;
            newFlashcard.set('category', category);
            newFlashcard.set('question', question);
            newFlashcard.set('answer', answer);
            newFlashcard.set('owner', currentUser);
            currentUser.add('myCards', data = { category, question, answer, currentUser });
            try {
                const result = await newFlashcard.save();
                const response = await currentUser.save();
                console.log('User updated ', response);
                console.log('Flashcard created', result);
            } catch (error) {
                console.error('Error while creating Flashcard: ', error);
            }
        } catch (err) {
            console.log(err.message)
        }
    }
};

export const onEdit = async (id, data) => {
    const query = new Parse.Query('Flashcard');
    try {
        const object = await query.get(id);
        object.set('question', data.questionEdit);
        object.set('answer', data.answerEdit);
        try {
            const response = await object.save();
            console.log('Flashcard updated', response);
        } catch (error) {
            console.error('Error while updating Flashcard', error);
        }
    } catch (error) {
        console.error('Error while retrieving object Flashcard', error);
    }
};

export async function updateCardDetails(id, owner) {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('objectId', id);
    try {
        const results = await query.find();
        for (const object of results) {
            const question = object.get('question');
            const answer = object.get('answer');
            let currentOwner = object.get('owner');
            owner = currentOwner;
            const updatedCard = {
                question,
                answer,
                owner
            }
            return updatedCard;
        }
    } catch (error) {
        console.error('Error while fetching Flashcard', error);
    }
}

export async function getMyCards() {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    const userId = localStorage.getItem('userId');
    const myCards = [];

    try {
        const result = await query.find();
        const cards = JSON.parse(JSON.stringify(result));
        for (let current of cards) {
            const owner = current.owner.objectId;
            if (owner === userId) {
                myCards.push(current);
            }
        }
        return myCards;

    } catch (error) {
        console.error('Error while fetching Flashcard', error);
    }
}

export async function deleteCard(id) {
    const query = new Parse.Query('Flashcard');
    try {
        const object = await query.get(id);
        try {
            const response = await object.destroy();
            console.log('Deleted ParseObject', response);
        } catch (error) {
            console.error('Error while deleting ParseObject', error);
        }
    } catch (error) {
        console.error('Error while retrieving ParseObject', error);
    }
};

export async function practice(id) {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('objectId', id);
    try {
        const currentCard = await query.get(id);
        const currentUser = Parse.User.current();
        const cardIds = [];
        const practiceList = currentUser.get('practiceCards');
        for (let card of practiceList) {
            cardIds.push(card.id);

        }
        const length = cardIds.length;
        const check = cardIds.includes(currentCard.id);
        if (!check) {
            currentUser.add('practiceCards', currentCard);
            await currentUser.save();
            store.addNotification({
                title: "Card added to your Practice List!",
                message: `You have a total of ${length} cards on your practice list.`,
                type: "info",
                insert: "bottom-center",
                container: "center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
        } else {
            console.log('This card is already added to the Practice list.');
            store.addNotification({
                title: "This action cannot be executed!",
                message: "This card is already added to your Practice list.",
                type: "info",
                insert: "bottom-center",
                container: "center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
            return null;
        }
    } catch (err) {
        console.log(err.message)
    }
}

export async function checkIfInPracticeList(id, ownerId) {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('objectId', id);
    try {
        const currentCard = await query.get(id);
        const currentUser = Parse.User.current();
        const cardIds = [];
        const practiceList = currentUser.get('practiceCards');
        for (let card of practiceList) {
            cardIds.push(card.id);

        }
        const check = cardIds.includes(currentCard.id);        
        return check;
    } catch (err) {
        console.log(err.message)
    }
}