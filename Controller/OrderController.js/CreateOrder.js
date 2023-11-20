const pool = require('../../database');

module.exports.CreateOrder = (req, res) => {
    const { profileID } = req.user;
    console.log(profileID)
    pool.query(
        'INSERT INTO orders (Customer_id) VALUES (?)',[profileID],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};
