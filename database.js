const  Client = require('pg').Client
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "magexpress",
    password: "sab@1009",
    port: 5432,
})

module.exports = client;