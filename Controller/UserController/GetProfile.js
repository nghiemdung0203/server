const pool = require('../../database');

module.exports.GetProfiles = (req, res) => {
    const { UserID } = req.body;
    pool.query(
        'Select profile.ID, profile.UserID, profile.Role, profile.PhoneNumber, restaurant.Name, restaurant.Address, restaurant.PhoneNumber from profile INNER JOIN restaurant ON profile.RestaurantID = restaurant.ID Where UserID = ?',
        [UserID],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};
