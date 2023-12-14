const pool = require("../../database");
const cloudinary = require("../../cloudinary");

module.exports.CreateRestaurant = async (req, res) => {
  const { name, address, phoneNumber, description, Time, Number_of_table } =
    req.body;

  const Number_of_Tables = parseInt(Number_of_table, 10);

  const AvatarPath = req.file.path;
  const Avatar = await cloudinary.uploader.upload(AvatarPath, {
    resource_type: "image",
    folder: "Restaurant",
  });

  pool.query(
    "INSERT INTO restaurant (Name, Address, PhoneNumber, Avatar, Number_of_tables, Time, Description) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      address,
      phoneNumber,
      Avatar.secure_url,
      Number_of_Tables,
      Time,
      description,
    ],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      }
      pool.query(`DECLARE @COUNTER INT SET @COUNTER = 1 WHILE (@COUNTER <= ${Number_of_Tables}) BEGIN  INSERT INTO tableForRestaurant (NumberOfcustomer, RestaurantID) VALUES (0, ${result.insertId}) END`, (err, ress) => {
                            if (err) {
                              return res.status(500).send(err)
                            }else {
                              return res.status(200).send("Created successfully")
                            }
                          });
    }
  );
};