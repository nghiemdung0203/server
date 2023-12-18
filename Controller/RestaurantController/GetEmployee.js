const pool = require('../../database');

module.exports.GetEmployee = (req, res) => {
    const Restaurant_id = req.query.Restaurant_id;
    console.log(Restaurant_id)
    pool.query(
        'Select * from profile where RestaurantID = ? AND (Role != "Manager" OR Role = "Customer")',[Restaurant_id],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }

        },
    );
};  