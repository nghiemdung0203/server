const router = require("express").Router();
const {
  createManager,
} = require("../Controller/UserController/Manager/CreateManager");
const { CreateProfile } = require("../Controller/UserController/CreateProfile");
const { DeleteProfile } = require("../Controller/UserController/DeleteProfile");
const { GetProfiles } = require("../Controller/UserController/GetProfile");

const { SignIn } = require("../Controller/UserController/SignIn");
const { SignUp } = require("../Controller/UserController/SignUp");
const verifyToken = require("../Middleware/Authentiaction");
const {
  GetSpecificProfile,
} = require("../Controller/UserController/GetSpecificProfile");
const { UpdateProfile } = require("../Controller/UserController/UpdateProfile");

const multer = require("multer");
const {
  GetAllRestaurant,
} = require("../Controller/RestaurantController/GetAllRestaurant");
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("AvatarPicture"), SignUp);
router.post("/signin", SignIn);
router.post("/createProfile", CreateProfile);
router.delete("/deleteProfile", verifyToken, DeleteProfile);
router.get("/GetProfiles", GetProfiles);
router.get("/GetSpecificProfile", GetSpecificProfile);
router.post("/createManager", createManager);
router.patch("/updateProfile", verifyToken, UpdateProfile);
router.get("/getAllRestaurant", GetAllRestaurant);

module.exports = router;
