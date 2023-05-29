import * as React from "react";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Switch from "@mui/joy/Switch";
import Modal from "@mui/joy/Modal";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { animalModal } from "../../../Pages/Adopt/Adopt";

import styles from "./ViewAnimalModal.module.css";

export const ViewAnimalModal = ({
  modalState,
  onClose,
}: {
  modalState: animalModal;
  onClose: () => void;
}) => {
  const animal = modalState.animal;
  return (
    <Modal open={modalState.open} onClose={onClose}>
      <ModalDialog
        aria-labelledby="dialog-vertical-scroll-title"
        layout="center"
        sx={{ height: "700px", width: "1000px" }}
      >
        <ModalClose />
        <div style={{ overflowY: "auto" }}>
          <div className={styles.animalNameStyle}>{animal.name}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={animal.image1}
              alt=""
              className={styles.imageStyles}
            ></img>
            <img
              src={animal.image2}
              alt=""
              className={styles.imageStyles}
            ></img>
            <img
              src={animal.image3}
              alt=""
              className={styles.imageStyles}
            ></img>
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
                <div className={styles.animalDetailsText2}>
                  {animal.animalType}
                </div>
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
                <div className={styles.animalDetailsText2}>
                  {animal.weight}kg
                </div>
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
              <div style={{ paddingRight: "3px" }}>User</div>
              <div>Details</div>
            </div>
            <hr className={styles.hrStyleShortDesc}></hr>
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
                <div className={styles.animalDetailsText}>Firstname: </div>
                <div className={styles.animalDetailsText2}>
                  {animal.user.firstName}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div className={styles.animalDetailsText}>Lastname: </div>
                <div className={styles.animalDetailsText2}>
                  {animal.user.lastName}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div className={styles.animalDetailsText}>Email: </div>
                <div className={styles.animalDetailsText2}>
                  {animal.user.email}
                </div>
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
                <div className={styles.animalDetailsText}>City: </div>
                <div className={styles.animalDetailsText2}>
                  {animal.user.city}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div className={styles.animalDetailsText}>Country: </div>
                <div className={styles.animalDetailsText2}>
                  {animal.user.country}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default ViewAnimalModal;
