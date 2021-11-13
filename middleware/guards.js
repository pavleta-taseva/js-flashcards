// Creating factory functions
function isRegistered() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.json({ message: 'Logged users are not authorized for this action. '});
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
           next();
        } else {
            res.json({ message: 'Guests are not authorized for this action. '});
        }
    }
}

module.exports = {
    isRegistered,
    isGuest
}