const pool = require("../../db");

const getMonkseals = (req, res) => {
    pool.query("SELECT * FROM profile", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getMonkseals,
};