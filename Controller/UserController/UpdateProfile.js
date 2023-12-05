const pool = require("../../database");

module.exports.UpdateProfile = (req, res) => {
    const {RestaurantID, isWorking} = req.body;
    const {profileID} = req.user
    // Check if at least one property is provided for update
    if (!RestaurantID && !isWorking ) {
        return res.status(400).json({ error: "At least one property is required for update." });
    }

    // Build the SET clause for the SQL query dynamically based on provided parameters
    const setClause = [];
    if (RestaurantID) setClause.push(`RestaurantID = '${RestaurantID}'`);
    if (isWorking) setClause.push(`isWorking = '${isWorking}'`);

    // Construct the SQL query
    const updateQuery = `UPDATE profile SET ${setClause.join(', ')} WHERE ID = ${profileID}`;

    // Execute the update query
    pool.query(updateQuery, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json({ message: "Profile updated successfully" });
        }
    });
};
