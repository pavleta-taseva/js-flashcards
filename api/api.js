export const settings = {
    host: '',
};

export async function request(url, options) {
  try {
    const response = await fetch(url, options);

    if (response.ok == false) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    
    try{
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
    const options = {
        method,
        headers: {}
    };

    const token = localStorage.getItem('authToken');

    if (token !== null) {
        options.headers['X-Authorization'] = token;
    }

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

export async function login(email, password) {
    const result = await postRequest(settings.host + '/auth/login', { username, password });
    localStorage.setItem('username', result.username);
    localStorage.setItem('authToken', result.accessToken);
    localStorage.setItem('userId', result._id);

    return result;
}

export async function register(email, password ) {
    const result = await postRequest(settings.host + '/auth/register', { username, email, password});
    localStorage.setItem('username', result.username);
    localStorage.setItem('email', result.email);
    localStorage.setItem('authToken', result.accessToken);
    localStorage.setItem('userId', result._id);

    return result;
}

export async function logout() {
    const result = await getRequest(settings.host + '/auth/logout');
    console.log(result);
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');

    return result;
}