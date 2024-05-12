//use pg-promise
const pgp = require("pg-promise")();
require("dotenv").config()

const cn = {
    port: process.env.PG_PORT,
    user:process.env.PG_USER,
    host:process.env.PG_HOST,
    database:process.env.PG_DATABASE
}

const db = pgp(cn)

module.exports = db;