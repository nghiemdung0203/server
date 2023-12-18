const pool = require('../../database');

module.exports.GetMenu = (req, res) => {
    const {profileID, Restaurant_id} = req.body
    pool.query(
        'Update profile '
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};