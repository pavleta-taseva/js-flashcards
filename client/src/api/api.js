// import { notify } from "../views/notification.js";
import Parse from 'parse/dist/parse.min.js';

export const settings = {
    host: '',
};

export async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok === false) {
            const error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function getOptions(method = 'get', body) {
    const token = localStorage.getItem('authToken');

    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': '48BkBrVWc2vgaWll9O6ktpdDS4SKQoJla55qCjPq',
            'X-Parse-REST-API-Key': 'olOWe8T6CIAopabzFFs06fBqVMWQNu2C5eo8I35m',
            'X-Parse-Revocable-Session': '1',
            'X-Parse-Session-Token': token,
        }
    };

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function getRequest(url) {
    return await request(url, getOptions());
}

export async function postRequest(url, data) {
    return await request(url, getOptions('post', data));
}

export async function putRequest(url, data) {
    return await request(url, getOptions('put', data));
}

export async function deleteRequest(url) {
    return await request(url, getOptions('delete'));
}

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
        }
    } catch (error) {
        Parse.User.logOut();
        console.log('User logged in. Please verify your email first');
        // return notify(error);
    }
}

export async function register(username, email, password) {
    const user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    try {
        let userResult = await user.signUp();
        Parse.User.logOut();
        localStorage.setItem('email', email);
        alert("Email must be verified. Please, visit your mail inbox for further instructions.");
    } catch (error) {
        alert("Ops, something went wrong: " + error);
        console.error(error);
    }
}

export async function logout() {
    try {
        Parse.User.logOut();
        alert('You\'ve been logged out.');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
    } catch (error) {
        alert('Ops, something went wrong. Try again, please!');
        console.error(error);
    }
}

export async function passwordReset(email) {
    try {
        // Pass the username and password to logIn function
        let result = await Parse.User.requestPasswordReset(email);
        // Password reset request was sent successfully
        const languageBtn = document.getElementById('language');
        const language = languageBtn.innerText;
        if (language === 'BG') {
            // notify('Reset password email sent successfully');
        } else {
            // notify('На електронния Ви адрес е изпратена заявка за смяна на паролата Ви.');
        }
    } catch (error) {
        console.error('Error while creating request to reset user password', error);
        // notify('Error while creating request to reset user password', error);
    }
}

export async function changePassword(id, password) {
    const User = new Parse.User();
    const query = new Parse.Query(User);

    try {
        // Finds the user by its ID
        let user = await query.get(id);
        // Updates the data we want
        user.set('password', password);
        try {
            // Saves the user with the updated data
            let response = await user.save();
            const languageBtn = document.getElementById('language');
            const language = languageBtn.innerText;
            Parse.User.logOut();
            await logout();
            if (language === 'BG') {
                // notify('Your password was changed successfully! Please, login with your new credentials.');
            } else {
                // notify('Успешно променихте Вашата парола. Моля, използвайте новата парола, за да влезете във Вашия профил!');
            }
        } catch (error) {
            console.error('Error while updating user', error);
        }
    } catch (error) {
        console.error('Error while retrieving user', error);
    }
}
  