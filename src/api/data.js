import * as api from "./api.js";
import Parse from '../../node_modules/parse/dist/parse.js'

Parse.serverURL = 'https://parseapi.back4app.com';
Parse.initialize(
  '48BkBrVWc2vgaWll9O6ktpdDS4SKQoJla55qCjPq',
  'j2LuPEhDJVN3XfVnbuW4Ku1vpogMtKQ2QS0AVNum', 
);

const host = 'https://parseapi.back4app.com';
api.settings.host = host;