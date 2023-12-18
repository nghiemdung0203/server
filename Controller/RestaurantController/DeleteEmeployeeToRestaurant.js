const pool = require('../../database');

module.exports.DeleteEmeployeeToRestaurant = (req, res) => {
    const {profileID, Restaurant_id} = req.body
    pool.query(
        'Update profile Set RestaurantID = NULL, isWorking = 0, CodeName = NULL, Time = 0 WHERE RestaurantID = ? && ID = ?', [Restaurant_id, profileID],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};