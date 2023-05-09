import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import cuteDog from "../../Assets/cuteDog.jpeg";

export const OrderSuccessCard = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={cuteDog}
        srcSet={`${cuteDog} 1x, ${cuteDog} 2x`}
        loading="lazy"
        alt=""
        style={{ width: "90px", height: "90px", objectFit: "cover" }}
      />

      <div
        style={{
          fontSize: "20px",
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: "6    00",
          color: "#4caf50",
        }}
      >
        Success!
      </div>
      <div
        style={{
          fontSize: "md",
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: "400",
          color: "#1b5e20",
        }}
      >
        Thank you for your order!
      </div>
    </Card>
  );
};
