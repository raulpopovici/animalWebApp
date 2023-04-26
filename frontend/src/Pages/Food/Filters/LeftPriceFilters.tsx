import CheckBoxV2 from "../../../Components/CheckBox/CheckBox";
import { checkIfLeftFilterSelected } from "../FoodController";
import { FoodStateType, ILeftFiltersData } from "../FoodReducer";

const LeftPriceFilters = ({
  leftFilters,
  dispatchFoodReducerData,
}: {
  leftFilters: ILeftFiltersData;
  dispatchFoodReducerData: React.Dispatch<FoodStateType>;
}) => {
  return (
    <>
      <CheckBoxV2
        text={"Under 5"}
        selected={checkIfLeftFilterSelected(leftFilters, 1, 1)}
        index={1}
        leftFilters={leftFilters}
        filterType={1}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"5 - 10"}
        selected={checkIfLeftFilterSelected(leftFilters, 2, 1)}
        index={2}
        leftFilters={leftFilters}
        filterType={1}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"10 - 50"}
        selected={checkIfLeftFilterSelected(leftFilters, 3, 1)}
        index={3}
        leftFilters={leftFilters}
        filterType={1}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"50 - 100"}
        selected={checkIfLeftFilterSelected(leftFilters, 4, 1)}
        index={4}
        leftFilters={leftFilters}
        filterType={1}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
      <CheckBoxV2
        text={"100 +"}
        selected={checkIfLeftFilterSelected(leftFilters, 5, 1)}
        index={5}
        leftFilters={leftFilters}
        filterType={1}
        dispatchFoodReducerData={dispatchFoodReducerData}
      />
    </>
  );
};

export default LeftPriceFilters;
