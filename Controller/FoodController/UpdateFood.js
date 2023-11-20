const pool = require("../../database");

module.exports.UpdateFood = (req, res) => {
    const { FoodID, Name, DescribeFood, Expiry } = req.body;

    // Check if at least one property is provided for update
    if (!Name && !DescribeFood && !Expiry) {
        return res.status(400).json({ error: "At least one property is required for update." });
    }

    // Build the SET clause for the SQL query dynamically based on provided parameters
    const setClause = [];
    if (Name) setClause.push(`Name = '${Name}'`);
    if (DescribeFood) setClause.push(`DescribeFood = '${DescribeFood}'`);
    if (Expiry) setClause.push(`Expiry = '${Expiry}'`);

    // Construct the SQL query
    const updateQuery = `UPDATE Food SET ${setClause.join(', ')} WHERE ID = ${FoodID}`;

    // Execute the update query
    pool.query(updateQuery, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json({ message: "Food updated successfully" });
        }
    });
};
