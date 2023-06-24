import cookie from "cookie";
import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import CartProduct from "../entities/CartProduct";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import User from "../entities/User";
import Cart from "../entities/Cart";

export interface ICartProduct {
  quantity: number;
  product: IProduct;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: string;
  image: string;
  animalType: string;
  animalAge: string;
  brand: string;
  composition: string;
  nutritionalAdditives: string;
  analyticalConstituents: string;
  productWeight: number;
  taste: string;
}

export const getProductsFromCart = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
  const user = await AppDataSource.getRepository(User).findOne({
    where: { email },
  });
  const cartId = user.cartId;
  try {
    const cartProducts = await AppDataSource.getRepository(CartProduct).find({
      relations: {
        product: true,
      },
      where: { cartId: cartId },
    });

    const products: ICartProduct[] = cartProducts.map((product: any) => {
      return {
        quantity: product.quantity,
        product: product["__product__"],
      };
    });
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error getting data from the cart!!");
    return res.status(500).json(err);
  }
};

export const modifyCartItem = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });
  const { productId, cartId, quantityModified } = req.body;

  try {
    let productAlreadyCart = await CartProduct.findOne({
      where: { productId: productId, cartId: cartId },
    });

    let productInCart;
    if (!productAlreadyCart) {
      productInCart = CartProduct.create({
        productId: productId,
        cartId: cartId,
        quantity: quantityModified,
      });
    } else {
      productInCart = CartProduct.create({
        productId: productId,
        cartId: cartId,
        quantity: productAlreadyCart.quantity + Number(quantityModified),
      });
    }
    return res.json(await productInCart.save());
  } catch (err) {
    console.error("Error while trying to save to cart!!");
    return res.status(500).json(err);
  }
};

export const deleteproductfromcart = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { productId, cartId } = req.body;

  try {
    await CartProduct.delete({ cartId, productId });

    res.status(204).send();
  } catch (err) {
    console.error("Error while trying to delete from cart!!");
    return res.status(500).json(err);
  }
};

module.exports = { modifyCartItem, getProductsFromCart, deleteproductfromcart };
