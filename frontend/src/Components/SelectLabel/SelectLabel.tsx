import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AnimalData, PriceData } from "../../Interfaces/FoodPageInterfaces";

// function isAnimal(x: AnimalData | PriceData): x is AnimalData {
//   return (x as AnimalData).type !== undefined;
// }

export const SelectLabels = ({
  animals,
  prices,
}: {
  animals?: AnimalData[];
  prices?: PriceData[];
}) => {
  let menuData;

  if (animals !== undefined) {
    menuData = animals;
  } else {
    menuData = prices;
  }

  const [data, setData] = React.useState("0");
  const handleChange = (event: SelectChangeEvent) => {
    setData(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80, outline: "none" }}>
        <Select
          value={data}
          onChange={handleChange}
          displayEmpty
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "pink",
                "& .MuiMenuItem-root": {
                  padding: 2,
                },
                borderRadius: "10px",
              },
            },
          }}
          sx={{
            "&.Mui-focused": {
              outline: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 1 },
            },
            borderRadius: "20px",
            height: "30px",
          }}
        >
          {menuData?.map((data) => (
            <MenuItem key={data.index} value={data.index}>
              {data.data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectLabels;
