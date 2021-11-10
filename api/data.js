import * as api from "./api.js";

const host = 'https://js-flashcards.herokuapp.com/';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application specific requests
export async function getAllItems() {
    return await api.getRequest(host + '/');
}

export async function getSingleItem(id) {
    return await api.getRequest(host + '/details/' + id);
}

export async function getProfile() {
    const userId = sessionStorage.getItem('userId');
    return await api.getRequest(host + `/profile/${userId}`);
}

export async function getMyItem() {
    const userId = sessionStorage.getItem('userId');
    return await api.getRequest(host + `/data/ideas?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createItem(data) {
    return await api.postRequest(host + '/create', data);
}

export async function editItem(id, data) {
    return await api.putRequest(host + `/edit/${id}`, data);
}

export async function deleteItem(id) {
    return await api.deleteRequest(host + `/delete/${id}`);
}