const pool = require("../../database");

module.exports.CreateOrder = (req, res) => {
  const { profileID } = req.user;
  const { Table_Number, Waitress_id, Restaurant_id, NumberOfCutomers, OrderDate } = req.body;
  pool.query(
    "INSERT INTO orders (Customer_id, Table_Number, Waitress_id, Restaurant_id, NumberOfCustomers, OrderDate) VALUES (?, ?, ?, ?, ?, ?)",
    [profileID, null, null, Restaurant_id, NumberOfCutomers, OrderDate],
    (error, result) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        return res.status(200).send(result);
      }
    }
  );
};
