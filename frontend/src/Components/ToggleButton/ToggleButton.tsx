import { ToggleButton } from "@mui/material";
import React from "react";

const ToggleButtonV2 = ({
  text,
  selected,
  setSelected,
}: {
  text: string;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}) => {
  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      sx={{
        "&.Mui-selected": {
          bgcolor: "#82218b",
          color: "#fff",
          ":hover": { bgcolor: "#82218b", color: "#fff" },
        },
        borderRadius: "10px",
        height: "40px",
        width: "80px",
        color: "#000",
        bgcolor: "#fff",
        ":hover": { bgcolor: "#fff", color: "#000" },
        fontSize: "14px",
        fontFamily: "Open Sans, sans-serif",
        fontWeight: "700",
      }}
    >
      {text}
    </ToggleButton>
  );
};

export default ToggleButtonV2;
