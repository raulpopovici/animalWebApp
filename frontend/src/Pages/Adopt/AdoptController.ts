import React from "react";
import { useNavigate } from "react-router-dom";
import { ICartProduct } from "../../Interfaces/CartPageInterfaces";
import { IProduct } from "../../Interfaces/FoodPageInterfaces";

export const topFiltersChangeState = (
  topFilters: number[],
  index: number,
  setTopFilters: (filters: number[]) => void
) => {
  if (checkIfTopFilterSelected(topFilters, index)) {
    const indexOfElement = topFilters.indexOf(index);
    topFilters.splice(indexOfElement, 1);
  } else {
    topFilters.push(index);
  }

  setTopFilters(topFilters);
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

export const getNumberOfPages = (productCount: number) => {
  if (productCount > 0) {
    if (productCount > 9) {
      const count = productCount / 9;
      return Math.ceil(count);
    }
  }

  return 1;
};
