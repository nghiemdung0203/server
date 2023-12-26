const pool = require("../../database");
const cloudinary = require("../../cloudinary");

module.exports.UpdateRestaurant = async (req, res) => {
  const { RestaurantID, Name, Address, PhoneNumber, Time, Description } = req.body;

  const AvatarPath = req.file.path;
  const Avatar = await cloudinary.uploader.upload(AvatarPath, {
    resource_type: "image",
    folder: "Restaurant",
  });

  // Check if at least one property is provided for update
  if (!Name && !Address && !PhoneNumber && !Avatar && !Time && !Description) {
    return res
      .status(400)
      .json({ error: "At least one property is required for update." });
  }

  // Build the SET clause for the SQL query dynamically based on provided parameters
  const setClause = [];
  if (Name) setClause.push(`Name = '${Name}'`);
  if (Address) setClause.push(`Address = '${Address}'`);
  if (PhoneNumber) setClause.push(`PhoneNumber = '${PhoneNumber}'`);
  if (Time) setClause.push(`Time = '${Time}'`);
  if (Description) setClause.push(`Description = '${Description}'`);
  if (Avatar) setClause.push(`Avatar = '${Avatar.url}'`);

  // Construct the SQL query
  const updateQuery = `UPDATE restaurant SET ${setClause.join(
    ", "
  )} WHERE ID = ${RestaurantID}`;

  // Execute the update query
  pool.query(updateQuery, (error, result) => {
    if (error) {
      return res.status(500).json(error);
    } else {
      return res
        .status(200)
        .json({ message: "Restaurant updated successfully" });
    }
  });
};
