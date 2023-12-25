const pool = require("../../database");

module.exports.RevenuInAWeek = (req, res) => {
    let revenu = 0;
    const date = req.query.date;
    console.log(date);

    pool.query(
        'SELECT * FROM orders WHERE STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p") IN (SELECT DISTINCT STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p") FROM orders WHERE STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p") BETWEEN DATE_SUB(STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p"), INTERVAL 7 DAY) AND STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p"))',
        [date, date],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            }

            // Use a Promise to ensure all inner queries are executed before sending the response
            Promise.all(
                result.map((row) => {
                    return new Promise((resolve) => {
                        pool.query(
                            "SELECT * FROM orderitems LEFT JOIN food ON orderitems.FoodID = food.Food_id LEFT JOIN drinks ON orderitems.DrinkID = drinks.Drink_id WHERE orderitems.OrderID = ?",
                            [row.Order_id],
                            (err, ress) => {
                                if (err) {
                                    resolve({ error: err.message });
                                } else {
                                    // Calculate revenue for each row and accumulate the total revenue
                                    const rowRevenue = ress.reduce(
                                        (acc, item) => acc + item.Food_Price * item.Quantity,
                                        0
                                    );
                                    revenu += rowRevenue;

                                    // Attach revenue to each row and resolve the promise
                                    resolve({ row, rowRevenue });
                                }
                            }
                        );
                    });
                })
            )
                .then((responses) => {
                    // After all inner queries are executed, send the final response
                    return res.status(200).send({ revenu });
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );
};