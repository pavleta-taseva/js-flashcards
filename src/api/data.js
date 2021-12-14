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