const pool = require("../../database");

module.exports.GetTables = (req, res) => {

    //Lấy bàn theo id nhà hàng 
    pool.query('SELECT * FROM tableForRestaurant LIMIT 5', (error, result) => {
        if (error) {
            return res.status(500).send(error);
        } else {
            return res.status(200).send(result);
        }
    })
}