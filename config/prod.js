module.exports = {
    mongoURI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    TOKEN_SECRET: process.env. TOKEN_SECRET,
    COOKIE_NAME: 'authToken',
}