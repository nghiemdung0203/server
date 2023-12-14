const pool = require("../../database");

module.exports.CreateRestaurant = async(req, res) => {
  const { name, address, phoneNumber, description, Time, Number_of_table } = req.body;

  const AvatarPath = req.file.path
    const Avatar = await cloudinary.uploader.upload(AvatarPath, {
      resource_type: "image",
      folder: 'Restaurant'
    });

  pool.query(
    "INSERT INTO restaurant (Name, Address, PhoneNumber, Avatar, Number_of_tables, Time, Description) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, address, phoneNumber, Avatar, description, Time, Number_of_table],
    (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else {
            pool.query('INSERT INTO tableForRestaurant (NumberOfcustomer, RestaurantID) VALUES (?, ?)', [0, result.insertId], (err, ress) => {
              if (err) {
                return res.status(500).send(err);
              } else {
                res.status(200).send("Create restaurant successfully");
              }
            })
        }
    }
  );
};
