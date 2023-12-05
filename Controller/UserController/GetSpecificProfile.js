const pool = require('../../database');
const jwt = require('jsonwebtoken');

module.exports.GetSpecificProfile = (req, res) => {
    const profileID = req.query.profileID;

    pool.query(
        'Select * from profile where ID = ?',
        [profileID],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                const {UserID, Role} = result[0];
                const token = jwt.sign(
                    {
                        UserID,
                        profileID,
                        Role,
                    },
                    process.env.TOKEN_SECRET, // Use your own secret key
                    {
                        expiresIn: '1h', // Set the expiration time for the token
                    },
                );
                result[0]['token'] = token
                return res.status(200).send(result);
            }
        },
    );
};
