const pool = require('../../database');

module.exports.AddFoodAndDrinkToOrder = (req, res) => {
    const { OrderID, FoodItems, DrinkItems } = req.body;

    if (!OrderID) {
        return res.status(400).send('Invalid Order ID');
    } else if (!FoodItems && !DrinkItems) {
        return res.status(400).send('Something is wrong with the order');
    }

    const foodPromises = FoodItems
        ? FoodItems.map(item => {
              const { food_id, quantity } = item;
              return executeQuery('INSERT INTO orderitems (OrderID, FoodID, Quantity) VALUES (?, ?, ?)', [
                  OrderID,
                  food_id,
                  quantity,
              ]);
          })
        : [];

    const drinkPromises = DrinkItems
        ? DrinkItems.map(item => {
              const { drink_id, quantity } = item;
              return executeQuery('INSERT INTO orderitems (OrderID, DrinkID, Quantity) VALUES (?, ?, ?)', [
                  OrderID,
                  drink_id,
                  quantity,
              ]);
          })
        : [];

    // Combine all promises and wait for them to complete
    Promise.all([...foodPromises, ...drinkPromises])
        .then(results => {
            res.status(200).send(results);
        })
        .catch(error => {
            res.status(400).send(error);
        });
};

// Helper function to execute a database query and return a promise
function executeQuery(sql, values) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
