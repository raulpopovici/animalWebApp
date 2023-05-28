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
          bgcolor: "#1e3647",
          color: "#fff",
          ":hover": { bgcolor: "#1e3647", color: "#fff" },
        },
        borderRadius: "30px",
        height: "40px",
        width: "80px",
        color: "#000",
        bgcolor: "#fff",
        ":hover": { bgcolor: "#fff", color: "#000" },
        fontSize: "14px",
        fontFamily: "Open Sans, sans-serif",
        fontWeight: "600",
      }}
    >
      {text}
    </ToggleButton>
  );
};

export default ToggleButtonV2;
