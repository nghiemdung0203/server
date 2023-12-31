const pool = require("../../database");
const cloudinary = require("../../cloudinary");
module.exports.UpdateDrink = async (req, res) => {
  const { DrinkID, DrinkName, DrinksPrice, Drink_Description } = req.body;
  console.log(DrinkID)
  let Avatar = null;
  if (req.file) {
    const AvatarPath = req.file.path;
    Avatar = await cloudinary.uploader.upload(AvatarPath, {
      resource_type: "image",
      folder: "Drink",
    });
  }

  // Check if at least one property is provided for update
  if (!(DrinkName && Drink_Description && DrinksPrice && Avatar)) {
    return res
      .status(400)
      .json({ error: "At least one property is required for update." });
  }

  // Build the SET clause for the SQL query dynamically based on provided parameters
  const setClause = [];
  if (DrinkName) setClause.push(`Drink_name = '${DrinkName}'`);
  if (Drink_Description) setClause.push(`Drink_size = '${Drink_Description}'`);
  if (Avatar) setClause.push(`Avatar = '${Avatar.url}'`);
  if (DrinksPrice) setClause.push(`Drink_price = '${DrinksPrice}'`);

  // Construct the SQL query
  const updateQuery = `UPDATE drinks SET ${setClause.join(
    ", "
  )} WHERE Drink_id = ${DrinkID}`;

  // Execute the update query
  pool.query(updateQuery, (error, result) => {
    if (error) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json({ message: "Drink updated successfully" });
    }
  });
};
