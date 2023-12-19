const pool = require('../../database');

module.exports.GetSpecificOrder = (req, res) => {
    const Order_id = req.query.Order_id;
    pool.query(
        'Select orders.Order_id, orders.Customer_id, orders.OrderDate, orders.Note, orders.Payment_Status, orders.Payment_method, orders.Order_status, orders.Table_Number, orders.Waitress_id, orders.Restaurant_id, orders.NumberOfCustomers, orderitems.OrderitemID, orderitems.FoodID, orderitems.DrinkID, orderitems.Quantity from orders INNER JOIN orderitems ON orders.Order_id = orderitems.OrderID where orders.Order_id = ?',[Order_id],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(result);
            }
        },
    );
};