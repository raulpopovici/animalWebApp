import CheckBoxV2 from "../../../Components/CheckBox/CheckBox";
import { checkIfLeftFilterSelected } from "../FoodController";
import { FoodStateType, ILeftFiltersData } from "../FoodReducer";

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
        text={"Taste 1"}
        selected={checkIfLeftFilterSelected(leftFilters, 1, 4)}
        index={1}
        leftFilters={leftFilters}
        filterType={4}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Taste 2"}
        selected={checkIfLeftFilterSelected(leftFilters, 2, 4)}
        index={2}
        leftFilters={leftFilters}
        filterType={4}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"Taste 3"}
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
