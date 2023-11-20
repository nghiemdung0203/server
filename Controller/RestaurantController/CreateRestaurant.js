const pool = require("../../database");

module.exports.CreateRestaurant = (req, res) => {
  const { name, address, phoneNumber, avatar } = req.body;

  pool.query(
    "INSERT INTO restaurant (Name, Address, PhoneNumber, Avatar) VALUES (?, ?, ?, ?)",
    [name, address, phoneNumber, avatar],
    (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send("Create restaurant successfully")
        }
    }
  );
};
