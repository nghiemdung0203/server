const { AddFoodAndDrinkToMenu } = require("../Controller/MenuController/AddFoodAndDrinkToMenu");
const { CreateMenu } = require("../Controller/MenuController/CreateMenu");

const router = require("express").Router();

router.post("/CreateMenu", CreateMenu);
router.post('/AddFoodAndDrinkToMenu', AddFoodAndDrinkToMenu)

module.exports = router;
