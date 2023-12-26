const pool = require("../../database");

module.exports.RevenuInAWeek = (req, res) => {
    const date = req.query.date;
    console.log(date);
    const revenue = [];

    pool.query(
        'SELECT DISTINCT DATE(STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p")) AS orderDay FROM orders WHERE STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p") BETWEEN DATE_SUB(STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p"), INTERVAL 7 DAY) AND STR_TO_DATE(?, "%m/%d/%Y, %h:%i:%s %p")',
        [date, date],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            }

            // Use a Promise to ensure all inner queries are executed before sending the response
            Promise.all(
                result.map((dayRow) => {
                    return new Promise((resolve) => {
                        const day = dayRow.orderDay;

                        pool.query(
                            'SELECT * FROM orders WHERE DATE(STR_TO_DATE(orderDate, "%m/%d/%Y, %h:%i:%s %p")) = ?',
                            [day],
                            (err, dayOrders) => {
                                if (err) {
                                    resolve({ error: err.message });
                                } else {
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
                                    resolve(revenue);
                                }
                            }
                        );
                    });
                })
            )
                .then((responses) => {
                    // After all inner queries are executed, send the final response
                    return res.status(200).send(responses);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );
};
