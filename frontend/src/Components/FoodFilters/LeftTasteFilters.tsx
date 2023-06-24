import CheckBoxV2 from "../CheckBox/CheckBox";
import { checkIfLeftFilterSelected } from "../../Pages/Food/FoodController";
import { FoodStateType, ILeftFiltersData } from "../../Pages/Food/FoodReducer";

const LeftTasteFilters = ({
  leftFilters,
  dispatchFoodReducerData,
}: {
  leftFilters: ILeftFiltersData;
  dispatchFoodReducerData: React.Dispatch<FoodStateType>;
}) => {
  return (
    <>
      <CheckBoxV2
        text={"Chicken"}
        selected={checkIfLeftFilterSelected(leftFilters, 1, 4)}
        index={1}
        leftFilters={leftFilters}
        filterType={4}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Beef"}
        selected={checkIfLeftFilterSelected(leftFilters, 2, 4)}
        index={2}
        leftFilters={leftFilters}
        filterType={4}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Lamb"}
        selected={checkIfLeftFilterSelected(leftFilters, 3, 4)}
        index={3}
        leftFilters={leftFilters}
        filterType={4}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
    </>
  );
};

export default LeftTasteFilters;
