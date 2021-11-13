import * as api from "./api.js";
import Parse from 'parse/dist/parse.min.js';

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