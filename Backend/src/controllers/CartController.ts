import e = require("cors");
import express = require("express");
const router = express.Router();

import {
  modifyCartItem,
  getProductsFromCart,
  deleteproductfromcart,
} from "../services/CartService";

router.post("/api/postproductsincart", modifyCartItem);

router.get("/api/getproductsfromcart", getProductsFromCart);

router.delete("/api/deleteproductfromcart", deleteproductfromcart);

module.exports = router;
