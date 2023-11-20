const { AddDrink } = require('../Controller/DrinkController/AddDrinks');
const { DeleteDrink } = require('../Controller/DrinkController/DeleteDrink');
const { GetDrinks } = require('../Controller/DrinkController/GetDrinks');
const { UpdateDrink } = require('../Controller/DrinkController/UpdateDrink');

const router = require('express').Router();

router.post('/AddDrink', AddDrink);
router.get('/GetDrink', GetDrinks);
router.delete('/DeleteDrink', DeleteDrink);
router.put('/UpdateDrink', UpdateDrink)

module.exports = router