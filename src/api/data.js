import * as api from "./api.js";
import Parse from '../../node_modules/parse/dist/parse.js'
// import Parse from 'parse/dist/parse.min.js';

Parse.serverURL = 'https://parseapi.back4app.com';
Parse.initialize(
    '48BkBrVWc2vgaWll9O6ktpdDS4SKQoJla55qCjPq', // This is your Application ID
    'j2LuPEhDJVN3XfVnbuW4Ku1vpogMtKQ2QS0AVNum', // This is your Javascript key
  );

const host = 'https://parseapi.back4app.com';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application specific requests
export async function getCurrentUser(id) {
    return await api.getRequest(host + '/practice/' + id);
}

// Implement application specific requests
export async function getBasicItems() {
  return await api.getRequest(host + '/flashcards-basic');
}

export async function getAdvancedItems() {
  return await api.getRequest(host + '/flashcards-advanced');
}

export async function getWebItems() {
  return await api.getRequest(host + '/flashcards-web');
}

export async function getSingleItem(id) {
  return await api.getRequest(host + '/details/' + id);
}

export async function getMyItem() {
  const userId = sessionStorage.getItem('userId');
  return await api.getRequest(host + `/data/ideas?where=_ownerId%3D%22${userId}%22`);
}

export async function createItem(data) {
  return await api.postRequest(host + '/classes/Flashcard', data);
}

export async function editItem(id, data) {
  return await api.putRequest(host + `/data/ideas/${id}`, data);
}

export async function deleteItem(id) {
  return await api.deleteRequest(host + `/data/ideas/${id}`);
}