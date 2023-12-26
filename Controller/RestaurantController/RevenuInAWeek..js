const pool = require("../../database");

module.exports.RevenuInAWeek = async (req, res) => {
    const date = req.query.date;
    console.log(date);
    const revenue = [];

    try {
        const promisePool = pool.promise();

        const [result] = await promisePool.query(
            'SELECT DISTINCT DATE(STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p")) AS orderDay FROM orders WHERE STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p") BETWEEN DATE_SUB(STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p"), INTERVAL 7 DAY) AND STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p")',
            [date, date]
        );

        await Promise.all(
            result.map(async (dayRow) => {
                const day = dayRow.orderDay;

                const [dayOrders] = await promisePool.query(
                    'SELECT * FROM orders WHERE DATE(STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p")) = ?',
                    [day]
                );

                const dayRevenue = dayOrders.reduce(
                    (acc, order) => {
                        const orderItems = order.OrderItems || [];
                        const orderRevenue = orderItems.reduce(
                            (itemAcc, item) => itemAcc + item.Food_Price * item.Quantity,
                            0
                        );
                        return acc + orderRevenue;
                    },
                    0
                );

                revenue.push({ day, dayRevenue });
            })
        );

        // After all inner queries are executed, send the final response
        res.status(200).send(revenue);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
