const { CreateRestaurant } = require('../Controller/RestaurantController/CreateRestaurant');
const { DeleteRestaurant } = require('../Controller/RestaurantController/DeleteRestaurant');
const { getRestaurant} = require("../Controller/RestaurantController/GetRestaurant");
const { UpdateRestaurant } = require('../Controller/RestaurantController/UpdateRestaurant');
const AuthenManager = require('../Middleware/AuthenForManager');

const router = require('express').Router();

router.post('/CreateRestaurant',AuthenManager ,CreateRestaurant);
router.delete('/DeleteRestaurant',AuthenManager ,DeleteRestaurant);
router.post('/getRestaurantsForManager',AuthenManager ,getRestaurant);
router.put('/UpdateRestaurant',AuthenManager ,UpdateRestaurant)


module.exports = router;