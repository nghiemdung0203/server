const pool = require("../../database");

module.exports.UpdateTable = (req, res) => {
  const { Table_id, Status, NumberOfcustomer } = req.body;

  if (!Status && !NumberOfcustomer) {
    return res
      .status(400)
      .json({ error: "At least one property is required for update." });
  }
  const setClause = [];
  if (Status) setClause.push(`Status = '${Status}'`);
  if (NumberOfcustomer) setClause.push(`NumberOfcustomer = '${NumberOfcustomer}'`);

  // Construct the SQL query
  const updateQuery = `UPDATE tableForRestaurant SET ${setClause.join(
    ", "
  )} WHERE Table_id = ${Table_id}`;

  // Execute the update query
  pool.query(updateQuery, (error, result) => {
    if (error) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json({ message: "Table updated successfully" });
    }
  });
};
