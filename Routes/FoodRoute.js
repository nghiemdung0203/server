const { AddFood } = require('../Controller/FoodController/AddFood');
const { DeleteFood } = require('../Controller/FoodController/DeleteFood');
const { GetFood } = require('../Controller/FoodController/GetFood');
const { UpdateFood } = require('../Controller/FoodController/UpdateFood');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

const router = require('express').Router();

router.post('/AddFood',upload.single('AvatarPicture'), AddFood);
router.delete('/DeleteFood', DeleteFood);
router.get('/GetFood', GetFood)
router.patch('/UpdateFood', UpdateFood)

module.exports = router