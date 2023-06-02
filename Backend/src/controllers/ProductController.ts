import e = require("cors");
import express = require("express");
const router = express.Router();

import {
  getNrOfProducts,
  getProducts,
  createProduct,
  getAllProductsForAdmin,
} from "../services/ProductService";

router.get("/api/getproducts", getProducts);

router.get("/api/getnrofproducts", getNrOfProducts);

router.post("/api/createProduct", createProduct);

router.get("/api/getAllProductForAdmin", getAllProductsForAdmin);

module.exports = router;
