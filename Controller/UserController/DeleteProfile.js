const pool = require("../../database");

module.exports.DeleteProfile = (req, res) => {
  const { profileID } = req.user;

  // Check if the profile with the given profileID exists
  pool.query(
    "SELECT * FROM Profile WHERE ID = ?",
    [profileID],
    (profileError, profileResults) => {
      if (profileError) {
        return res.status(500).json(profileError);
      }

      if (profileResults.length === 0) {
        // Profile not found, so it cannot be deleted
        return res.status(404).json({ error: "Profile not found" });
      }
      const profileRole = profileResults[0].Role.toLowerCase();
      // Profile exists, proceed to delete the profile
      pool.query(
        "DELETE FROM profile WHERE ID = ?",
        [profileID],
        (deleteError, deleteResults) => {
          if (deleteError) {
            return res.status(500).json(deleteError);
          } else {
            return res.status(200).json("Deleted Profile successfully");
          }
        }
      );
    }
  );
};
