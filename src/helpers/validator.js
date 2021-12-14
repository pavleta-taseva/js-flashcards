import * as authService from "../services/authService.js";
import notification from "./notification.js";

export async function validateInput(username, email, password, repass) {
    if (username === '' 
    || username === undefined 
    || email === '' 
    || email === undefined 
    || password === '' 
    || password === undefined 
    || repass === '' 
    || repass === undefined) {
        return notification('Missing information', 'All fields are required!');
    }

    if (username === 'admin') {
        return notification('Problem found', 'Username cannot be "admin"');
    }

    if (password === 'password') {
        return notification('Problem found', 'Password too easy! Try more unique one')
    }

    if (password !== repass) {
        return notification('Problem found', 'Two passwords don\'t match!');
    }

    if (typeof username !== 'string' || !username instanceof String) {
        return;
    }

    let chars = password.toString().split("");
    let digits = 0;
    let isValid = false;
    let isInvSymbol = false;
    let hasDigits = false;

    // Checks if the char is a num and if it has 2 digits at least
    for (let i = 0; i < chars.length; i++) {
        let current = Number(chars[i]);
        if (Number.isInteger(current)) {
            digits++;
            if (digits >= 2) {
                hasDigits = true;
            }
        }
    }

    // Checks if a char is letter or digit only
    for (let j = 0; j < chars.length; j++) {
        let currChar = chars[j];
        if ((currChar.charCodeAt() >= 48 && currChar.charCodeAt() <= 57) || (currChar.charCodeAt() >= 65 && currChar.charCodeAt() <= 90) || (currChar.charCodeAt() >= 97 && currChar.charCodeAt() <= 122)) {
            isInvSymbol = false;
        } else {
            isInvSymbol = true;
            break;
        }
    }

    if (password.length < 6 || password.length > 10) {
        isValid = false;
    } else {
        isValid = true;
    }

    if (isValid === false) {
        return notification('Problem found', 'Password must be between 6 and 10 characters.');
    }

    if (isInvSymbol === true) {
        return notification('Problem found','Password must consist only of letters and digits.');
    }

    if (hasDigits === false) {
        return notification('Problem found', 'Password must have at least 2 digits.');
    }

    let cleanedUser = '';
    const usernamePattern = /[/\\n\\r<>";&()^\s:*%+?${}|[\]\\@]+/gm;
    const test = usernamePattern.test(username);
    if (test === true) {
        for (let i = 0; i < username.length; i++) {
            let found = username[i].match(usernamePattern);
            if (found !== null && found.length > 0) {
                cleanedUser += '';
            } else {
                cleanedUser += username[i];
            }
        };
        notification('We are sorry!', `Your username is set to ${cleanedUser}, according to our requirements!`);
        await authService.register(cleanedUser, email, password);
    } else {
        await authService.register(username, email, password);
        
    }
}