const getMonkseals = "SELECT * FROM accounts";
const getSealById = "SELECT * FROM accounts WHERE id = $1";
const checkSealIdExists = "SELECT p FROM accounts p WHERE p.sealid = $1";
const addSeal = "INSERT INTO accounts (sealid, name, size, sex, headscar) VALUES ($1, $2, $3, $4, $5)";
const removeSeal = "DELETE FROM accounts WHERE id = $1";
const updateSeal = "UPDATE accounts SET name = $1 WHERE id = $2";
const findSeal = "SELECT * FROM accounts WHERE sealid = $1 AND name = $2 AND size = $3 AND sex =$4 AND headscar = $5";


module.exports = {
    getMonkseals,
    getSealById,
    checkSealIdExists,
    addSeal,
    removeSeal,
    updateSeal,
    findSeal,
};