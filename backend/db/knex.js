// db/knex.js
const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development); // Use the appropriate environment

module.exports = db;
