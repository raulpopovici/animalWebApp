import express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const YOUR_DOMAIN = "http://localhost:3000";
require("dotenv").config();
const app = express();
app.use(express.static("public"));
const stripe = Stripe(process.env.STRIPE_KEY);

import { postStripe } from "../services/Stripe";
import { createOrder } from "../services/OrderService";

router.post("/api/create-checkout-session", postStripe);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_9e91a5e4d703dffbfffd1859c3377f4d2caceb63f20d407b31e11a504ad24b6b";

router.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    const body = request.body;
    if (!sig) {
      return response.status(400).send("Missing stripe-signature header");
    }
    const payloadString = JSON.stringify(body, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    let data;
    let eventType;
    try {
      const event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        endpointSecret
      );
      response.status(200).send("Webhook received successfully");
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    data = request.body.data.object;
    eventType = request.body.type;
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    response.send().end();
  }
);

module.exports = router;
