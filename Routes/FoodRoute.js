const { AddFood } = require('../Controller/FoodController/AddFood');
const { DeleteFood } = require('../Controller/FoodController/DeleteFood');
const { GetFood } = require('../Controller/FoodController/GetFood');
const { UpdateFood } = require('../Controller/FoodController/UpdateFood');

const router = require('express').Router();

router.post('/AddFood', AddFood);
router.delete('/DeleteFood', DeleteFood);
router.get('/GetFood', GetFood)
router.put('/UpdateFood', UpdateFood)

module.exports = router