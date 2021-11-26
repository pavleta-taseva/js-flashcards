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

