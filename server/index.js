const express = require('express');
const { PORT } = require('./config');
const database = require('./config/database.js');
const expressConfig = require('./config/express.js');
const routesConfig = require('./config/routes.js');

start();

async function start() {
    const app = express();
    await database(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
}
