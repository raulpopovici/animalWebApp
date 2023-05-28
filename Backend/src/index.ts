const express = require("express");
import cors = require("cors");
import { AppDataSource } from "./app-data-source";
import * as dotenv from "dotenv";
import * as cookieParser from "cookie-parser";
dotenv.config();
const app = express();

import * as productRoutes from "./controllers/ProductController";
import * as authRoutes from "./controllers/AuthController";
import * as stripeRoutes from "./controllers/StripeController";
import * as cartRoutes from "./controllers/CartController";
import * as orderRoutes from "./controllers/OrderController";
import * as animalRoutes from "./controllers/AnimalController";
import * as userRoutes from "./controllers/UserController";

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
        optionsSuccessStatus: 200,
      })
    );

    app.use(productRoutes);
    app.use(authRoutes);
    app.use(stripeRoutes);
    app.use(cartRoutes);
    app.use(orderRoutes);
    app.use(animalRoutes);
    app.use(userRoutes);

    app.listen(3001, function () {
      console.log(`Backend server running on port ${3001}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
