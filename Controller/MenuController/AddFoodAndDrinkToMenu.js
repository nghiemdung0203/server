const pool = require("../../database");

module.exports.AddFoodAndDrinkToMenu = (req, res) => {
  const { MenuID, FoodItems, DrinkItems } = req.body;

  if (!MenuID) {
    return res.status(400).send("Invalid MenuID");
  } else if (!FoodItems && !DrinkItems) {
    return res.status(400).send("Something is wrong with the order");
  }

  const foodPromises = FoodItems
    ? FoodItems.map((item) => {
        const { food_id } = item;
        return executeQuery(
          "INSERT INTO orderitems (MenuID, FoodID) VALUES (?, ?)",
          [MenuID, food_id]
        );
      })
    : [];

  const drinkPromises = DrinkItems
    ? DrinkItems.map((item) => {
        const { drink_id } = item;
        return executeQuery(
          "INSERT INTO orderitems (MenuID, DrinkID) VALUES (?, ?)",
          [MenuID, drink_id]
        );
      })
    : [];

  // Combine all promises and wait for them to complete
  Promise.all([...foodPromises, ...drinkPromises])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
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
