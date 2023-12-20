const pool = require("../../database");

module.exports.GetFood = (req, res) => {
    const FoodID  = req.query.FoodID;
    pool.query('SELECT * FROM food where Food_id = ?', [FoodID], (error, result) => {
        if (error) {
            return res.status(500).send(error);
        } else {
            return res.status(200).send(result);
        }
    })
}