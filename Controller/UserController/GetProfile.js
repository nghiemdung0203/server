const pool = require('../../database');

module.exports.GetProfiles = (req, res) => {
    const UserID = req.query.UserID;
    console.log(UserID)
    pool.query(
        'Select profile.ID, profile.UserID, profile.Role, users.PhoneNumber ,restaurant.Name, restaurant.Address, restaurant.PhoneNumber from profile INNER JOIN restaurant ON profile.RestaurantID = restaurant.ID INNER JOIN users ON users.ID = profile.UserID Where UserID = ?',
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
