const pool = require("../../database");
const cloudinary = require("../../cloudinary");
module.exports.UpdateUser = async (req, res) => {
    const { Name, uid } = req.body;

    const AvatarPath = req.file.path;
    const Avatar = await cloudinary.uploader.upload(AvatarPath, {
        resource_type: "image",
        folder: "Drink",
    });

    // Check if at least one property is provided for update
    if (!Name) {
        return res
            .status(400)
            .json({ error: "At least one property is required for update." });
    }

    // Build the SET clause for the SQL query dynamically based on provided parameters
    const setClause = [];
    if (Name) setClause.push(`Name = '${Name}'`);

    if (Avatar) setClause.push(`Avatar = '${Avatar.url}'`);

    // Construct the SQL query
    const updateQuery = `UPDATE users SET ${setClause.join(
        ", "
    )} WHERE uid = '${uid}'`;

    // Execute the update query
    pool.query(updateQuery, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        } else {
            return res
                .status(200)
                .json({ message: "User updated successfully" });
        }
    });
};
