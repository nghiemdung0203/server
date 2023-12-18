const pool = require('../../database');

module.exports.GetMenu = (req, res) => {
    const {profileID, Restaurant_id} = req.body
    pool.query(
        'Select Menu.Menu_id, restaurant.Name, restaurant.Address, restaurant.PhoneNumber, MenuItems.FoodID, MenuItems.DrinkID, food.Name, food.DescribeFood, food.Food_Price, food.Avatar, drinks.Drink_name, drinks.Drink_size, drinks.Drink_Description from Menu INNER JOIN MenuItems ON Menu.Menu_id = MenuItems.Menu_id LEFT JOIN food ON MenuItems.Food_id = food.Food_id LEFT JOIN drinks ON MenuItems.Drink_id = drinks.Drink_id where Menu.Restaurant_id = ?',[Restaurant_id],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};