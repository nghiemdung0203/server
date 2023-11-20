const pool = require('../../database');

module.exports.AddDrink = (req, res) => {
    const { Drink_name, Drink_size, Drink_category, Drinks_price } = req.body;

    pool.query(
        'INSERT INTO drinks (Drink_name, Drink_size, Drink_category, Drink_price) VALUES (?, ?, ?, ?)',
        [Drink_name, Drink_size, Drink_category, Drinks_price],
        (error, result) => {
            if (error) {
                return res.status(400).send({ error });
            } else {
                return res.status(200).send(`Add ${Drink_name} successfully`);
            }
        },
    );
};
