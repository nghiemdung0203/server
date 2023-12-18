const pool = require("../../database");

module.exports.DeleteEmeployeeToRestaurant = (req, res) => {
  const { profileID, Restaurant_id } = req.body;
  pool.query(
    "Select * from profile where ID = ?",
    [profileID],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        console.log(result[0].RestaurantID)
        console.log(typeof(result[0].RestaurantID.toString()))
        console.log(typeof(Restaurant_id))
        if (result[0].RestaurantID.toString() !== Restaurant_id) {
          return res.status(400).send("Profile not found");
        } else {
          pool.query(
            "Update profile Set RestaurantID = NULL, isWorking = 0, CodeName = NULL, Time = NULL WHERE ID = ?",
            [profileID],
            (error, result) => {
              if (error) {
                return res.status(500).send(error);
              } else {
                return res.status(200).send(result);
              }
            }
          );
        }
      }
    }
  );
};
