import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { Animal } from "../../../Interfaces/AnimalPageInterface";
import styles from "../Adopt.module.css";

export const AnimalCard = ({ animal }: { animal: Animal }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        "&:hover": {
          boxShadow: "0 7px 10px 0 rgba(0,0,0,0.3)",
          cursor: "pointer",
        },
        width: 350,
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="1">
          <img
            src={animal.image1}
            srcSet={`${animal.image1} 1x, ${animal.image1} 2x`}
            loading="lazy"
            alt=""
            style={{ objectFit: "cover" }}
          />
        </AspectRatio>
      </CardOverflow>
      <div className={styles.animalCardName}>{animal.name}</div>
      <div className={styles.animalCardBreed}>{animal.breed}</div>
      <Divider />
      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1.5,
          px: "var(--Card-padding)",
          bgcolor: "#fff",
        }}
      ></CardOverflow>
    </Card>
  );
};
