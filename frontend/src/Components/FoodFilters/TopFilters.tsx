import ToggleButtonV2 from "../ToggleButton/ToggleButton";
import {
  checkIfTopFilterSelected,
  topFiltersChangeState,
} from "../../Pages/Food/FoodController";
import {
  FoodStateType,
  ILeftFiltersData,
  ITopFiltersData,
} from "../../Pages/Food/FoodReducer";

const TopFilters = ({
  topFilters,
  dispatchFoodReducerData,
}: {
  topFilters: number[];
  dispatchFoodReducerData: React.Dispatch<FoodStateType>;
}) => {
  return (
    <>
      <ToggleButtonV2
        text={"cats"}
        selected={checkIfTopFilterSelected(topFilters, 1)}
        setSelected={() =>
          topFiltersChangeState(topFilters, 1, dispatchFoodReducerData)
        }
      />
      <ToggleButtonV2
        key={2}
        text={"dogs"}
        selected={checkIfTopFilterSelected(topFilters, 2)}
        setSelected={() =>
          topFiltersChangeState(topFilters, 2, dispatchFoodReducerData)
        }
      />
      <ToggleButtonV2
        key={3}
        text={"birds"}
        selected={checkIfTopFilterSelected(topFilters, 3)}
        setSelected={() =>
          topFiltersChangeState(topFilters, 3, dispatchFoodReducerData)
        }
      />
      <ToggleButtonV2
        key={4}
        text={"rodents"}
        selected={checkIfTopFilterSelected(topFilters, 4)}
        setSelected={() =>
          topFiltersChangeState(topFilters, 4, dispatchFoodReducerData)
        }
      />
      <ToggleButtonV2
        key={5}
        text={"fish"}
        selected={checkIfTopFilterSelected(topFilters, 5)}
        setSelected={() =>
          topFiltersChangeState(topFilters, 5, dispatchFoodReducerData)
        }
      />
    </>
  );
};

export default TopFilters;
