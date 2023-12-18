const pool = require("../../database");

module.exports.DeleteFoodAndDrinkFromMenu = (req, res) => {
  const Food_id = req.query.Food_id;
  const Drink_id = req.query.Drink_id;
  const Menu_id = req.query.Menu_id;
  pool.query(
    "DELETE FROM MenuItems WHERE Menu_id = ? AND (Food_id = ? OR Drink_id = ?)",
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
