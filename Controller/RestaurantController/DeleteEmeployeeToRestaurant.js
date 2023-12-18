const pool = require("../../database");

module.exports.DeleteEmeployeeToRestaurant = (req, res) => {
  const { profileID, Restaurant_id } = req.body;
  pool.query(
    "Select RestaurantID from profile where ID = ?",
    [profileID],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        console.log(result)
        console.log(typeof(result))
        console.log(typeof(Restaurant_id))
        if (result !== Restaurant_id) {
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
