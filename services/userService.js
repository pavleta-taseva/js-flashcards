const User = require('../models/User.js');

async function createUser(username, email, hashedPassword) {
    try {
        const user = new User({
            username,
            email,
            hashedPassword
        });

        await user.save();
        console.log("Successful registration into the database: ", user);
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function getUserByUsername(username) {
    try {
        const pattern = new RegExp(`^${username}$`, 'i');
        const user = await User.findOne({ username: { $regex: pattern }});
        return user;
    } catch (error) {
    console.error(error);
    }
}

async function getUserByEmail(email) {
    try {
        const pattern = new RegExp(`^${email}$`, 'i');
        const user = await User.findOne({ email: { $regex: pattern }});
        return user;
    } catch (error) {
    console.error(error);
    }
}

async function getUserById(id) {
    try {
        const user = await User.findById(id).populate('listedFlashcards').lean();
        return user;
    } catch(err) {
        console.log(err.message);
        res.render('/');
    }
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById
}