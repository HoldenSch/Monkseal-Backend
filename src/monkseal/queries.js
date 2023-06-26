const getMonkseals = "SELECT * FROM profile";
const getSealById = "SELECT * FROM profile WHERE id = $1";
const checkSealIdExists = "SELECT p FROM profile p WHERE p.sealid = $1";
const addSeal = "INSERT INTO profile (sealid, name, size, sex, headscar) VALUES ($1, $2, $3, $4, $5)";
const removeSeal = "DELETE FROM profile WHERE id = $1";
const updateSeal = "UPDATE profile SET name = $1 WHERE id = $2";


module.exports = {
    getMonkseals,
    getSealById,
    checkSealIdExists,
    addSeal,
    removeSeal,
    updateSeal,
};