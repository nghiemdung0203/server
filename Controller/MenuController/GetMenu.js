const pool = require('../../database');

module.exports.GetMenu = (req, res) => {
    const Restaurant_id = req.query.Restaurant_id;
    pool.query(
        'Select Menu.Menu_id, restaurant.Name, restaurant.Address, restaurant.PhoneNumber, MenuItems.Food_id, MenuItems.Drink_id, food.Name, food.DescribeFood, food.Food_Price, food.Avatar, drinks.Drink_name, drinks.Drink_price, drinks.Avatar, drinks.Drink_Description from Menu INNER JOIN MenuItems ON Menu.Menu_id = MenuItems.Menu_id LEFT JOIN food ON MenuItems.Food_id = food.Food_id LEFT JOIN drinks ON MenuItems.Drink_id = drinks.Drink_id Inner Join restaurant ON Menu.Restaurant_id = restaurant.ID where Menu.Restaurant_id = ?',[Restaurant_id],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};