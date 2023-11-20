const pool = require("../../../database");

module.exports.createManager = (req, res) => {
  const { UserID, Role, restaurantID, PhoneNumber } = req.body;

  pool.query(
    "INSERT INTO profile (UserID, Role, restaurantID) VALUES (?, ?, ?)",
    [UserID, Role, restaurantID],
    (error, result) => {
      if (error) {
        return res.status(400).send(error);
      } else {
        pool.query(
          "SELECT * FROM profile WHERE ID = ?",
          [result.insertId],
          (error, resu) => {
            if (error) {
              return res.status(400).send(error);
            } else {
                pool.query(
                    "INSERT INTO manager (Manager_phonenumber, Profile_id , Restaurant_id) VALUES (?, ?, ?)",
                    [PhoneNumber, resu[0].ID, restaurantID],
                    (error, ress) => {
                      if (error) {
                        return res.status(400).send(error);
                      } else {
                        return res.status(200).send(ress) 
                      }
                    }
                  );
            }
          }
        );
      }
    }
  );
};
