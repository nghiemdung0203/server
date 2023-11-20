const { AddFoodAndDrinkToOrder } = require('../Controller/OrderController.js/AddFoodAndDrinkToOrder');
const { CreateOrder } = require('../Controller/OrderController.js/CreateOrder');
const { DeleteOrderItems } = require('../Controller/OrderController.js/DeleteOrderItem');
const { DeleteOrders } = require('../Controller/OrderController.js/DeleteOrders');
const { GetOrder } = require('../Controller/OrderController.js/GetOrder');
const { GetSpecificOrder } = require('../Controller/OrderController.js/GetSpecificOrder');
const AuthenForCustomer = require('../Middleware/AuthenForCustomer');

const router = require('express').Router();

router.post('/CreateOrder',AuthenForCustomer ,CreateOrder);
router.put('/AddFoodAndDrinkToOrder',AuthenForCustomer, AddFoodAndDrinkToOrder)
router.delete('/DeleteOrderItems', DeleteOrderItems);
router.delete('/DeleteOrder', DeleteOrders);
router.post('/GetOrder', GetOrder);
router.post('/GetSpecificOrder', GetSpecificOrder)
module.exports = router