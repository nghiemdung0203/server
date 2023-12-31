const bcrypt = require("bcrypt");
const pool = require("../../database");
const jwt = require("jsonwebtoken");

module.exports.SignIn = (req, res) => {
  const { email, uid, token } = req.body;

  // Query the database to check if the user exists with the provided email
  pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        // No user found with the provided email
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = results[0]; // Assuming the query returns only one user

      pool.query(
        "UPDATE users SET token=? WHERE uid=?",
        [token, uid],
        (err, ress) => {
          if (err) {
            return res.status(500).send(err);
          } else {
            return res.status(200).json(user);
          }
        }
      );
    }
  );
};