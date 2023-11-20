const pool = require('../../database');

module.exports.GetSpecificOrder = (req, res) => {
    const { Order_id } = req.body;
    pool.query(
        'Select orders.Order_id, orders.Customer_id, orders.OrderDate, orderitems.OrderitemID, orderitems.FoodID, orderitems.DrinkID, orderitems.Quantity from orders INNER JOIN orderitems ON orders.Order_id = orderitems.OrderID where orders.Order_id = ?',[Order_id],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};