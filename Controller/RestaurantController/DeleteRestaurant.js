const { query } = require("express");
const pool = require("../../database");

module.exports.DeleteRestaurant = (req, res) => {
  const RestaurantID = req.query.RestaurantID;

  pool.query(
    "DELETE FROM manager WHERE Restaurant_id = ?",
    [RestaurantID],
    (err, ress) => {
      if (err) {
        res.status(500).send(err);
      } else {
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
      }
    }
  );
};
