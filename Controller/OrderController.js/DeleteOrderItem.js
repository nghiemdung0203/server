const pool = require('../../database');

module.exports.DeleteOrderItems = (req, res) => {
    const { OrderItemID } = req.body;
    pool.query(
        'Delete from orderitems where OrderItemID = ?',[OrderItemID],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send('Delete order item successfully');
            }
        },
    );
};
