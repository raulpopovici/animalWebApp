const express = require("express");
import cors = require("cors");
import { AppDataSource } from "./app-data-source";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

import productRoutes = require("./controllers/ProductController");
import authRoutes = require("./controllers/AuthController");

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());
    app.use(cors({ origin: "*" }));

    app.use(productRoutes);
    app.use(authRoutes);
    app.listen(3001, function () {
      console.log(`Backend server running on port ${3001}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
