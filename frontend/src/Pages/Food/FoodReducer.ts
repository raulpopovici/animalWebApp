export const createAction = <T extends string | number, P>(
  type: T,
  payload: P
) => {
  return { type, payload } as const;
};

export interface ITopFiltersData {
  checkedAnimalType: number[];
}

export interface ILeftFiltersData {
  availability: number;
  price: number;
  brand: number[];
  age: number[];
  taste: number[];
}

export interface IFoodReducerData {
  topFilters: number[];
  leftFilters: ILeftFiltersData;
  searchBar: string;
  pageNumber: number;
}
export enum FoodState {
  topFilters,
  leftFilters,
  searchBar,
  pageNumber,
}

export const newTopFiltersUpdate = (data: number[]) =>
  createAction(FoodState.topFilters, data);
export const newLeftFiltersUpdate = (data: ILeftFiltersData) =>
  createAction(FoodState.leftFilters, data);
export const newSearchBarUpdate = (data: string) =>
  createAction(FoodState.searchBar, data);
export const newPageNumberUpdate = (data: number) =>
  createAction(FoodState.pageNumber, data);

type TopFiltersUpdate = ReturnType<typeof newTopFiltersUpdate>;
type LeftFiltersUpdate = ReturnType<typeof newLeftFiltersUpdate>;
type SearchBarUpdate = ReturnType<typeof newSearchBarUpdate>;
type PageNumberUpdate = ReturnType<typeof newPageNumberUpdate>;

export type FoodStateType =
  | TopFiltersUpdate
  | LeftFiltersUpdate
  | SearchBarUpdate
  | PageNumberUpdate;

export const initialFoodData: IFoodReducerData = {
  topFilters: [0],
  leftFilters: {
    availability: 0,
    price: 0,
    brand: [0],
    age: [0],
    taste: [0],
  },
  searchBar: "",
  pageNumber: 1,
};

export const foodReducer = (state: IFoodReducerData, action: FoodStateType) => {
  switch (action.type) {
    case FoodState.topFilters:
      return {
        ...state,
        topFilters: action.payload,
      };
    case FoodState.leftFilters:
      return {
        ...state,
        leftFilters: action.payload,
      };
    case FoodState.searchBar:
      return {
        ...state,
        searchBar: action.payload,
      };
    case FoodState.pageNumber:
      return {
        ...state,
        pageNumber: action.payload,
      };
    default:
      throw new Error("case not found");
  }
};
