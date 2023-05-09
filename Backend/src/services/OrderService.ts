import { query, Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import Order from "../entities/Order";
import ShippingInfo from "../entities/ShippingInfo";
import cookie from "cookie";
import jwt = require("jsonwebtoken");
import CartProduct from "../entities/CartProduct";
import { ICartProduct } from "./CartService";
import User from "../entities/User";
import { OrderProduct } from "../entities/OrderProduct";

//create order

export const createOrder = async (customer, data) => {
  try {
    const shippingInfo = await AppDataSource.getRepository(ShippingInfo).create(
      {
        name: data.customer_details.name,
        email: data.customer_details.email,
        city: data.customer_details.address.city,
        address1: data.customer_details.address.line1,
        address2: data.customer_details.address.line2,
        postalCode: data.customer_details.address.postal_code,
        phoneNumber: data.customer_details.phone,
        country: data.customer_details.address.country,
      }
    );
    await shippingInfo.save();

    const order = await AppDataSource.getRepository(Order).create({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentId: data.payment_intent,
      subtotal: data.amount_subtotal / 100,
      total: data.amount_total / 100,
      shipping: shippingInfo,
      payment_status: data.payment_status,
    });
    const result = await order.save();
    return result;
  } catch {
    console.log("error saving order");
  }
};

export const createOrderFromCart = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { cartId } = req.body;

  try {
    const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });

    const order = await AppDataSource.getRepository(Order).findOne({
      where: { userId: user.id },
      order: { createdAt: "DESC" },
    });

    if (!order) return res.status(404).json({ error: "Order not found" });

    const cartProducts = await AppDataSource.getRepository(CartProduct).find({
      relations: {
        product: true,
      },
      where: { cartId: cartId },
    });

    if (cartProducts.length === 0)
      return res.status(404).json({ error: "Cart is empty" });

    const orderProducts = cartProducts.map((cartProduct) => ({
      product: cartProduct["__product__"],
      quantity: cartProduct.quantity,
    }));
    for (const orderProduct1 of orderProducts) {
      const orderProduct = new OrderProduct();
      orderProduct.order = order;
      orderProduct.product = orderProduct1.product;
      orderProduct.quantity = orderProduct1.quantity;

      const result = await AppDataSource.getRepository(OrderProduct).find({
        where: {
          order: { id: order.id },
          product: { id: orderProduct1.product.id },
        },
      });
      if (result.length === 0) {
        await AppDataSource.getRepository(OrderProduct).save(orderProduct);
      }
    }
    await AppDataSource.getRepository(CartProduct).remove(cartProducts);

    return res.status(200).json("success");
  } catch (err) {
    console.log("error saving order", err);
  }
};
export const getOrders = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
  const user = await AppDataSource.getRepository(User).findOne({
    where: { email },
  });

  try {
    const orderRepository = await AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({
      where: { userId: user.id },
      relations: ["orderProducts", "orderProducts.product", "shipping"],
    });
    return res.status(200).json(orders);
  } catch (err) {
    console.log("error getting orders -> ", err);
  }
};
module.exports = { createOrder, createOrderFromCart, getOrders };
