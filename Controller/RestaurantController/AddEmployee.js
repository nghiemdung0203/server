const pool = require("../../database");

module.exports.AddEmployee = (req, res) => {
    const { codeName, resID } = req.body;

    // Execute the update query
    pool.query(
        "UPDATE profile SET RestaurantID = ? WHERE CodeName = ?",
        [resID, codeName],
        (error, result) => {
            if (error) {
                return res.status(500).json(error);
            } else {
                return res
                    .status(200)
                    .json({ message: "Profile updated successfully" });
            }
        }
    );
};
