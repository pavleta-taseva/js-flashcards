import { register } from "../src/api/data.js";
import { notify } from "../src/views/notification.js";

export async function validateInput(username, email, password, repass) {
    if (username === '' || username === null || email === '' || email === null || password === '' || password === null || repass === null || repass === '') {
        return notify('All fields are required!');
    }

    if (username === 'admin') {
        return notify('Username cannot be "admin"');
    }

    if (password === 'password') {
        return notify('Password must be different! Try more unique one! :(')
    }

    if (password !== repass) {
        notify('Two passwords don\'t match!');
        return;
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

    if (isValid == false) {
        return notify('Password must be between 6 and 10 characters.');
    }

    if (isInvSymbol == true) {
        return notify('Password must consist only of letters and digits.');
    }

    if (hasDigits == false) {
        return notify('Password must have at least 2 digits.');
    }

    let cleanedUser = '';
    const usernamePattern = /[\/\\n\\r<>";&()^\s:*%+?${}|[\]\\@]+/gm;
    const test = usernamePattern.test(username);
    if (test == true) {
        for (let i = 0; i < username.length; i++) {
            let found = username[i].match(usernamePattern);
            if (found !== null && found.length > 0) {
                cleanedUser += '';
            } else {
                cleanedUser += username[i];
            }
        };
        notify(`Your username is set to ${cleanedUser}, according to our requirements!`)
        await register(cleanedUser, email, password);
    } else {
        await register(username, email, password);
    }
    page.redirect('/login');
}

export async function validateBgInput(username, email, password, repass) {
    if (username === '' || username === null || email === '' || email === null || password === '' || password === null || repass === null || repass === '') {
        notify('Всички полета са задължителни!');
        return;
    }

    if (username === 'admin') {
        return notify('Вашето име не може да бъде "admin"');
    }

    if (password === 'password') {
        return notify('Използвайте по-уникална парола! :(')
    }

    if (password !== repass) {
        notify('Двете пароли не съвпадат. Опитайте отново!');
        return;
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

    if (isValid == false) {
        return notify('Паролата трябва да бъде между 6 и 10 знака. ');
    }

    if (isInvSymbol == true) {
        return notify('Паролата Ви може да съдържа само букви и цифри. ');
    }

    if (hasDigits == false) {
        return notify('В паролата Ви трябва да има поне 2 цифри. ');
    }

    let cleanedUser = '';
    const usernamePattern = /[\/\\n\\r<>";&()^\s:*%+?${}|[\]\\@]+/gm;
    const test = usernamePattern.test(username);
    if (test == true) {
        for (let i = 0; i < username.length; i++) {
            let found = username[i].match(usernamePattern);
            if (found !== null && found.length > 0) {
                cleanedUser += '';
            } else {
                cleanedUser += username[i];
            }
        };
        await register(cleanedUser, email, password);
        notify(`Вашето име беше променено на ${cleanedUser}, съгласно нашите изисквания!`)
    } else {
        await register(username, email, password);
    }
    page.redirect('/login');
}

export async function validateChangedPassword(newPass, repeatPass) {
    let isValidPassword = false;
    if (repeatPass === '' || repeatPass === null || newPass === '' || newPass === null) {
        return notify('All fields are required!');
    }

    if (newPass === 'password') {
        return notify('Password must be different! Try more unique one! :(')
    }

    if (repeatPass !== newPass) {
        notify('Two passwords don\'t match!');
        return;
    }

    let chars = newPass.toString().split("");
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

    if (newPass.length < 6 || newPass.length > 10) {
        isValid = false;
    } else {
        isValid = true;
    }

    if (isValid == false) {
        return notify('Password must be between 6 and 10 characters. ');
    }

    if (isInvSymbol == true) {
        return notify('Password must consist only of letters and digits. ');
    }

    if (hasDigits == false) {
        return notify('Password must have at least 2 digits. ');
    }
    isValidPassword = true;
    return isValidPassword;
}

export function validateAddress(address) {
    if (address === null || address === '' || address === undefined) {
        notify('Please, enter your current address!');
        return;
    }

    if (typeof address !== 'string' || !address instanceof String) {
        return;
    }

    if (address.length <= 0 || address.length > 200) {
        return notify('The input is too long, please, provide shorter address');
    }

    let cleanedAddress = '';
    const addressPattern = /[\/<>";&()^*%+?${}|[\]\\@]+/gm;
    const test = addressPattern.test(address);
    if (test == true) {
        for (let i = 0; i < address.length; i++) {
            let found = address[i].match(addressPattern);
            if (found !== null && found.length > 0) {
                cleanedAddress += '';
            } else {
                cleanedAddress += address[i];
            }
        };
        notify(`The address submitted was changed to ${cleanedAddress}, according to our requirements!`);
        return cleanedAddress;
    } else {
        return address;
    }
}

export async function validatePhone(phone) {
    if (phone === '' || phone === null || phone === undefined) {
        notify('Please, write down your phone number!');
        return;
    }

    let chars = phone.toString().split("");
    let isValid = false;
    let pattern = /[+]{0,1}[0-9]{5,15}/g;
    let testPhone = pattern.test(phone);

    if (testPhone == true) {
        isValid = true;
    } else {
        isValid = false;
    }

    return isValid;
}