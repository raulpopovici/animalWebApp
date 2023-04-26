import e = require("cors");
import express = require("express");
const router = express.Router();

import { getNrOfProducts, getProducts } from "../services/ProductService";

router.get("/api/getproducts", getProducts);

router.get("/api/getnrofproducts", getNrOfProducts);

module.exports = router;
