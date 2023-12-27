const pool = require("../../database");

module.exports.RevenuInAWeek = async (req, res) => {
    const date = req.query.date;
    console.log(date);
    const promisePool = pool.promise();

    try {
        const [result] = await promisePool.query(
            'SELECT DISTINCT DATE_FORMAT(STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p"), "%m/%d/%Y") AS orderDay ' +
                "FROM orders " +
                'WHERE STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p") BETWEEN DATE_SUB(STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p"), INTERVAL 7 DAY) ' +
                'AND STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p")',
            [date, date]
        );

        const revenue = await Promise.all(
            result.map(async (row) => {
                const day = row.orderDay;

                var parts = day.split("/");
                var formattedDate =
                    parts[2] +
                    "-" +
                    ("0" + parts[0]).slice(-2) +
                    "-" +
                    ("0" + parts[1]).slice(-2);

                const [dayOrders] = await promisePool.query(
                    'SELECT * FROM orders WHERE DATE(STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p")) = ?',
                    [formattedDate]
                );

                const dayRevenue = dayOrders.reduce(async (acc, order) => {
                    const orderItems = await promisePool.query(
                        "SELECT * FROM orderitems LEFT JOIN food ON orderitems.FoodID = food.Food_id LEFT JOIN drinks ON orderitems.DrinkID = drinks.Drink_id WHERE orderitems.OrderID = ?",
                        [order.Order_id]
                    );

                    const orderTotal = orderItems.reduce(
                        (itemAcc, item) =>
                            itemAcc +
                            (item.Food_Price || 0) * item.Quantity +
                            (item.Drink_Price || 0) * item.Quantity,
                        0
                    );

                    return acc + orderTotal;
                }, 0);

                return { date: day, total: dayRevenue || 0 };
            })
        );

        // After all queries are executed, send the final response
        res.status(200).send(revenue);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
