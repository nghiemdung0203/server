const pool = require("../../database");

module.exports.GetFood = (req, res) => {
    pool.query('SELECT * FROM food LIMIT 5', (error, result) => {
        if (error) {
            return res.status(500).send(error);
        } else {
            return res.status(200).send(result);
        }
    })
}