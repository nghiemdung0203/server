const pool = require("../../database");
const cloudinary = require("../../cloudinary");

module.exports.CreateRestaurant = async (req, res) => {
  const { name, address, phoneNumber, description, Time, Number_of_table } =
    req.body;

  const AvatarPath = req.file.path;
  const Avatar = await cloudinary.uploader.upload(AvatarPath, {
    resource_type: "image",
    folder: "Restaurant",
  });

  const promisePool = pool.promise();

  pool.query(
    "INSERT INTO restaurant (Name, Address, PhoneNumber, Avatar, Number_of_tables, Time, Description) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, address, phoneNumber, Avatar.url, Number_of_table, Time, description],
    async (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        for (let i = 0; i < Number_of_table; i++) {
          try {
            const [rows, fields] = await promisePool.query(
              "INSERT INTO tableForRestaurant (NumberOfcustomer, RestaurantID) VALUES (?, ?)",
              [0, result.insertId]
            );
          } catch (error) {
            return res.status(500).send(err);
          }
        }

        pool.query(
          "INSERT INTO Menu (Restaurant_id) VALUES (?)",
          [result.insertId],
          (error, result) => {
            if (error) {
              return res.status(500).send(error);
            } else {
              res.status(200).send(`Create restaurant successfully`);
            }
          }
        );

        
      }
    }
  );
};