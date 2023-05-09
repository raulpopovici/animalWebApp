import e = require("cors");
import express = require("express");
const router = express.Router();

import {
  createOrder,
  createOrderFromCart,
  getOrders,
} from "../services/OrderService";

router.post("/api/createOrder", createOrder);

router.post("/api/postFromCartToOrders", createOrderFromCart);

router.get("/api/getOrders", getOrders);

module.exports = router;
