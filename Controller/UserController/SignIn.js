const bcrypt = require('bcrypt');
const pool = require('../../database');
const jwt = require('jsonwebtoken')

module.exports.SignIn = (req, res) => {
  const { email, password } = req.body;

  // Query the database to check if the user exists with the provided email
  pool.query(
    "SELECT * FROM Users WHERE email = ?",
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


      // Use bcrypt to compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.Password, (compareError, isMatch) => {
        if (compareError) {
          return res.status(500).json({ error: "Password comparison error" });
        }

        if (!isMatch) {
          // Passwords don't match
          return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // Passwords match, send the user data in the response
        return res.status(200).json(user);
      });
    }
  );
};


