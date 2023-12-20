const pool = require("../../database");

module.exports.GetDrinks = (req, res) => {
    const { Drink_id } = req.query.Drink_id;
    pool.query('SELECT * FROM drinks where Drink_id = ?', [Drink_id], (error, result) => {
        if (error) {
            return res.status(500).send(error);
        } else {
            return res.status(200).send(result);
        }
    })
}