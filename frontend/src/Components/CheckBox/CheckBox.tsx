import { Checkbox } from "@mui/material";
import {
  leftFiltersChangeState,
  topFiltersChangeState,
} from "../../Pages/Food/FoodController";
import { FoodStateType, ILeftFiltersData } from "../../Pages/Food/FoodReducer";

const CheckBoxV2 = ({
  text,
  selected,
  index,
  leftFilters,
  filterType,
  dispatchFoodReducerData,
}: {
  text: string;
  selected: boolean;
  index: number;
  leftFilters: ILeftFiltersData;
  filterType: number;
  dispatchFoodReducerData: React.Dispatch<FoodStateType>;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: "10px",
        fontSize: "14px",
        fontFamily: "Open Sans, sans-serif",
        fontWeight: "400",
        color: "#333",
      }}
    >
      <Checkbox
        sx={{
          "&.Mui-checked": { color: "#82218b" },
          height: "10px",
          width: "10px",
          marginRight: "10px",
        }}
        size="small"
        checked={selected}
        onChange={() =>
          leftFiltersChangeState(
            leftFilters,
            index,
            filterType,
            dispatchFoodReducerData
          )
        }
      />
      <div>{text}</div>
    </div>
  );
};

export default CheckBoxV2;
