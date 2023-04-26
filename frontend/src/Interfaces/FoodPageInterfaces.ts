import { StringLiteralLike } from "typescript";

export enum EnumAnimals {
  none,
  dogs,
  cats,
  cows,
  horses,
  sheep,
}

export type AnimalData = {
  index: EnumAnimals;
  data: string;
};

export type PriceData = {
  index: number;
  data: string;
  minPrice: number;
  maxPrice?: number;
};

export const Animals: AnimalData[] = [
  { index: EnumAnimals.none, data: "none" },
  { index: EnumAnimals.dogs, data: "dogs" },
  { index: EnumAnimals.cats, data: "cats" },
  { index: EnumAnimals.cows, data: "cows" },
  { index: EnumAnimals.horses, data: "horses" },
  { index: EnumAnimals.sheep, data: "sheeps" },
];

export const Prices: PriceData[] = [
  { index: 0, data: "none", minPrice: 0, maxPrice: 0 },
  { index: 1, data: "0$-100$", minPrice: 0, maxPrice: 100 },
  { index: 2, data: "100$-200$", minPrice: 100, maxPrice: 200 },
  { index: 3, data: "200$-300$", minPrice: 200, maxPrice: 300 },
  { index: 4, data: "300$-500$", minPrice: 300, maxPrice: 500 },
  { index: 5, data: "500$ +", minPrice: 500 },
];

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
