import Parse from '../../node_modules/parse/dist/parse.js';

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
        await user.signUp();
        Parse.User.logOut();
        localStorage.setItem('email', email);
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
        localStorage.removeItem('owner');
    } catch (error) {
        alert('Ops, something went wrong. Try again, please!');
        console.error(error);
    }
}