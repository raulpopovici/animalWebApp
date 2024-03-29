import CheckBoxV2 from "../CheckBox/CheckBox";
import { checkIfLeftFilterSelected } from "../../Pages/Food/FoodController";
import { FoodStateType, ILeftFiltersData } from "../../Pages/Food/FoodReducer";

const LeftBrandFilters = ({
  leftFilters,
  dispatchFoodReducerData,
}: {
  leftFilters: ILeftFiltersData;
  dispatchFoodReducerData: React.Dispatch<FoodStateType>;
}) => {
  return (
    <>
      <CheckBoxV2
        text={"Chappi"}
        selected={checkIfLeftFilterSelected(leftFilters, 1, 2)}
        index={1}
        leftFilters={leftFilters}
        filterType={2}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Royal Canin"}
        selected={checkIfLeftFilterSelected(leftFilters, 2, 2)}
        index={2}
        leftFilters={leftFilters}
        filterType={2}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Whiskas"}
        selected={checkIfLeftFilterSelected(leftFilters, 3, 2)}
        index={3}
        leftFilters={leftFilters}
        filterType={2}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Tropical Pond"}
        selected={checkIfLeftFilterSelected(leftFilters, 4, 2)}
        index={4}
        leftFilters={leftFilters}
        filterType={2}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Pedigree"}
        selected={checkIfLeftFilterSelected(leftFilters, 5, 2)}
        index={5}
        leftFilters={leftFilters}
        filterType={2}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
    </>
  );
};

export default LeftBrandFilters;
