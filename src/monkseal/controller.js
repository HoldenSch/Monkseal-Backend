const pool = require("../../db");
const queries = require("./queries");

const getMonkseals = (req, res) => {
    pool.query(queries.getMonkseals, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getSealById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getSealById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addSeal = (req, res) => {
    const { sealid, name, size, sex, headscar } = req.body;
    // check if email exists
    pool.query(queries.checkSealIdExists, [sealid], (error, results) => {
        if (results.rows.length) {
            res.send("Seal ID already exists.");
        }
        
        // add seal to database
        pool.query(queries.addSeal, [sealid, name, size, sex, headscar], (error, results) => {
            if (error) throw error;
            res.status(201).send("Seal profile added successfully!");
        });
    });
};

const removeSeal = (req, res) => {
    const id = parseInt(req.params.id);
    
    pool.query(queries.getSealById, [id], (error, results) => {
        const noSealFound = !results.rows.length;
        if(noSealFound){
            res.send("Seal does not exist in the database.");
        }

        pool.query(queries.removeSeal, [id], (error, results) => {
            if (error) throw error;
                res.status(200).send("Seal removed successfully.");
        });
    });
};

const updateSeal = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;   

    pool.query(queries.getSealById, [id], (error, results) => {
        const noSealFound = !results.rows.length;
        if(noSealFound) {
            res.send("Seal does not exist in the database.");
        }

        pool.query(queries.updateSeal, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Seal updated successfully!");
        });
    });
};


module.exports = {
    getMonkseals,
    getSealById,
    addSeal,
    removeSeal,
    updateSeal,
};