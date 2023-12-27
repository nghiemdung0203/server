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
const {
  DeleteEmeployeeToRestaurant,
} = require("../Controller/RestaurantController/DeleteEmeployeeToRestaurant");
const {
  GetEmployee,
} = require("../Controller/RestaurantController/GetEmployee");
const { AddEmployee } = require("../Controller/RestaurantController/AddEmployee");
const { GetAllRestaurant } = require("../Controller/RestaurantController/GetAllRestaurant");
const { RevenuInAWeek } = require("../Controller/RestaurantController/RevenuInAWeek");

const router = require("express").Router();

router.post(
  "/CreateRestaurant",
  AuthenManager,
  upload.single("AvatarPicture"),
  CreateRestaurant
);
router.delete("/DeleteRestaurant", AuthenManager, DeleteRestaurant);
router.get("/getRestaurantsForManager", getRestaurant);
router.patch(
  "/UpdateRestaurant",
  AuthenManager,
  upload.single("AvatarPicture"),
  UpdateRestaurant
);
router.patch("/DeleteEmeployeeToRestaurant", DeleteEmeployeeToRestaurant);
router.get("/GetEmployee", AuthenManager, GetEmployee);
router.patch("/AddEmployee", AddEmployee);
router.get("/GetAllRestaurant", GetAllRestaurant);
router.get("/RevenuInAWeek", RevenuInAWeek);
module.exports = router;
