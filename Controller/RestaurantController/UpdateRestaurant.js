const pool = require('../../database');

module.exports.UpdateRestaurant = (req, res) => {
    const { RestaurantID, Name, Address, PhoneNumber, Avatar } = req.body;

    // Check if at least one property is provided for update
    if (!Name && !Address && !PhoneNumber && !Avatar) {
        return res.status(400).json({ error: 'At least one property is required for update.' });
    }

    // Build the SET clause for the SQL query dynamically based on provided parameters
    const setClause = [];
    if (Name) setClause.push(`Name = '${Name}'`);
    if (Address) setClause.push(`Address = '${Address}'`);
    if (PhoneNumber) setClause.push(`PhoneNumber = '${PhoneNumber}'`);
    if (Avatar) setClause.push(`Avatar = '${Avatar}'`);

    // Construct the SQL query
    const updateQuery = `UPDATE Restaurant SET ${setClause.join(', ')} WHERE ID = ${RestaurantID}`;

    // Execute the update query
    pool.query(updateQuery, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json({ message: 'Restaurant updated successfully' });
        }
    });
};
