const pool = require("../../database");

module.exports.UpdateOrder = async (req, res) => {
    const { Order_id, Payment_Status, Payment_method, Order_status, Table_Number, Waitress_id } = req.body;

    if (!Order_id) {
        return res
            .status(400)
            .json({ error: "Order id property is required for update." });
    }

    // Check if at least one property is provided for update
    if (!Payment_Status && !Payment_method && !Order_status && !Table_Number && !Waitress_id) {
        return res
            .status(400)
            .json({ error: "At least one property is required for update." });
    }

    // Build the SET clause for the SQL query dynamically based on provided parameters
    const setClause = [];
    if (Payment_Status) setClause.push(`Payment_Status = '${Payment_Status}'`);
    if (Payment_method) setClause.push(`Payment_method = '${Payment_method}'`);
    if (Order_status) setClause.push(`Order_status = '${Order_status}'`);
    if (Table_Number) setClause.push(`Table_Number = '${Table_Number}'`);
    if (Waitress_id) setClause.push(`Waitress_id = '${Waitress_id}'`);



    // Construct the SQL query
    const updateQuery = `UPDATE orders SET ${setClause.join(
        ", "
    )} WHERE Order_id = ${Order_id}`;

    // Execute the update query
    pool.query(updateQuery, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        } else {
            return res
                .status(200)
                .json({ message: "Order updated successfully" });
        }
    });
};
