const pool = require("../../db");
const queries = require("./queries");
const { head } = require("./routes");

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

const findSeal = (req, res) => {
    const { sealid, name, size, sex, headscar } = req.body;
    
    // Build an array to hold the search parameters
    const searchParams = [];
    let searchQuery = 'SELECT * FROM accounts WHERE';
    
    // Check if seal ID is provided
    if (sealid) {
      searchParams.push(sealid);
      searchQuery += ' sealid = $' + searchParams.length + ' AND';
    }
    
    // Check if name is provided
    if (name) {
      searchParams.push(name);
      searchQuery += ' name = $' + searchParams.length + ' AND';
    }
    
    // Check if size is provided
    if (size) {
      searchParams.push(size);
      searchQuery += ' size = $' + searchParams.length + ' AND';
    }
    
    // Check if sex is provided
    if (sex) {
      searchParams.push(sex);
      searchQuery += ' sex = $' + searchParams.length + ' AND';
    }
    
    // Check if headscar is provided
    if (headscar) {
      searchParams.push(headscar);
      searchQuery += ' headscar = $' + searchParams.length + ' AND';
    }
    
    // Remove the trailing 'AND' from the query
    searchQuery = searchQuery.slice(0, -4);
    
    // Check if any search parameters were provided
    if (searchParams.length === 0) {
      res.send("No search parameters provided.");
      return;
    }
    
    // Find seals based on search parameters
    pool.query(searchQuery, searchParams, (error, results) => {
      if (error) {
        console.error('Error finding seals:', error);
        res.status(500).send("An error occurred while finding seals.");
      } else {
        res.status(200).send(results.rows);
      }
    });
  };



module.exports = {
    getMonkseals,
    getSealById,
    addSeal,
    removeSeal,
    updateSeal,
    findSeal,
};