const pool = require("../../database");

module.exports.CreateMenu = (req, res) => {
  const { Restaurant_id } = req.body;
  pool.query(
    "INSERT INTO Menu (Restaurant_id) VALUES (?)",
    [Restaurant_id],
    (error, result) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        return res.status(200).send(result);
      }
    }
  );
};
