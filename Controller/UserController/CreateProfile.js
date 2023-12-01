const pool = require("../../database");
const jwt = require("jsonwebtoken");

module.exports.CreateProfile = (req, res) => {
  const { UserID, Role, restaurantID, isWorking } = req.body;

  if (Role !== "Customer" && !restaurantID && !isWorking) {
    return res
      .status(500)
      .json({ error: "Staff role requires more information" });
  } else if (Role === "Customer" && restaurantID || Role === 'Customer' && isWorking) {
    return res
      .status(500)
      .json({ error: "Customer role doesn't need restaurantID and working status" });
  }

  pool.query(
    "INSERT INTO profile (UserID, Role, restaurantID, isWorking) VALUES (?, ?, ?, ?)",
    [UserID, Role, restaurantID, isWorking],
    (error, result) => {
      if (error) {
        return res.status(400).send(error);
        // Handle the error
      } else {
        const profileID = result.insertId;

        // Create a token
        const token = jwt.sign(
          {
            UserID,
            profileID,
            Role,
          },
          process.env.TOKEN_SECRET, // Use your own secret key
          {
            expiresIn: "24h", // Set the expiration time for the token
          }
        );

        pool.query(
          "SELECT * FROM profile WHERE ID = ?",
          [result.insertId],
          (error, resu) => {
            resu[0]["token"] = token;
            return res.status(200).send(resu);
          }
        );
        //Create a new profile successfully
      }
    }
  );
};
