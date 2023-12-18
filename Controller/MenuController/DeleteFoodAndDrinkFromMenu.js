const pool = require("../../database");

module.exports.DeleteFoodAndDrinkFromMenu = (req, res) => {
  const { Food_id, Drink_id, Menu_id } = req.body;
  pool.query(
    "Delete from MenuItems where Menu_id = ? && Food_id = ? || Drink_id = ?",
    [Menu_id, Food_id, Drink_id],
    (error, result) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        return res.status(200).send(result);
      }
    }
  );
};
