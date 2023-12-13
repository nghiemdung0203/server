const {
  AddFoodAndDrinkToOrder,
} = require("../Controller/OrderController.js/AddFoodAndDrinkToOrder");
const { CompleteOrder } = require("../Controller/OrderController.js/CompleteOrder");
const {
  CompletePayment,
} = require("../Controller/OrderController.js/CompletePayment");
const { CreateOrder } = require("../Controller/OrderController.js/CreateOrder");
const {
  DeleteOrderItems,
} = require("../Controller/OrderController.js/DeleteOrderItem");
const {
  DeleteOrders,
} = require("../Controller/OrderController.js/DeleteOrders");
const { GetOrder } = require("../Controller/OrderController.js/GetOrder");
const {
  GetSpecificOrder,
} = require("../Controller/OrderController.js/GetSpecificOrder");
const AuthenForCashier = require("../Middleware/AuthenForCashier");
const AuthenForCustomer = require("../Middleware/AuthenForCustomer");

const router = require("express").Router();

router.post("/CreateOrder", AuthenForCustomer, CreateOrder);
router.put(
  "/AddFoodAndDrinkToOrder",
  AuthenForCustomer,
  AddFoodAndDrinkToOrder
);
router.delete("/DeleteOrderItems", DeleteOrderItems);
router.delete("/DeleteOrder", DeleteOrders);
router.get("/GetOrder", GetOrder);
router.get("/GetSpecificOrder", GetSpecificOrder);
router.put("/CompletePayment", AuthenForCashier, CompletePayment);
router.put("/CompoleteOrder",AuthenForChef ,CompleteOrder)
module.exports = router;
