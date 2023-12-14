const pool = require('../../database');

module.exports.GetProfiles = (req, res) => {
    const UserID = req.query.UserID;
    console.log(UserID);

    pool.query(
        'SELECT profile.ID, profile.UserID, profile.Role FROM profile ' +
        'LEFT JOIN restaurant ON profile.RestaurantID = restaurant.ID ' +
        'INNER JOIN users ON users.uid = profile.UserID ' +
        'WHERE users.uid = ?',
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
