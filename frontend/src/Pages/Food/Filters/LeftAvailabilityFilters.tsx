import CheckBoxV2 from "../../../Components/CheckBox/CheckBox";
import { checkIfLeftFilterSelected } from "../FoodController";
import { FoodStateType, ILeftFiltersData } from "../FoodReducer";

const LeftAvailabilityFilters = ({
  leftFilters,
  dispatchFoodReducerData,
}: {
  leftFilters: ILeftFiltersData;
  dispatchFoodReducerData: React.Dispatch<FoodStateType>;
}) => {
  return (
    <>
      <CheckBoxV2
        text={"In Stock"}
        selected={checkIfLeftFilterSelected(leftFilters, 1, 0)}
        index={1}
        leftFilters={leftFilters}
        filterType={0}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"All Products"}
        selected={checkIfLeftFilterSelected(leftFilters, 2, 0)}
        index={2}
        leftFilters={leftFilters}
        filterType={0}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
    </>
  );
};

export default LeftAvailabilityFilters;
