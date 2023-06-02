import CheckBoxV2 from "../CheckBox/CheckBox";
import { checkIfLeftFilterSelected } from "../../Pages/Food/FoodController";
import { FoodStateType, ILeftFiltersData } from "../../Pages/Food/FoodReducer";

const LeftAgeFilters = ({
  leftFilters,
  dispatchFoodReducerData,
}: {
  leftFilters: ILeftFiltersData;
  dispatchFoodReducerData: React.Dispatch<FoodStateType>;
}) => {
  return (
    <>
      <CheckBoxV2
        text={"Junior"}
        selected={checkIfLeftFilterSelected(leftFilters, 1, 3)}
        index={1}
        leftFilters={leftFilters}
        filterType={3}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Adult"}
        selected={checkIfLeftFilterSelected(leftFilters, 2, 3)}
        index={2}
        leftFilters={leftFilters}
        filterType={3}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Senior"}
        selected={checkIfLeftFilterSelected(leftFilters, 3, 3)}
        index={3}
        leftFilters={leftFilters}
        filterType={3}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
    </>
  );
};

export default LeftAgeFilters;
