const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "monkseal-database.cmvfka0zffyx.us-west-1.rds.amazonaws.com",
    database: "monkseals",
    password: "holdenschermer",
    port: 5432,
});

module.exports = pool; 