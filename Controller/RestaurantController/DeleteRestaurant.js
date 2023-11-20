const pool = require("../../database");

module.exports.DeleteRestaurant = (req, res) => {
  const { RestaurantID } = req.body;

  pool.query(
    "DELETE FROM restaurant WHERE ID = ?",
    [RestaurantID],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send("Deleted successfully");
      }
    }
  );
};
