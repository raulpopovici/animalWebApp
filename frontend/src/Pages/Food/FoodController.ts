import React from "react";
import { useNavigate } from "react-router-dom";
import { ICartProduct } from "../../Interfaces/CartPageInterfaces";
import { IProduct } from "../../Interfaces/FoodPageInterfaces";
import { FoodState, FoodStateType, ILeftFiltersData } from "./FoodReducer";

export const topFiltersChangeState = (
  topFilters: number[],
  index: number,
  dispatchFoodReducerData: React.Dispatch<FoodStateType>
) => {
  if (checkIfTopFilterSelected(topFilters, index)) {
    const indexOfElement = topFilters.indexOf(index);
    topFilters.splice(indexOfElement, 1);
  } else {
    topFilters.push(index);
  }
  dispatchFoodReducerData({ type: FoodState.topFilters, payload: topFilters });
};

export const checkIfTopFilterSelected = (
  topFilters: number[],
  index: number
): boolean => {
  if (topFilters.includes(index)) {
    return true;
  }
  return false;
};

export const leftFiltersChangeState = (
  leftFilters: ILeftFiltersData,
  index: number,
  filterType: number,
  dispatchFoodReducerData: React.Dispatch<FoodStateType>
) => {
  switch (filterType) {
    case 0:
      if (leftFilters.availability === index) {
        leftFilters.availability = 0;
      } else {
        leftFilters.availability = index;
      }
      break;
    case 1:
      if (leftFilters.price === index) {
        leftFilters.price = 0;
      } else {
        leftFilters.price = index;
      }
      break;
    case 2:
      if (checkIfLeftFilterSelected(leftFilters, index, filterType)) {
        const indexOfElement = leftFilters.brand.indexOf(index);
        leftFilters.brand.splice(indexOfElement, 1);
      } else {
        leftFilters.brand.push(index);
      }
      break;
    case 3:
      if (checkIfLeftFilterSelected(leftFilters, index, filterType)) {
        const indexOfElement = leftFilters.age.indexOf(index);
        leftFilters.age.splice(indexOfElement, 1);
      } else {
        leftFilters.age.push(index);
      }
      break;
    case 4:
      if (checkIfLeftFilterSelected(leftFilters, index, filterType)) {
        const indexOfElement = leftFilters.taste.indexOf(index);
        leftFilters.taste.splice(indexOfElement, 1);
      } else {
        leftFilters.taste.push(index);
      }
      break;
    default:
  }
  dispatchFoodReducerData({
    type: FoodState.leftFilters,
    payload: leftFilters,
  });
};

export const checkIfLeftFilterSelected = (
  leftFilters: ILeftFiltersData,
  index: number,
  filterType: number
): boolean => {
  switch (filterType) {
    case 0:
      if (leftFilters.availability === index) {
        return true;
      } else {
        return false;
      }
    case 1:
      if (leftFilters.price === index) {
        return true;
      } else {
        return false;
      }
    case 2:
      if (leftFilters.brand.includes(index)) {
        return true;
      }
      return false;
    case 3:
      if (leftFilters.age.includes(index)) {
        return true;
      }
      return false;
    case 4:
      if (leftFilters.taste.includes(index)) {
        return true;
      }
      return false;
    default:
      return false;
  }
  return false;
};

export const getNumberOfPages = (productCount: number) => {
  if (productCount > 0) {
    if (productCount > 12) {
      const count = productCount / 12;
      return Math.ceil(count);
    }
  }

  return 1;
};
