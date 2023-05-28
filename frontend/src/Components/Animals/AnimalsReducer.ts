export const createAction = <T extends string | number, P>(
  type: T,
  payload: P
) => {
  return { type, payload } as const;
};

export interface IAddAnimalModal {
  name: string;
  breed: string;
  age: number;
  animalType: number;
  sex: number;
  weight: number;
  details: string;
  image1: string;
  image2: string;
  image3: string;
  forAdoption: boolean;
}

export enum AddAnimalModalState {
  name,
  breed,
  age,
  animalType,
  sex,
  weight,
  details,
  image1,
  image2,
  image3,
  forAdoption,
}

export const newNameUpdate = (data: string) =>
  createAction(AddAnimalModalState.name, data);
export const newBreedUpdate = (data: string) =>
  createAction(AddAnimalModalState.breed, data);
export const newAgeUpdate = (data: number) =>
  createAction(AddAnimalModalState.age, data);
export const newAnimalTypeUpdate = (data: number) =>
  createAction(AddAnimalModalState.animalType, data);
export const newSexUpdate = (data: number) =>
  createAction(AddAnimalModalState.sex, data);
export const newWeightUpdate = (data: number) =>
  createAction(AddAnimalModalState.weight, data);
export const newDetailsUpdate = (data: string) =>
  createAction(AddAnimalModalState.details, data);
export const newImage1Update = (data: string) =>
  createAction(AddAnimalModalState.image1, data);
export const newImage2Update = (data: string) =>
  createAction(AddAnimalModalState.image2, data);
export const newImage3Update = (data: string) =>
  createAction(AddAnimalModalState.image3, data);
export const newForAdoptionUpdate = (data: boolean) =>
  createAction(AddAnimalModalState.forAdoption, data);

type NameUpdate = ReturnType<typeof newNameUpdate>;
type BreedUpdate = ReturnType<typeof newBreedUpdate>;
type AgeUpdate = ReturnType<typeof newAgeUpdate>;
type AnimalTypeUpdate = ReturnType<typeof newAnimalTypeUpdate>;
type SexUpdate = ReturnType<typeof newSexUpdate>;
type WeightUpdate = ReturnType<typeof newWeightUpdate>;
type DetailsUpdate = ReturnType<typeof newDetailsUpdate>;
type Image1Update = ReturnType<typeof newImage1Update>;
type Image2Update = ReturnType<typeof newImage2Update>;
type Image3Update = ReturnType<typeof newImage3Update>;
type ForAdoptionUpdate = ReturnType<typeof newForAdoptionUpdate>;

export type AddAnimalModalStateType =
  | NameUpdate
  | BreedUpdate
  | AgeUpdate
  | AnimalTypeUpdate
  | SexUpdate
  | WeightUpdate
  | DetailsUpdate
  | Image1Update
  | Image2Update
  | Image3Update
  | ForAdoptionUpdate;

export const initialAddAnimalModalData: IAddAnimalModal = {
  name: "",
  breed: "",
  age: 0,
  animalType: 0,
  sex: 0,
  weight: 0,
  details: "",
  image1: "",
  image2: "",
  image3: "",
  forAdoption: true,
};

export const addAnimalModalReducer = (
  state: IAddAnimalModal = initialAddAnimalModalData,
  action: AddAnimalModalStateType
): IAddAnimalModal => {
  switch (action.type) {
    case AddAnimalModalState.name:
      return { ...state, name: action.payload };
    case AddAnimalModalState.breed:
      return { ...state, breed: action.payload };
    case AddAnimalModalState.age:
      return { ...state, age: action.payload };
    case AddAnimalModalState.animalType:
      return { ...state, animalType: action.payload };
    case AddAnimalModalState.sex:
      return { ...state, sex: action.payload };
    case AddAnimalModalState.weight:
      return { ...state, weight: action.payload };
    case AddAnimalModalState.details:
      return { ...state, details: action.payload };
    case AddAnimalModalState.image1:
      return { ...state, image1: action.payload };
    case AddAnimalModalState.image2:
      return { ...state, image2: action.payload };
    case AddAnimalModalState.image3:
      return { ...state, image3: action.payload };
    case AddAnimalModalState.forAdoption:
      return { ...state, forAdoption: action.payload };
    default:
      return state;
  }
};
