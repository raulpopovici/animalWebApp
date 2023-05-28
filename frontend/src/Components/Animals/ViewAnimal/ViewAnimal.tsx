import React from "react";
import styles from "./ViewAnimal.module.css";
import { Animal } from "../../../Interfaces/AnimalPageInterface";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

export const ViewAnimal = ({
  animal,
  onDelete,
}: {
  animal: Animal;
  onDelete: (animalId: string) => void;
}) => {
  return (
    <section className={styles.viewAnimalContainer}>
      <div className={styles.animalNameStyle}>{animal.name}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={animal.image1} alt="" className={styles.imageStyles}></img>
        <img src={animal.image2} alt="" className={styles.imageStyles}></img>
        <img src={animal.image3} alt="" className={styles.imageStyles}></img>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <hr className={styles.hrStyle}></hr>
        <div
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "hsla(0, 0%, 10%, 0.7)",
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          Details
        </div>
        <hr className={styles.hrStyle}></hr>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className={styles.animalDetailsText}>Breed: </div>
            <div className={styles.animalDetailsText2}>{animal.breed}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className={styles.animalDetailsText}>Age: </div>
            <div className={styles.animalDetailsText2}>{animal.age}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className={styles.animalDetailsText}>Animal Type: </div>
            <div className={styles.animalDetailsText2}>{animal.animalType}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className={styles.animalDetailsText}>Sex: </div>
            <div className={styles.animalDetailsText2}>{animal.sex}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className={styles.animalDetailsText}>Weight: </div>
            <div className={styles.animalDetailsText2}>{animal.weight}kg</div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <hr className={styles.hrStyleShortDesc}></hr>
        <div
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "hsla(0, 0%, 10%, 0.7)",
            fontFamily: "Open Sans, sans-serif",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ paddingRight: "3px" }}>Short</div>
          <div>Description</div>
        </div>
        <hr className={styles.hrStyleShortDesc}></hr>
      </div>
      <div>{animal.details}</div>
      <button
        className={styles.deleteAnimalButton}
        onClick={() => onDelete(animal.id)}
      >
        <ClearIcon />
      </button>
    </section>
  );
};
