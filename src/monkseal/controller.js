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
    pool.query(
      queries.addSeal,
      [sealid, name, size, sex, headscar],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Seal profile added successfully!");
      }
    );
  });
};

const removeSeal = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getSealById, [id], (error, results) => {
    const noSealFound = !results.rows.length;
    if (noSealFound) {
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
    if (noSealFound) {
      res.send("Seal does not exist in the database.");
    }

    pool.query(queries.updateSeal, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Seal updated successfully!");
    });
  });
};


const findSeal = (req, res) => {
  const searchParams = [];
  const conditions = [];

  const params = {
    sealid, name, size, sex, birthyear, birthisland, tagcolor, lefttag, righttag,
    identifiers, headfacescar, dorsalscar, ventralscar, rightlateralscar, leftlateralscar,
    rightforeflipperscar, leftforeflipperscar, hindflippersscar, scardetail,
    headfacebleach, dorsalbleach, ventralbleach, rightlateralbleach, leftlateralbleach,
    rightforeflipperbleach, leftforeflipperbleach, hindflippersbleach, bleachdetail,
    hawaiisighting, kauaisighting, molokaisighting, mauisighting, lanaisighting, oahusighting
  } = req.body;

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.push(value);
      conditions.push(`${key} = $${searchParams.length}`);
    }
  }

  if (searchParams.length === 0) {
    res.send("No search parameters provided.");
    return;
  }

  const searchQuery = `SELECT * FROM accounts WHERE ${conditions.join(" AND ")}`;

  pool.query(searchQuery, searchParams, (error, results) => {
    if (error) {
      console.error("Error finding seals:", error);
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
