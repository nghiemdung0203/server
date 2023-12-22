const pool = require('../../database');

module.exports.GetOrderByRestaurant = (req, res) => {
    const Restaurant_id = req.query.Restaurant_id;
    pool.query(
        'Select * from orders where Restaurant_id = ?',[Restaurant_id],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};