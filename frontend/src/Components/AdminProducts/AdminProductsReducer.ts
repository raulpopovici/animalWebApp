export const createAction = <T extends string | number, P>(
  type: T,
  payload: P
) => {
  return { type, payload } as const;
};

export interface IAddProductModal {
  name: string;
  price: number;
  animalType: string;
  brand: string;
  productWeight: number;
  image: string;
  animalAge: string;
  composition: string;
  description: string;
  nutritionalAdditives: string;
  analyticalConstituents: string;
  taste: string;
}

export enum AddProductModalState {
  name,
  price,
  animalType,
  brand,
  productWeight,
  image,
  animalAge,
  composition,
  description,
  nutritionalAdditives,
  analyticalConstituents,
  taste,
}

export const newNameUpdate = (data: string) =>
  createAction(AddProductModalState.name, data);
export const newPriceUpdate = (data: number) =>
  createAction(AddProductModalState.price, data);
export const newAnimalTypeUpdate = (data: string) =>
  createAction(AddProductModalState.animalType, data);
export const newBrandUpdate = (data: string) =>
  createAction(AddProductModalState.brand, data);
export const newProductWeightUpdate = (data: number) =>
  createAction(AddProductModalState.productWeight, data);
export const newImageUpdate = (data: string) =>
  createAction(AddProductModalState.image, data);
export const newAnimalAgeUpdate = (data: string) =>
  createAction(AddProductModalState.animalAge, data);
export const newCompositionUpdate = (data: string) =>
  createAction(AddProductModalState.composition, data);
export const newDescriptionUpdate = (data: string) =>
  createAction(AddProductModalState.description, data);
export const newNutritionalAdditivesUpdate = (data: string) =>
  createAction(AddProductModalState.nutritionalAdditives, data);
export const newAnalyticalConstituentsUpdate = (data: string) =>
  createAction(AddProductModalState.analyticalConstituents, data);
export const newTasteUpdate = (data: string) =>
  createAction(AddProductModalState.taste, data);

type NameUpdate = ReturnType<typeof newNameUpdate>;
type PriceUpdate = ReturnType<typeof newPriceUpdate>;
type AnimalTypeUpdate = ReturnType<typeof newAnimalTypeUpdate>;
type BrandUpdate = ReturnType<typeof newBrandUpdate>;
type ProductWeightUpdate = ReturnType<typeof newProductWeightUpdate>;
type ImageUpdate = ReturnType<typeof newImageUpdate>;
type AnimalAgeUpdate = ReturnType<typeof newAnimalAgeUpdate>;
type CompositionUpdate = ReturnType<typeof newCompositionUpdate>;
type DescriptionUpdate = ReturnType<typeof newDescriptionUpdate>;
type NutritionalAdditivesUpdate = ReturnType<
  typeof newNutritionalAdditivesUpdate
>;
type AnalyticalConstituentsUpdate = ReturnType<
  typeof newAnalyticalConstituentsUpdate
>;
type TasteUpdate = ReturnType<typeof newTasteUpdate>;

export type AddProductModalStateType =
  | NameUpdate
  | PriceUpdate
  | AnimalTypeUpdate
  | BrandUpdate
  | ProductWeightUpdate
  | ImageUpdate
  | AnimalAgeUpdate
  | CompositionUpdate
  | DescriptionUpdate
  | NutritionalAdditivesUpdate
  | AnalyticalConstituentsUpdate
  | TasteUpdate;

export const initialAddProductModalData: IAddProductModal = {
  name: "",
  price: 0,
  animalType: "",
  brand: "",
  productWeight: 0,
  image: "",
  animalAge: "",
  composition: "",
  description: "",
  nutritionalAdditives: "",
  analyticalConstituents: "",
  taste: "",
};

export const addProductModalReducer = (
  state: IAddProductModal = initialAddProductModalData,
  action: AddProductModalStateType
): IAddProductModal => {
  switch (action.type) {
    case AddProductModalState.name:
      return { ...state, name: action.payload };
    case AddProductModalState.price:
      return { ...state, price: action.payload };
    case AddProductModalState.animalType:
      return { ...state, animalType: action.payload };
    case AddProductModalState.brand:
      return { ...state, brand: action.payload };
    case AddProductModalState.productWeight:
      return { ...state, productWeight: action.payload };
    case AddProductModalState.image:
      return { ...state, image: action.payload };
    case AddProductModalState.animalAge:
      return { ...state, animalAge: action.payload };
    case AddProductModalState.composition:
      return { ...state, composition: action.payload };
    case AddProductModalState.description:
      return { ...state, description: action.payload };
    case AddProductModalState.nutritionalAdditives:
      return { ...state, nutritionalAdditives: action.payload };
    case AddProductModalState.analyticalConstituents:
      return { ...state, analyticalConstituents: action.payload };
    case AddProductModalState.taste:
      return { ...state, taste: action.payload };
    default:
      return state;
  }
};
