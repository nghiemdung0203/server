const pool = require("../../database");

module.exports.CreateTable = (req, res) => {
  const { Status, NumberOfcustomer } = req.body;

  pool.query(
    "INSERT INTO tableForRestaurant (Status, NumberOfcustomer) VALUES (?, ?)",
    [Status, NumberOfcustomer],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send("Createed table for Restaurant successful");
      }
    }
  );
};
