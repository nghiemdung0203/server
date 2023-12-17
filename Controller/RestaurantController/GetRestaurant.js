const pool = require("../../database");

module.exports.getRestaurant = (req, res) => {
  const profileID = req.query.profileID;


  pool.query('Select * from profile where ID = ?', [profileID], (error, profileResult) => {
    if (error) {
      return res.status(500).send(error);
    } else {
        pool.query(
          "Select profile.Role, restaurant.Name, restaurant.Address, restaurant.PhoneNumber, restaurant.Avatar, restaurant.Description, restaurant.Number_of_tables, restaurant.Time from profile INNER JOIN restaurant ON profile.RestaurantID = restaurant.ID WHERE profile.ID = ?",
          [profileID],
          (error, result) => {
            if (error) {
              return res.status(400).send(error);
            } else {
              return res.status(200).send(result);
            }
          }
        );
    }
  })

  
};

