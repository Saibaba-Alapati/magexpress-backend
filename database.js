const  Client = require('pg').Client
const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: 5432,
})

module.exports = client;