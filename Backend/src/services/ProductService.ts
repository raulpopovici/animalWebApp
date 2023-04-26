import { query, Request, Response } from "express";
import { AppDataSource } from "../app-data-source";

import Product from "../entities/Product";
import {
  convertAgeToString,
  convertAnimalTypeToString,
  convertBrandToString,
  getPriceRange,
} from "../utils/ProductsHelperFunctions";

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

module.exports = {
  getProducts,
  getNrOfProducts,
};
