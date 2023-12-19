const pool = require('../../database');

module.exports.GetOrder = (req, res) => {
    const profileID = req.query.profileID;
    pool.query(
        'Select * from orders where Customer_id = ?',[profileID],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};