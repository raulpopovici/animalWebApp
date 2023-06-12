import e = require("cors");
import express = require("express");
const router = express.Router();

import {
  createOrder,
  createOrderFromCart,
  getOrders,
  getAllOrdersAdmin,
  getOrderTotalPerDay,
} from "../services/OrderService";

router.post("/api/createOrder", createOrder);

router.post("/api/postFromCartToOrders", createOrderFromCart);

router.get("/api/getOrders", getOrders);

router.get("/api/getAllOrdersAdmin", getAllOrdersAdmin);

router.get("/api/getOrderTotalPerDay", getOrderTotalPerDay);

module.exports = router;
