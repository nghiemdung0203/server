const pool = require("../../database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");


module.exports.SignUp = async (req, res) => {
  console.log(process.env.TOKEN_SECRET)
  const { email, password, name, avatar } = req.body;
  // Create a user in the Users table

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  pool.query(
    "INSERT INTO Users (email, password, name, avatar) VALUES (?, ?, ?, ?)",
    [email, encryptedPassword, name, avatar],
    (error, resultsInsert) => {
      if (error) {
        return res.status(400).send(error);
        // Handle the error
      } else {
        pool.query(
          "Select * from users where ID = ?",
          [resultsInsert.insertId],
          (error, results) => {
            return res.status(200).send(results[0]);
          }
        );

        // User has been successfully created
      }
    }
  );
};
