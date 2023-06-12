import { query, Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import jwt = require("jsonwebtoken");

import Product from "../entities/Product";
import {
  convertAgeToString,
  convertAnimalTypeToString,
  convertBrandToString,
  getPriceRange,
} from "../utils/ProductsHelperFunctions";
import User from "../entities/User";
import { OrderProduct } from "../entities/OrderProduct";

export const getProducts = async (req: Request, res: Response) => {
  const {
    animalType,
    availability,
    priceRange,
    brand,
    animalAge,
    taste,
    searchText,
    pageNumber,
    order,
  } = req.query;

  const queryBuilder = await AppDataSource.getRepository(
    Product
  ).createQueryBuilder("product");

  if (animalType) {
    if (animalType.length === 1 && animalType[0] === "0") {
    } else {
      const animalTypeToString = convertAnimalTypeToString(animalType);
      queryBuilder.where("product.animalType IN (:...animalType)", {
        animalType: animalTypeToString,
      });
    }
  }

  if (availability !== undefined) {
    if (availability == 1) {
      queryBuilder.andWhere("product.quantity > 0");
    }
  }

  if (priceRange != undefined) {
    const price = getPriceRange(priceRange);
    if (price.minPrice != 0) {
      queryBuilder.andWhere("product.price >= :minPrice", {
        minPrice: price.minPrice,
      });
    }
    if (price.maxPrice != 0) {
      queryBuilder.andWhere("product.price <= :maxPrice", {
        maxPrice: price.maxPrice,
      });
    }
  }

  if (brand) {
    if (brand.length === 1 && brand[0] === "0") {
    } else {
      const brandToString = convertBrandToString(brand);
      queryBuilder.andWhere("product.brand IN (:...brand)", {
        brand: brandToString,
      });
    }
  }

  if (animalAge) {
    if (animalAge.length === 1 && animalAge[0] === "0") {
    } else {
      const ageToString = convertAgeToString(animalAge);
      queryBuilder.andWhere("product.animalAge IN (:...animalAge)", {
        animalAge: ageToString,
      });
    }
  }

  if (taste) {
    if (taste.length === 1 && taste[0] === "0") {
    } else {
      const tasteToString = convertAgeToString(taste);
      queryBuilder.andWhere("product.animalAge IN (:...taste)", {
        taste: tasteToString,
      });
    }
  }

  if (searchText) {
    if (searchText != "") {
      queryBuilder.andWhere(
        "(product.name LIKE :searchText OR product.description LIKE :searchText OR product.animalType LIKE :searchText OR product.animalAge LIKE :searchText OR product.taste LIKE :searchText)",
        { searchText: `%${searchText}%` }
      );
    }
  }

  if (order) {
    queryBuilder.orderBy("product.name", order);
  }

  let page: number = pageNumber;
  if (pageNumber) {
    if (pageNumber == 0) {
      page = 1;
    }
  } else {
    page = 1;
  }
  console.log(page);
  const products = await queryBuilder
    .skip((page - 1) * 12)
    .take(12)
    .getMany();

  res.json(products);
};

export const getNrOfProducts = async (req: Request, res: Response) => {
  const {
    animalType,
    availability,
    priceRange,
    brand,
    animalAge,
    taste,
    searchText,
  } = req.query;

  const queryBuilder = await AppDataSource.getRepository(
    Product
  ).createQueryBuilder("product");

  if (animalType) {
    if (animalType.length === 1 && animalType[0] === "0") {
    } else {
      const animalTypeToString = convertAnimalTypeToString(animalType);
      queryBuilder.where("product.animalType IN (:...animalType)", {
        animalType: animalTypeToString,
      });
    }
  }

  if (availability !== undefined) {
    if (availability == 1) {
      queryBuilder.andWhere("product.quantity > 0");
    }
  }

  if (priceRange != undefined) {
    const price = getPriceRange(priceRange);
    if (price.minPrice != 0) {
      queryBuilder.andWhere("product.price >= :minPrice", {
        minPrice: price.minPrice,
      });
    }
    if (price.maxPrice != 0) {
      queryBuilder.andWhere("product.price <= :maxPrice", {
        maxPrice: price.maxPrice,
      });
    }
  }

  if (brand) {
    if (brand.length === 1 && brand[0] === "0") {
    } else {
      const brandToString = convertBrandToString(brand);
      queryBuilder.andWhere("product.brand IN (:...brand)", {
        brand: brandToString,
      });
    }
  }

  if (animalAge) {
    if (animalAge.length === 1 && animalAge[0] === "0") {
    } else {
      const ageToString = convertAgeToString(animalAge);
      queryBuilder.andWhere("product.animalAge IN (:...animalAge)", {
        animalAge: ageToString,
      });
    }
  }

  if (taste) {
    if (taste.length === 1 && taste[0] === "0") {
    } else {
      const tasteToString = convertAgeToString(taste);
      queryBuilder.andWhere("product.animalAge IN (:...taste)", {
        taste: tasteToString,
      });
    }
  }

  if (searchText) {
    if (searchText != "") {
      queryBuilder.andWhere(
        "(product.name LIKE :searchText OR product.description LIKE :searchText OR product.animalType LIKE :searchText OR product.animalAge LIKE :searchText OR product.taste LIKE :searchText)",
        { searchText: `%${searchText}%` }
      );
    }
  }

  const products = await queryBuilder.getMany();

  res.json(products.length);
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      description,
      quantity,
      image,
      animalType,
      animalAge,
      brand,
      composition,
      nutritionalAdditives,
      analyticalConstituents,
      productWeight,
      taste,
    } = req.body;

    // Create a new product entity
    const product = new Product();
    product.name = name;
    product.price = price;
    product.description = description;
    product.quantity = quantity;
    product.image = image;
    product.animalType = animalType;
    product.animalAge = animalAge;
    product.brand = brand;
    product.composition = composition;
    product.nutritionalAdditives = nutritionalAdditives;
    product.analyticalConstituents = analyticalConstituents;
    product.productWeight = productWeight;
    product.taste = taste;

    // Save the new product entity to the database
    const productRepository = AppDataSource.getRepository(Product);
    const savedProduct = await productRepository.save(product);

    return res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

export const getAllProductsForAdmin = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
  const user = await AppDataSource.getRepository(User).findOne({
    where: { email },
  });

  if (user.isAdmin === false)
    return res.status(401).json({ error: "Not an admin, not permited" });

  const pageNumber = req.query.pageNumber > 0 ? req.query.pageNumber : 1;

  try {
    const orderProductRepository = AppDataSource.getRepository(OrderProduct);
    const queryBuilder =
      orderProductRepository.createQueryBuilder("orderProduct");
    queryBuilder
      .select("orderProduct.product", "productId")
      .addSelect("SUM(orderProduct.quantity)", "totalQuantity")
      .groupBy("orderProduct.product");

    const result = await queryBuilder.getRawMany();
    const productQuantities = result.map((row) => ({
      productId: row.productId,
      totalQuantity: row.totalQuantity,
    }));

    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find({
      skip: (pageNumber - 1) * 5,
      take: 5,
    });

    let productAux: products;
    let productArray: products[] = [];

    products.forEach((product) => {
      const productQuantity = productQuantities.find(
        (p) => p.productId === product.id
      );
      if (productQuantity) {
        productAux = {
          quantity: productQuantity.totalQuantity,
          id: product.id,
          name: product.name,
          price: product.price,
          animalType: product.animalType,
          brand: product.brand,
          productWeight: product.productWeight,
        };
      } else {
        productAux = {
          quantity: 0,
          id: product.id,
          name: product.name,
          price: product.price,
          animalType: product.animalType,
          brand: product.brand,
          productWeight: product.productWeight,
        };
      }
      productArray.push(productAux);
    });
    productArray.sort((a, b) => b.quantity - a.quantity);
    return res.json(productArray);
  } catch {
    console.log("error getting the products");
  }
};

interface products {
  quantity: number;
  id: string;
  name: string;
  price: number;
  animalType: string;
  brand: string;
  productWeight: number;
}

module.exports = {
  getProducts,
  getNrOfProducts,
  createProduct,
  getAllProductsForAdmin,
};
