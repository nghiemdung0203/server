const pool = require("../../database");

module.exports.UpdateDrink = (req, res) => {
    const { DrinkID, DrinkName, DrinkSize, DrinkCategory, DrinksPrice } = req.body;

    // Check if at least one property is provided for update
    if (!DrinkName && !DrinkSize && !DrinkCategory && !DrinksPrice) {
        return res.status(400).json({ error: "At least one property is required for update." });
    }

    // Build the SET clause for the SQL query dynamically based on provided parameters
    const setClause = [];
    if (DrinkName) setClause.push(`Drink_name = '${DrinkName}'`);
    if (DrinkSize) setClause.push(`Drink_size = '${DrinkSize}'`);
    if (DrinkCategory) setClause.push(`Drink_category = '${DrinkCategory}'`);
    if (DrinksPrice) setClause.push(`Drink_price = '${DrinksPrice}'`);

    // Construct the SQL query
    const updateQuery = `UPDATE drinks SET ${setClause.join(', ')} WHERE Drink_id = ${DrinkID}`;

    // Execute the update query
    pool.query(updateQuery, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json({ message: "Drink updated successfully" });
        }
    });
};
