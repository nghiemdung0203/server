const { AddFoodAndDrinkToMenu } = require("../Controller/MenuController/AddFoodAndDrinkToMenu");
const { CreateMenu } = require("../Controller/MenuController/CreateMenu");
const { DeleteFoodAndDrinkFromMenu } = require("../Controller/MenuController/DeleteFoodAndDrinkFromMenu");
const { GetMenu } = require("../Controller/MenuController/GetMenu");

const router = require("express").Router();

router.post("/CreateMenu", CreateMenu);
router.post('/AddFoodAndDrinkToMenu', AddFoodAndDrinkToMenu)
router.get('/GetMenu', GetMenu)
router.delete('/DeleteFoodAndDrinkFromMenu', DeleteFoodAndDrinkFromMenu)

module.exports = router;
