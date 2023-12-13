const pool = require("../../database");

module.exports.CompletePayment = (req, res) => {
  const Order_id  = req.query.Order_id;
  pool.query(
    `Update orders SET Payment_Status = 1 Where Order_id = ${Order_id}`,
    (error, result) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        return res.status(200).send(result);
      }
    }
  );
};
