const pool = require("../../database");

module.exports.UpdateFood = async (req, res) => {
  const { Food_id, Name, DescribeFood, Food_Price } = req.body;
  console.log(Food_id);

  let Avatar = null;
  if (req.file) {
    const AvatarPath = req.file.path;
    Avatar = await cloudinary.uploader.upload(AvatarPath, {
      resource_type: "image",
      folder: "Food",
    });
  }

  // Check if at least one property is provided for update
  if (!(Name && DescribeFood && Food_Price && Avatar)) {
    return res
      .status(400)
      .json({ error: "At least one property is required for update." });
  }

  // Build the SET clause for the SQL query dynamically based on provided parameters
  const setClause = [];
  if (Name) setClause.push(`Name = '${Name}'`);
  if (DescribeFood) setClause.push(`DescribeFood = '${DescribeFood}'`);
  if (Avatar) setClause.push(`Avatar = '${Avatar.url}'`);
  if (Food_Price) setClause.push(`Food_Price = '${Food_Price}'`);

  // Construct the SQL query
  const updateQuery = `UPDATE food SET ${setClause.join(
    ", "
  )} WHERE Food_id = ${Food_id}`;

  // Execute the update query
  pool.query(updateQuery, (error, result) => {
    if (error) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json({ message: "Food updated successfully" });
    }
  });
};
