require("dotenv").config()

const host = process.env.PORT;

const dbHost = process.env.DB_HOST;

const dbPort = process.env.DB_PORT;

const dbDatabase = process.env.DB_DATABASE;

const mongoURL = process.env.DB_CONNECTION_STRING;

module.exports =  {
    'host':host,
    'dbhost': dbHost,
    'dbport' : dbPort,
    'database' : dbDatabase,
    'mongoUrl' : mongoURL
};
