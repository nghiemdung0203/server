const pool = require("../../database");

module.exports.DeleteDrink = (req, res) => {
  const { Drink_id } = req.query.Drink_id;
  pool.query("Delete from drinks where Drink_id = ?", [Drink_id], (error, result) => {
    if (error) {
      return res.status(400).send({ error });
    } else {
      return res.status(200).send("Deleted drink successfull");
    }
  });
};
