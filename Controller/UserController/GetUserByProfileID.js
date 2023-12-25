const pool = require('../../database');

module.exports.GetUserByProfileID = (req, res) => {
    const profileID = req.query.profileID;

    pool.query(
        'SELECT users.Name, users.Avatar FROM users ' +
        'INNER JOIN profile ON users.uid = profile.UserID ' +
        'WHERE profile.ID = ?',
        [profileID],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};
