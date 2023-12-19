const pool = require("../../database");

module.exports.AddEmployee = (req, res) => {
    const {codeName, resID} = req.body;

    // Construct the SQL query
    const updateQuery = `UPDATE profile SET RestaurantID = '${resID}' WHERE CodeName = ${codeName}`;

    // Execute the update query
    pool.query(updateQuery, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json({ message: "Profile updated successfully" });
        }
    });
};