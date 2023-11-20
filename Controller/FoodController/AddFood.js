const pool = require("../../database");

module.exports.AddFood = (req, res) => {
  const { Name, DescribeFood, Expiry } = req.body;
  
  pool.query("INSERT INTO food (Name, DescribeFood, Expiry) VALUES (?, ?, ?)", [Name, DescribeFood, Expiry], (error, result) => {
    if (error) {
      return res.status(400).send({error});
    } else {
      return res.status(200).send("Add food successfully");
    }
  })
};
