const pool = require('../../database');

module.exports.DeleteOrders = (req, res) => {
    const { OrderID } = req.body;
    pool.query('Delete From orderitems where OrderID = ?', [OrderID], (delError, delResult) => {
        if (delError) {
            return res.status(500).send(delError);
        } else {
            pool.query(
                'Delete from orders where Order_id = ?',[OrderID],
                (error, result) => {
                    if (error) {
                        return res.status(500).send(error);
                    } else {
                       return res.status(200).send("Delete Order successfully")
                    }
                },
            );
        }
    })
    
};
