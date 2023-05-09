import { IProduct } from "./FoodPageInterfaces";

export interface ICartProduct {
  quantity: number;
  product: IProduct;
}

export const initialCartProduct: ICartProduct[] = [
  {
    quantity: 0,
    product: {
      id: "",
      name: "",
      price: 0,
      description: "",
      quantity: "",
      image: "",
      animalType: "",
      animalAge: "",
      brand: "",
      composition: "",
      nutritionalAdditives: "",
      analyticalConstituents: "",
      productWeight: 0,
      taste: "",
    },
  },
];
