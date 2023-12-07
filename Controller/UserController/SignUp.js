const pool = require("../../database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");


module.exports.SignUp = async (req, res) => {
  
  const { email, uid, token, PhoneNumber } = req.body;
  // Create a user in the Users table


  pool.query(
    "INSERT INTO users (email, PhoneNumber, uid, token) VALUES (?, ?, ?, ?)",
    [email, PhoneNumber, uid, token],
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
