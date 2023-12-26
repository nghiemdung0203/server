const pool = require("../../database");

module.exports.RevenuInAWeek = async (req, res) => {
    const date = req.query.date;
    console.log(date);
    const promisePool = pool.promise();

    try {
        const [result] = await promisePool.query(
            'SELECT DATE_FORMAT(STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p"), "%m/%d/%Y") AS orderDay, ' +
            'SUM((food.Food_Price * orderitems.Quantity) + (drinks.Drink_Price * orderitems.Quantity)) AS dayRevenue ' +
            'FROM orders ' +
            'LEFT JOIN orderitems ON orders.Order_id = orderitems.OrderID ' +
            'LEFT JOIN food ON orderitems.FoodID = food.Food_id ' +
            'LEFT JOIN drinks ON orderitems.DrinkID = drinks.Drink_id ' +
            'WHERE STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p") BETWEEN DATE_SUB(STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p"), INTERVAL 7 DAY) ' +
            'AND STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p") ' +
            'GROUP BY orderDay',
            [date, date]
        );

        const revenue = result.map((row) => ({
            date: row.orderDay,
            total: row.dayRevenue || 0
        }));

        // After all queries are executed, send the final response
        res.status(200).send(revenue);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
