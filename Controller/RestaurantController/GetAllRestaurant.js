const pool = require("../../database");

module.exports.GetAllRestaurant = (req, res) => {
  pool.query("Select * from restaurant", (error, result) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(200).send(result);
    }
  });
};
