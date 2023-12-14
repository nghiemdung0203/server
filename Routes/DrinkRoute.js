const { AddDrink } = require('../Controller/DrinkController/AddDrinks');
const { DeleteDrink } = require('../Controller/DrinkController/DeleteDrink');
const { GetDrinks } = require('../Controller/DrinkController/GetDrinks');
const { UpdateDrink } = require('../Controller/DrinkController/UpdateDrink');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

const router = require('express').Router();

router.post('/AddDrink',upload.single('AvatarPicture') ,AddDrink);
router.get('/GetDrink', GetDrinks);
router.delete('/DeleteDrink', DeleteDrink);
router.patch('/UpdateDrink', UpdateDrink)

module.exports = router