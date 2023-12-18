const { AddFoodAndDrinkToMenu } = require("../Controller/MenuController/AddFoodAndDrinkToMenu");
const { CreateMenu } = require("../Controller/MenuController/CreateMenu");

const router = require("express").Router();

router.post("/CreateMenu", CreateMenu);
router.post('/AddFoodAndDrinkToMenu', AddFoodAndDrinkToMenu)
router.get('GetMenu', GetMenu)

module.exports = router;
