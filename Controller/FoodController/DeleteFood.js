const pool = require("../../database");

module.exports.DeleteFood = (req, res) => {
  const { FoodID } = req.body;
  pool.query("Delete from food where ID = ?", [FoodID], (error, result) => {
    if (error) {
      return res.status(400).send({ error });
    } else {
      return res.status(200).send("Deleted food successfully");
    }
  });
};
