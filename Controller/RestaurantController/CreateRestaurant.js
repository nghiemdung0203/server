const pool = require("../../database");
const cloudinary = require("../../cloudinary");

module.exports.CreateRestaurant = async (req, res) => {
  const {
    name,
    address,
    phoneNumber,
    description,
    Time,
    Number_of_table,
    profile_ID,
  } = req.body;

  const AvatarPath = req.file.path;
  const Avatar = await cloudinary.uploader.upload(AvatarPath, {
    resource_type: "image",
    folder: "Restaurant",
  });

  const promisePool = pool.promise();

  try {
    // Insert into restaurant table
    const [restaurantRows, restaurantFields] = await promisePool.query(
      "INSERT INTO restaurant (Name, Address, PhoneNumber, Avatar, Number_of_tables, Time, Description) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, phoneNumber, Avatar.url, Number_of_table, Time, description]
    );

    // Retrieve the inserted restaurant data
    const [insertedRestaurantRows, insertedRestaurantFields] = await promisePool.query(
      "SELECT * FROM restaurant WHERE ID = ?",
      [restaurantRows.insertId]
    );

    // Insert into Menu table
    await promisePool.query("INSERT INTO Menu (Restaurant_id) VALUES (?)", [restaurantRows.insertId]);

    // Update profile with RestaurantID
    await promisePool.query("UPDATE profile SET RestaurantID = ? WHERE ID = ?", [
      restaurantRows.insertId,
      profile_ID,
    ]);

    // Insert tables into tableforrestaurant
    for (var i = 1; i <= Number_of_table; i++) {
      await promisePool.query(
        "INSERT INTO tableForRestaurant (NumberOfcustomer, RestaurantID, STT) VALUES (?, ?, ?)",
        [0, restaurantRows.insertId, i]
      );
    }

    // Send the inserted restaurant data in the response
    res.status(200).send({ restaurantID: restaurantRows.insertId });
  } catch (error) {
    // Handle errors
    console.error("Error creating restaurant:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
