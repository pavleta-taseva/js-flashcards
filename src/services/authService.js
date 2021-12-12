import Parse from '../../node_modules/parse/dist/parse.js';

export async function login(username, password) {
    try {
        let user = await Parse.User.logIn(username, password);
        const email = user.get('email');
        if (user.get('emailVerified')) {
            const currentUser = Parse.User.current();
            const sessionToken = currentUser.getSessionToken();
            localStorage.setItem('username', username);
            localStorage.setItem('authToken', sessionToken);
            localStorage.setItem('userId', currentUser.id);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        }
    } catch (error) {
        Parse.User.logOut();
        console.log('Please register first');
        return null;
        // return notify(error);
    }
}

export async function register(username, email, password) {
    const user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    try {
        await user.signUp();
        Parse.User.logOut();
        alert("Email must be verified. Please, visit your mail inbox for further instructions.");
        window.location.replace('/login');
    } catch (error) {
        alert("Ops, something went wrong: " + error);
        console.error(error);
    }
}

export async function logout() {
    try {
        Parse.User.logOut();
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('name');
    } catch (error) {
        alert('Ops, something went wrong. Try again, please!');
        console.error(error);
    }
}

export const getUser = () => {
    let username = localStorage.getItem('username');
    return username;
};

export const isAuthenticated = () => {
    return Boolean(getUser())
};

export const onDelete = async () => {
    const userId = localStorage.getItem('userId');
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
        // Finds the user by its ID
        let user = await query.get(userId);
        try {
            // Invokes the "destroy" method to delete the user
            let response = await user.destroy();
            localStorage.removeItem('username');
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('name');
            console.log('Deleted user', response);
        } catch (error) {
            console.error('Error while deleting user', error);
        }
    } catch (error) {
        console.error('Error while retrieving user', error);
    }
}

export async function getUserImage(userId) {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
        let user = await query.get(userId);
        const currentUserImage = await user.get('image');
        if (currentUserImage === undefined || currentUserImage === null) {
            currentUserImage.src = "../images/user.png";
        } else if (currentUserImage._url) {
            currentUserImage.src = currentUserImage.url();
        }
        currentUserImage.src = refreshImage('user-image', currentUserImage.url());

        function refreshImage(imgElement, imgURL) {
            let timestamp = new Date().getTime();
            let queryString = "?t=" + timestamp;
            currentUserImage.src = imgURL + queryString;
            return currentUserImage.src;
        }
        return currentUserImage.src;
    } catch (error) {
        console.error('Error while retrieving image', error);
    }
}