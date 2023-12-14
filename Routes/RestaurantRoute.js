const {
  CreateRestaurant,
} = require("../Controller/RestaurantController/CreateRestaurant");
const {
  DeleteRestaurant,
} = require("../Controller/RestaurantController/DeleteRestaurant");
const {
  getRestaurant,
} = require("../Controller/RestaurantController/GetRestaurant");
const {
  UpdateRestaurant,
} = require("../Controller/RestaurantController/UpdateRestaurant");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const AuthenManager = require("../Middleware/AuthenForManager");

const router = require("express").Router();

router.post(
  "/CreateRestaurant",
  AuthenManager,
  upload.single("AvatarPicture"),
  CreateRestaurant
);
router.delete("/DeleteRestaurant", AuthenManager, DeleteRestaurant);
router.get("/getRestaurantsForManager", getRestaurant);
router.patch("/UpdateRestaurant", AuthenManager, UpdateRestaurant);

module.exports = router;
