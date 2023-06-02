import React from "react";
import ToggleButtonV2 from "../ToggleButton/ToggleButton";
import {
  checkIfTopFilterSelected,
  topFiltersChangeState,
} from "../../Pages/Adopt/AdoptController";
import { adoptFilters } from "../../Pages/Adopt/Adopt";

const TopFilters = ({
  topFilters,
  setTopFilters,
}: {
  topFilters: adoptFilters;
  setTopFilters: (text: string) => void;
}) => {
  return (
    <>
      <ToggleButtonV2
        text={"cats"}
        selected={topFilters.wantCat}
        setSelected={() => setTopFilters("cat")}
      />
      <ToggleButtonV2
        key={2}
        text={"dogs"}
        selected={topFilters.wantDog}
        setSelected={() => setTopFilters("dog")}
      />
      <ToggleButtonV2
        key={3}
        text={"birds"}
        selected={topFilters.wantBird}
        setSelected={() => setTopFilters("bird")}
      />
      <ToggleButtonV2
        key={4}
        text={"rodents"}
        selected={topFilters.wantRodent}
        setSelected={() => setTopFilters("rodent")}
      />
      <ToggleButtonV2
        key={5}
        text={"fish"}
        selected={topFilters.wantFish}
        setSelected={() => setTopFilters("fish")}
      />
    </>
  );
};

export default TopFilters;
